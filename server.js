import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import OpenAI from 'openai'
import { Resend } from 'resend'

// ── Startup env validation ────────────────────────────────────────────────────
// Fail fast: refuse to start if critical secrets are absent
const REQUIRED_ENV = ['OLLAMA_API_KEY', 'RESEND_API_KEY']
const missing = REQUIRED_ENV.filter((k) => !process.env[k])
if (missing.length) {
  console.error(`[startup] Missing required environment variables: ${missing.join(', ')}`)
  process.exit(1)
}

const __dirname = dirname(fileURLToPath(import.meta.url))

const FROM_EMAIL    = process.env.FROM_EMAIL    || 'noreply@sofbld.com'
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://sofbld.com'
const PLAN_TO       = 'shane@quanttradez.com'
const PRICING_TO    = 'musa.bashir@outlook.com'
const IS_PROD       = process.env.NODE_ENV === 'production'

// ── Clients ───────────────────────────────────────────────────────────────────
const ollama = new OpenAI({
  baseURL: 'https://api.ollama.ai/v1',
  apiKey:  process.env.OLLAMA_API_KEY,
  timeout: 120_000,  // 2-minute hard timeout per model call
  maxRetries: 1,
})

const resend = new Resend(process.env.RESEND_API_KEY)

// ── App ───────────────────────────────────────────────────────────────────────
const app = express()

// Security headers (CSP, HSTS, X-Frame-Options, etc.)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc:  ["'self'"],
      scriptSrc:   ["'self'", "'unsafe-inline'"],  // Vite inlines scripts in dev
      styleSrc:    ["'self'", "'unsafe-inline'"],
      imgSrc:      ["'self'", 'data:', 'blob:'],
      connectSrc:  ["'self'"],
      fontSrc:     ["'self'", 'data:'],
      objectSrc:   ["'none'"],
      frameSrc:    ["'none'"],
      upgradeInsecureRequests: IS_PROD ? [] : null,
    },
  },
  crossOriginEmbedderPolicy: false,  // Three.js needs this off
}))

// CORS: in production only allow your own domain; in dev allow localhost
app.use(cors({
  origin: IS_PROD
    ? ALLOWED_ORIGIN
    : ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200,
}))

// Body parsing — hard cap at 16 KB to prevent large-payload attacks
app.use(express.json({ limit: '16kb' }))

// General rate limit: 120 req / 15 min per IP (protects all routes)
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
}))

// Strict rate limit on the intake endpoint: 5 submissions / hour per IP
const intakeLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many submissions from this IP, please try again later.' },
  skipSuccessfulRequests: false,
})

// Serve the built Vite frontend
app.use(express.static(join(__dirname, 'dist'), {
  // Don't expose directory listings; serve only known files
  index: false,
  setHeaders(res) {
    // Immutable cache for hashed Vite assets
    if (res.req.url.match(/\/assets\//)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    }
  },
}))

// ── Input validation ──────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ALLOWED_SERVICES = [
  'Web Application', 'Mobile App', 'AI Automation',
  'Internal Platform', 'Quant & Fintech',
]

function validateIntake(body) {
  const errors = []
  const { service, name, company, description, email } = body

  if (!service || !ALLOWED_SERVICES.includes(service))
    errors.push('service must be one of the allowed values')
  if (!name || typeof name !== 'string' || name.trim().length < 2 || name.length > 120)
    errors.push('name must be 2–120 characters')
  if (company && (typeof company !== 'string' || company.length > 200))
    errors.push('company must be ≤200 characters')
  if (!description || typeof description !== 'string' || description.trim().length < 10 || description.length > 4000)
    errors.push('description must be 10–4000 characters')
  if (!email || !EMAIL_RE.test(email) || email.length > 254)
    errors.push('email is invalid')

  return errors
}

// Escape HTML entities in AI output before embedding in email HTML
function escapeHtml(str) {
  return (str ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// Strip accidental markdown code fences from model output
function stripFences(text) {
  return (text ?? '').replace(/^```(?:\w+)?\s*/i, '').replace(/\s*```$/i, '').trim()
}

// Safe log: never stringify env values
function log(level, msg, meta = {}) {
  const entry = { ts: new Date().toISOString(), level, msg, ...meta }
  if (level === 'error') console.error(JSON.stringify(entry))
  else console.log(JSON.stringify(entry))
}

// ── POST /api/intake ────────────────────────────────────────────────────────
app.post('/api/intake', intakeLimit, (req, res) => {
  const errors = validateIntake(req.body)
  if (errors.length) {
    return res.status(400).json({ error: 'Invalid submission', details: errors })
  }

  // Acknowledge immediately — AI processing is async and can take 30–60 s
  res.json({ received: true })

  // Run AI + email in the background; errors are logged, not surfaced to client
  processIntake(req.body).catch((err) => {
    log('error', 'Unhandled error in processIntake', { message: err?.message })
  })
})

async function processIntake({ service, name, company, timeline, budget, description, email }) {
  // Sanitise all string inputs before including in prompts
  const safe = (v) => (v ?? '').toString().trim().replace(/[`$]/g, '')

  const sName    = safe(name)
  const sCompany = safe(company)
  const sService = safe(service)

  const brief = `CLIENT BRIEF:
- Name: ${sName}
- Company: ${sCompany || 'Not provided'}
- Service requested: ${sService}
- Timeline: ${safe(timeline) || 'Not specified'}
- Budget: ${safe(budget) || 'Not specified'}
- Project description: ${safe(description)}
- Contact email: ${safe(email)}`

  // ── Shared system instruction ─────────────────────────────────────────────
  // Both models receive the same identity, interpretation rules, and quality bar
  // so their outputs reason from a consistent understanding of the brief.
  const SHARED_SYSTEM = `You are a senior consultant at SoundBuild, a premium custom software engineering firm that builds production-grade web applications, mobile apps, AI automations, internal platforms, and specialised financial tools for serious business clients.

SoundBuild's positioning: precision engineering, real code ownership, no templates, no lock-in. Every output you produce should reflect the quality bar of a senior operator at this firm.

INTERPRETATION RULES — apply these before writing anything:
- Treat every intake form as incomplete by default. Most clients cannot fully specify what they need at this stage.
- Use only what is in the brief plus reasonable industry inference. Do not invent business context.
- Clearly separate confirmed facts, reasonable assumptions, and open questions. Never conflate them.
- Do not imply certainty where information is missing. Be honest about gaps.
- Recommend the simplest credible approach that fits the likely need. Match complexity to the probable scale and risk of this specific project.
- Do not introduce AI, mobile, microservices, or advanced infrastructure unless the brief explicitly justifies it.
- If the project appears MVP-like: optimise for speed, validation, maintainability, and extensibility.
- If the project appears business-critical, data-sensitive, or integration-heavy: address the controls that matter.
- Every major recommendation must connect back to a concrete business or delivery rationale.

QUALITY BAR:
- Precise where the brief supports it; cautious and honest where it does not.
- No generic statements unless tied to a specific recommendation, risk, or decision.
- No filler, no agency-speak, no stack defaults without justification.
- Do not oversell. Do not undersell. Be accurate and commercially aware.
- Tone: experienced operator — thoughtful, direct, and premium. Consultative, not theatrical.`

  // ── Architecture / Implementation Plan — kimi-k2.5:cloud ─────────────────
  const PLAN_USER = `A potential client has submitted an intake form. Your task is to convert this brief into a practical implementation plan for internal SoundBuild use — a scoping memo that helps the team understand the opportunity, form a credible technical view, and prepare for a first call.

${brief}

Write the output in GitHub-flavored Markdown. Include exactly these sections in this order:

## Project Overview
Concise summary of what the client appears to be building and why. Note the service type, apparent business context, and any material signals in the description.

## Confirmed Requirements
Bullet list of what is explicitly stated in the brief. Do not infer here — only what the client actually said.

## Key Assumptions
Bullet list of reasonable assumptions you are making to fill gaps. Label each clearly as an assumption and briefly explain why it is reasonable.

## Recommended Technical Architecture
The simplest credible stack and infrastructure approach for this project. Explain why each major choice suits the likely need. Do not default to a generic stack — justify every recommendation against this brief specifically. Where relevant, address: hosting, database, auth, integrations, deployment pipeline, observability.

## Core Features and System Components
The features and system components implied by the brief, organised logically. Include relevant considerations such as user roles, integrations, admin needs, analytics, QA approach, deployment, and support where material to this project.

## Implementation Phases
Each phase as its own sub-heading. For each phase include: deliverables, estimated duration, dependencies, and what must be decided or confirmed before this phase can begin.

## Key Risks and Mitigations
Specific risks implied by this project — technical, delivery, scope, or client-side. For each risk, a concrete and actionable mitigation.

## Discovery Questions
Open questions that would materially change the architecture, scope, or delivery approach if answered differently. Be specific to this project — not a generic checklist.

## Recommended Next Steps
What SoundBuild should do next with this lead.

Do not wrap the output in code fences.`

  // ── Pricing / Time Estimation — glm-5:cloud ───────────────────────────────
  const PRICING_USER = `A potential client has submitted an intake form. Your task is to produce a realistic, commercially credible pricing estimate for internal SoundBuild use — one that clearly communicates the likely cost, explains the reasoning behind the numbers, and honestly surfaces any scope or budget misalignments.

${brief}

Write the output in GitHub-flavored Markdown. Include exactly these sections in this order:

## Pricing Estimate for ${sName}${sCompany ? ` — ${sCompany}` : ''}
One sentence framing the engagement.

## Engagement Summary
Service type, apparent project scope, stated timeline, stated budget. Keep this brief — two to four lines.

## Scope Interpretation
In your own words: what this project likely is based on the brief, what the client is trying to achieve, the implied complexity, and the delivery shape that makes most sense. This is your working hypothesis before the numbers.

## Assumptions Affecting Estimate
Explicit bullet list of assumptions that materially affect the estimate. Each assumption must be specific and clearly stated — not boilerplate.

## Phase-by-Phase Cost Breakdown
Markdown table with columns: Phase | Scope Summary | Est. Hours | Blended Rate (USD/hr) | Cost Range
SoundBuild operates at the premium end of the market. Rate should reflect that. Include a brief note below the table explaining the rate basis and what it covers.

## Total Estimate Range
Low / mid / high scenario. One sentence per scenario explaining what drives that outcome.

## Recommended Engagement Shape
What type of engagement structure makes the most sense for this project — full build, phased delivery, discovery sprint first, MVP then scale, narrower initial scope, etc. Explain specifically why this shape fits the brief.

## What's Included
Bullet list of what is covered in this estimate.

## What's Not Yet Included
Scope items not covered — either explicitly out of scope or dependent on discovery findings. Be specific.

## Budget Fit Commentary
Honest assessment of how the stated budget aligns with the implied scope. If there is a meaningful mismatch, explain it clearly but diplomatically and suggest a realistic path forward. If the budget is reasonable, confirm it with a brief rationale.

## Recommended Next Step
The single most important action SoundBuild should take with this lead.

Do not wrap the output in code fences.`

  // Both models run in parallel to minimise total latency
  const [planRes, pricingRes] = await Promise.all([
    ollama.chat.completions.create({
      model: 'kimi-k2.5:cloud',
      messages: [
        { role: 'system', content: SHARED_SYSTEM },
        { role: 'user',   content: PLAN_USER },
      ],
      temperature: 0.3,
    }),
    ollama.chat.completions.create({
      model: 'glm-5:cloud',
      messages: [
        { role: 'system', content: SHARED_SYSTEM },
        { role: 'user',   content: PRICING_USER },
      ],
      temperature: 0.2,
    }),
  ])

  const plan    = stripFences(planRes.choices[0]?.message?.content)
  const pricing = stripFences(pricingRes.choices[0]?.message?.content)

  if (!plan || !pricing) {
    throw new Error('One or both AI models returned empty content')
  }

  const clientLine  = `**Client:** ${safe(name)}${safe(company) ? ` · ${safe(company)}` : ''} · ${safe(email)}`
  const serviceLine = `**Service:** ${safe(service)} · **Timeline:** ${safe(timeline) || 'TBD'} · **Budget:** ${safe(budget) || 'TBD'}`

  // HTML for email bodies — escape AI output to prevent injection in email clients
  const emailHtml = (content) =>
    `<p style="font-family:sans-serif;color:#555">${escapeHtml(clientLine)}<br>${escapeHtml(serviceLine)}</p>` +
    `<pre style="font-family:monospace;font-size:13px;line-height:1.5;white-space:pre-wrap">${escapeHtml(content)}</pre>`

  const slugName = safe(name).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

  await Promise.all([
    resend.emails.send({
      from:    FROM_EMAIL,
      to:      PLAN_TO,
      subject: `[SoundBuild] Implementation Plan — ${safe(service)} for ${safe(name)}`,
      html:    emailHtml(plan),
      attachments: [{
        filename: `implementation-plan-${slugName}.md`,
        content:  Buffer.from(`${clientLine}\n${serviceLine}\n\n---\n\n${plan}`).toString('base64'),
      }],
    }),
    resend.emails.send({
      from:    FROM_EMAIL,
      to:      PRICING_TO,
      subject: `[SoundBuild] Pricing Estimate — ${safe(service)} for ${safe(name)}`,
      html:    emailHtml(pricing),
      attachments: [{
        filename: `pricing-estimate-${slugName}.md`,
        content:  Buffer.from(`${clientLine}\n${serviceLine}\n\n---\n\n${pricing}`).toString('base64'),
      }],
    }),
  ])

  log('info', 'AI intake emails sent', { service, name: safe(name) })
}

// ── SPA fallback ──────────────────────────────────────────────────────────────
app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

// ── Graceful shutdown ─────────────────────────────────────────────────────────
const server = app.listen(process.env.PORT || 3000, () => {
  log('info', `SoundBuild server started`, { port: process.env.PORT || 3000, env: process.env.NODE_ENV || 'development' })
})

function shutdown(signal) {
  log('info', `${signal} received — shutting down gracefully`)
  server.close(() => {
    log('info', 'Server closed')
    process.exit(0)
  })
  // Force exit if connections hang for more than 10 s
  setTimeout(() => process.exit(1), 10_000).unref()
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT',  () => shutdown('SIGINT'))
process.on('uncaughtException', (err) => {
  log('error', 'Uncaught exception', { message: err?.message })
  process.exit(1)
})
process.on('unhandledRejection', (reason) => {
  log('error', 'Unhandled rejection', { message: String(reason) })
})

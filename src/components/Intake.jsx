import { useState } from 'react'
import { X, ArrowRight, CheckCircle, Calendar } from 'lucide-react'
import './Intake.css'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

const SERVICES = [
  {
    id: 'web-app',
    label: 'Web Application',
    description: 'We architect and build production-grade web platforms — dashboards, portals, SaaS tools, and client-facing apps — from the ground up with real code ownership.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="9" y1="21" x2="9" y2="9"/>
      </svg>
    ),
  },
  {
    id: 'mobile',
    label: 'Mobile App',
    description: 'Native and cross-platform mobile apps built for performance and scale — iOS, Android, or both — with the UX polish your users expect.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="2" width="10" height="20" rx="2"/><circle cx="12" cy="17" r="1"/>
      </svg>
    ),
  },
  {
    id: 'ai',
    label: 'AI Automation',
    description: 'LLM integrations, intelligent workflows, RAG pipelines, and custom AI agents that slot directly into your operations and save real hours.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><circle cx="12" cy="4" r="1.5"/><circle cx="12" cy="20" r="1.5"/>
        <circle cx="4" cy="12" r="1.5"/><circle cx="20" cy="12" r="1.5"/>
        <line x1="12" y1="7" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="17"/>
        <line x1="7" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="17" y2="12"/>
      </svg>
    ),
  },
  {
    id: 'internal',
    label: 'Internal Platform',
    description: 'Ops tools, admin panels, internal dashboards, and workflow systems that replace spreadsheets and manual processes with software your team actually uses.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/>
        <rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/>
      </svg>
    ),
  },
  {
    id: 'quant',
    label: 'Quant & Fintech',
    description: 'Systematic trading systems, portfolio analytics, risk engines, and financial data infrastructure built to institutional standards.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
  },
]

const TIMELINE_OPTIONS = ['< 1 month', '1–3 months', '3–6 months', '6+ months', 'Not sure yet']
const BUDGET_OPTIONS = ['< $10k', '$10–30k', '$30–75k', '$75–150k', '$150k+']

const TOTAL_STEPS = 8

export default function Intake({ onClose }) {
  const [step, setStep] = useState(0)
  const [visible, setVisible] = useState(true)
  const [form, setForm] = useState({
    service: null,
    name: '',
    company: '',
    timeline: '',
    budget: '',
    description: '',
    email: '',
  })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)

  const transition = (nextStep) => {
    setVisible(false)
    setTimeout(() => {
      setStep(nextStep)
      setVisible(true)
    }, 350)
  }

  const next = () => transition(step + 1)

  const validate = (field, value) => {
    if (!value || value.toString().trim() === '') {
      setErrors((e) => ({ ...e, [field]: true }))
      return false
    }
    setErrors((e) => ({ ...e, [field]: false }))
    return true
  }

  const selectedService = SERVICES.find((s) => s.id === form.service)

  const progressPct = Math.round((step / TOTAL_STEPS) * 100)

  return (
    <div className="intake-overlay">
      {/* Progress */}
      {step > 0 && step < TOTAL_STEPS && (
        <div className="intake-progress">
          <div className="intake-progress__fill" style={{ width: `${progressPct}%` }} />
        </div>
      )}

      {/* Close */}
      <button className="intake-close" onClick={onClose} aria-label="Close">
        <X size={16} />
      </button>

      {/* ── STEP 0: Welcome ─────────────────────────────── */}
      {step === 0 && (
        <div className={`intake-slide ${!visible ? 'intake-slide--hidden' : ''}`}>
          <span className="intake-step-label">Let's talk</span>
          <h2 className="intake-headline">
            Tell us what you're <em>trying to build.</em>
          </h2>
          <p className="intake-body">
            A few quick questions so we can understand your project before we meet.
            No fluff — takes about 2 minutes.
          </p>
          <button className="intake-btn" onClick={next}>
            Get started <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ── STEP 1: Service selection ───────────────────── */}
      {step === 1 && (
        <div className={`intake-slide ${!visible ? 'intake-slide--hidden' : ''}`}>
          <span className="intake-step-label">Step 1 of 6</span>
          <h2 className="intake-headline">What are you looking to build?</h2>
          <div className="intake-services">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                className={`intake-service-card ${form.service === s.id ? 'intake-service-card--selected' : ''}`}
                onClick={() => {
                  setForm((f) => ({ ...f, service: s.id }))
                  setVisible(false)
                  setTimeout(() => { setStep(2); setVisible(true) }, 350)
                }}
              >
                <span className="intake-service-icon">{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── STEP 2: Service description ─────────────────── */}
      {step === 2 && (
        <div className={`intake-slide ${!visible ? 'intake-slide--hidden' : ''}`}>
          <span className="intake-step-label">Step 2 of 6</span>
          <h2 className="intake-headline">{selectedService?.label}</h2>
          <p className="intake-quote">{selectedService?.description}</p>
          <button className="intake-btn" onClick={next}>
            That's what we need <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ── STEP 3: Name + Company ──────────────────────── */}
      {step === 3 && (
        <div className={`intake-slide ${!visible ? 'intake-slide--hidden' : ''}`}>
          <span className="intake-step-label">Step 3 of 6</span>
          <h2 className="intake-headline">Who are we talking to?</h2>

          <div className="intake-field">
            <label className="intake-field-label">
              Your name <span>*</span>
            </label>
            <input
              className={`intake-input ${errors.name ? 'intake-input--error' : ''}`}
              type="text"
              placeholder="First and last name"
              value={form.name}
              onChange={(e) => {
                setForm((f) => ({ ...f, name: e.target.value }))
                setErrors((e2) => ({ ...e2, name: false }))
              }}
            />
            {errors.name && <p className="intake-error">Please enter your name</p>}
          </div>

          <div className="intake-field">
            <label className="intake-field-label">Company or organization</label>
            <input
              className="intake-input"
              type="text"
              placeholder="Optional"
              value={form.company}
              onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
            />
          </div>

          <button
            className="intake-btn"
            onClick={() => { if (validate('name', form.name)) next() }}
          >
            Continue <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ── STEP 4: Timeline ────────────────────────────── */}
      {step === 4 && (
        <div className={`intake-slide ${!visible ? 'intake-slide--hidden' : ''}`}>
          <span className="intake-step-label">Step 4 of 6</span>
          <h2 className="intake-headline">What's your timeline?</h2>
          <p className="intake-body">When do you need this live?</p>
          <div className="intake-services" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
            {TIMELINE_OPTIONS.map((t) => (
              <button
                key={t}
                className={`intake-service-card ${form.timeline === t ? 'intake-service-card--selected' : ''}`}
                style={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}
                onClick={() => {
                  setForm((f) => ({ ...f, timeline: t }))
                  setVisible(false)
                  setTimeout(() => { setStep(5); setVisible(true) }, 350)
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── STEP 5: Budget + Description ────────────────── */}
      {step === 5 && (
        <div className={`intake-slide ${!visible ? 'intake-slide--hidden' : ''}`}>
          <span className="intake-step-label">Step 5 of 6</span>
          <h2 className="intake-headline">Budget & project details</h2>

          <div className="intake-field">
            <label className="intake-field-label">Approximate budget range</label>
            <div className="intake-scale">
              {BUDGET_OPTIONS.map((b) => (
                <button
                  key={b}
                  className={`intake-scale-btn ${form.budget === b ? 'intake-scale-btn--selected' : ''}`}
                  onClick={() => setForm((f) => ({ ...f, budget: b }))}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div className="intake-field">
            <label className="intake-field-label">
              Describe what you want to build <span>*</span>
            </label>
            <textarea
              className={`intake-textarea ${errors.description ? 'intake-input--error' : ''}`}
              placeholder="Goals, features, inspiration, constraints — anything that gives us context."
              value={form.description}
              onChange={(e) => {
                setForm((f) => ({ ...f, description: e.target.value }))
                setErrors((e2) => ({ ...e2, description: false }))
              }}
            />
            {errors.description && <p className="intake-error">Please describe your project</p>}
          </div>

          <button
            className="intake-btn"
            onClick={() => { if (validate('description', form.description)) next() }}
          >
            Almost done <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ── STEP 6: Email ───────────────────────────────── */}
      {step === 6 && (
        <div className={`intake-slide ${!visible ? 'intake-slide--hidden' : ''}`}>
          <span className="intake-step-label">Step 6 of 6</span>
          <h2 className="intake-headline">Where should we reach you?</h2>
          <p className="intake-body">
            We'll review your submission and follow up within one business day.
          </p>

          <div className="intake-field">
            <label className="intake-field-label">
              Email address <span>*</span>
            </label>
            <input
              className={`intake-input ${errors.email ? 'intake-input--error' : ''}`}
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={(e) => {
                setForm((f) => ({ ...f, email: e.target.value }))
                setErrors((e2) => ({ ...e2, email: false }))
              }}
            />
            {errors.email && <p className="intake-error">Please enter a valid email</p>}
          </div>

          <button
            className="intake-btn"
            disabled={sending}
            onClick={async () => {
              if (!form.email || !form.email.includes('@')) {
                setErrors((e) => ({ ...e, email: true }))
                return
              }
              setSending(true)
              setSendError(false)
              try {
                const res = await fetch('https://api.web3forms.com/submit', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                  body: JSON.stringify({
                    access_key: WEB3FORMS_KEY,
                    cc: 'Musa.Bashir@outlook.com',
                    subject: `New project inquiry — ${selectedService?.label} from ${form.name}`,
                    from_name: form.name,
                    from_email: form.email,
                    company: form.company || 'Not provided',
                    service: selectedService?.label,
                    timeline: form.timeline || 'Not specified',
                    budget: form.budget || 'Not specified',
                    description: form.description,
                  }),
                })
                const data = await res.json()
                if (data.success) {
                  // Fire-and-forget: AI plan + pricing emails (don't block the UX)
                  fetch('/api/intake', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      service: selectedService?.label,
                      name: form.name,
                      company: form.company,
                      timeline: form.timeline,
                      budget: form.budget,
                      description: form.description,
                      email: form.email,
                    }),
                  }).catch(() => {/* best-effort — ignore errors */})
                  next()
                } else {
                  setSendError(true)
                }
              } catch {
                setSendError(true)
              } finally {
                setSending(false)
              }
            }}
          >
            {sending ? 'Sending…' : <><span>Submit</span> <ArrowRight size={16} /></>}
          </button>
          {sendError && (
            <p className="intake-error" style={{ marginTop: '0.75rem' }}>
              Something went wrong sending your submission. Please email us directly at hello@sofbld.com
            </p>
          )}
        </div>
      )}

      {/* ── STEP 7: Thank you ───────────────────────────── */}
      {step === 7 && (
        <div className={`intake-slide intake-thanks ${!visible ? 'intake-slide--hidden' : ''}`}>
          <div className="intake-thanks-icon">
            <CheckCircle size={28} />
          </div>
          <h2 className="intake-headline">
            Brief received, <em>{form.name.split(' ')[0]}.</em>
          </h2>
          <p className="intake-body">
            Want to lock in a time to talk through your project? Pick a slot below —
            or if you'd prefer, we'll reach out to you at <strong style={{ color: 'white' }}>{form.email}</strong> within one business day.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            <a
              href="https://calendly.com/shane0126/new-meeting"
              target="_blank"
              rel="noopener noreferrer"
              className="intake-btn"
              style={{ justifyContent: 'center', textDecoration: 'none' }}
            >
              <Calendar size={16} />
              Schedule a Call Now
            </a>
            <button
              className="intake-btn-ghost"
              onClick={onClose}
            >
              Not right now — I'll wait for your email
            </button>
          </div>

          <div className="intake-summary">
            {[
              ['Service', selectedService?.label],
              form.company && ['Company', form.company],
              form.timeline && ['Timeline', form.timeline],
              form.budget && ['Budget', form.budget],
              ['Project', form.description],
            ].filter(Boolean).map(([k, v]) => (
              <div className="intake-summary-row" key={k}>
                <span className="intake-summary-key">{k}</span>
                <span className="intake-summary-val">{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

import './Pricing.css'
import { ArrowRight } from 'lucide-react'

const engagements = [
  {
    id: 'strategy',
    name: 'Strategy Sprint',
    range: 'Starting at $5,000',
    duration: '1–2 weeks',
    for: 'Clients who need clarity before committing to a build.',
    description: 'Scope a project accurately, validate an idea, map a technical architecture, or get a realistic roadmap before spending on development.',
    includes: [
      'Discovery and requirements workshop',
      'Solution architecture document',
      'Technology stack recommendation',
      'Phased project roadmap',
      'Accurate build estimate',
      'Risk and dependency assessment',
    ],
    cta: 'Start Here',
    badge: null,
    featured: false,
    span: 1,
  },
  {
    id: 'optimization',
    name: 'Optimization Sprint',
    range: 'Starting at $8,000',
    duration: '2–4 weeks',
    for: 'Companies that need meaningful gains without a full rebuild.',
    description: 'Targeted improvements to an existing product or workflow — conversion rate, UX quality, performance, or operational efficiency.',
    includes: [
      'Focused audit of the problem area',
      'UX and conversion improvements',
      'Workflow simplification',
      'Performance and load optimization',
      'Feature refinement',
      'Delivery report and next-step recommendations',
    ],
    cta: 'Apply to Work With Us',
    badge: null,
    featured: false,
    span: 1,
  },
  {
    id: 'ai',
    name: 'AI Enablement Sprint',
    range: 'Starting at $12,000',
    duration: '3–6 weeks',
    for: 'Teams ready to put AI to work inside real operations.',
    description: 'Practical AI implementations built into the workflows your business actually runs — not demos, not experiments. Production-grade from day one.',
    includes: [
      'Internal knowledge assistants',
      'Customer support automation',
      'Lead qualification systems',
      'AI copilots embedded in workflows',
      'Prompt engineering and knowledge-base setup',
      'Lightweight AI tools tied to real operations',
    ],
    cta: 'Apply to Work With Us',
    badge: null,
    featured: false,
    span: 1,
  },
  {
    id: 'product',
    name: 'Product Builds',
    range: 'From $25,000',
    duration: '6–24 weeks',
    for: 'Founders and businesses building something that needs to exist.',
    description: 'MVPs, customer-facing platforms, internal tools, advanced integrations, and specialized financial systems. This is the core of what we do — full custom engineering with full code ownership.',
    includes: [
      'Full discovery and architecture',
      'Core feature development',
      'Testing and QA',
      'Deployment and launch support',
      'Full code and IP ownership',
      'Documentation and handoff',
      'Advanced integrations and custom admin tooling (Growth builds)',
      'Dedicated project leadership (Growth builds)',
    ],
    cta: 'Apply to Work With Us',
    badge: 'Core Offer',
    featured: true,
    span: 2,
  },
  {
    id: 'support',
    name: 'Ongoing Engineering Support',
    range: 'From $8,000 / month',
    duration: 'Monthly retainer',
    for: 'Clients with a system in place who want a reliable engineering partner.',
    description: 'Iterative product improvements, feature additions, AI enhancements, maintenance, and continuous optimization — handled by the same team that knows your codebase.',
    includes: [
      'Dedicated engineering hours each month',
      'Feature additions and refinements',
      'AI enhancements and integrations',
      'Performance monitoring and maintenance',
      'Regular delivery reviews',
      'Flexible scope month to month',
    ],
    cta: 'Apply to Work With Us',
    badge: null,
    featured: false,
    span: 1,
  },
]

function Pricing({ onOpenIntake }) {
  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">HOW WE ENGAGE</span>
          <h2>Scope, improve, automate, build, and scale.</h2>
          <p>
            We work with clients at every stage — from early validation through full product builds and ongoing engineering partnership. Pricing is framed around engagement type, not arbitrary package tiers.
          </p>
        </div>

        {/* Sprint row */}
        <div className="pricing__sprint-row">
          {engagements.filter(e => e.span === 1 && e.id !== 'support').map((engagement) => (
            <PricingCard key={engagement.id} engagement={engagement} onOpenIntake={onOpenIntake} />
          ))}
        </div>

        {/* Build + Support row */}
        <div className="pricing__build-row">
          {engagements.filter(e => e.id === 'product' || e.id === 'support').map((engagement) => (
            <PricingCard key={engagement.id} engagement={engagement} onOpenIntake={onOpenIntake} />
          ))}
        </div>

        <p className="pricing__footer-note">
          Quant and fintech engineering, large-scale system rebuilds, and projects with specialized compliance requirements are scoped individually.{' '}
          <button className="pricing__footer-link" onClick={onOpenIntake}>
            Start with a Strategy Sprint →
          </button>
        </p>
      </div>
    </section>
  )
}

function PricingCard({ engagement, onOpenIntake }) {
  return (
    <div className={`pricing-card ${engagement.featured ? 'pricing-card--featured' : ''}`}>
      {engagement.badge && (
        <span className="pricing-card__badge">{engagement.badge}</span>
      )}
      <div className="pricing-card__header">
        <h3 className="pricing-card__name">{engagement.name}</h3>
        <span className="pricing-card__for">{engagement.for}</span>
      </div>
      <div className="pricing-card__pricing">
        <span className="pricing-card__amount">{engagement.range}</span>
        <span className="pricing-card__duration">{engagement.duration}</span>
      </div>
      <p className="pricing-card__description">{engagement.description}</p>
      <ul className="pricing-card__features">
        {engagement.includes.map((item, i) => (
          <li className="pricing-card__feature" key={i}>
            <span className="pricing-card__check" aria-hidden="true">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <button
        className={`btn ${engagement.featured ? 'btn--primary' : 'btn--secondary'} pricing-card__cta`}
        onClick={onOpenIntake}
      >
        {engagement.cta}
        <ArrowRight size={16} strokeWidth={2} />
      </button>
    </div>
  )
}

export default Pricing

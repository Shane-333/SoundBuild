import './TrustSection.css'
import { Code2, Layers, MessageSquare, GitBranch, Star } from 'lucide-react'

const differentiators = [
  {
    icon: Code2,
    title: 'Custom Builds, Not Templates',
    description: 'We don\'t apply templates or configure existing platforms. We design and build systems around your requirements — the architecture, the logic, the interface, everything.'
  },
  {
    icon: Layers,
    title: 'Technical Range Across Domains',
    description: 'Web, mobile, AI, internal tooling, and specialized fintech engineering — we work across the full spectrum of modern software. One team, broad capability.'
  },
  {
    icon: MessageSquare,
    title: 'Structured Communication',
    description: 'Weekly updates, milestone demos, and a clear project brief mean you always know where things stand. No surprises, no communication gaps, no ambiguity.'
  },
  {
    icon: GitBranch,
    title: 'Full Code and IP Ownership',
    description: 'When the project is complete, you own everything. Source code, repositories, infrastructure credentials, documentation. There\'s no lock-in, no licensing, no dependency on us continuing to exist.'
  },
  {
    icon: Star,
    title: 'Premium Product Thinking',
    description: 'We think about the product before we write the code. Good engineering decisions made at the architecture stage save months of expensive rework later.'
  }
]

function TrustSection() {
  return (
    <section className="section section--dark trust-section">
      <div className="container">
        <div className="section-header">
          <h2>Why Sofbld</h2>
          <p>
            What separates a serious custom software partner from a generic agency that will attempt anything.
          </p>
        </div>
        <div className="trust__grid">
          {differentiators.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div className="trust-pillar" key={index}>
                <span className="trust-pillar__icon" aria-hidden="true">
                  <IconComponent size={28} strokeWidth={1.5} />
                </span>
                <h3 className="trust-pillar__title">{item.title}</h3>
                <p className="trust-pillar__description">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TrustSection

import './ValueProposition.css'
import { TrendingDown, Rocket, Users, RefreshCw, Cpu } from 'lucide-react'

const outcomes = [
  {
    icon: TrendingDown,
    title: 'Reduce Manual Work',
    description: 'Replace repetitive human processes with automated, reliable systems. What takes your team hours today can run without oversight.'
  },
  {
    icon: Rocket,
    title: 'Launch Faster',
    description: 'Move from idea to production with an experienced team that has done it before. We scope accurately, build efficiently, and deliver on milestones.'
  },
  {
    icon: Users,
    title: 'Improve Customer Experience',
    description: 'Build the product your customers actually want — not a generic substitute. Custom software means you design for your users, not around a platform\'s constraints.'
  },
  {
    icon: RefreshCw,
    title: 'Automate Repetitive Processes',
    description: 'AI and automation aren\'t buzzwords — they\'re practical tools. We identify where your team is doing work a system should handle and build the system.'
  },
  {
    icon: Cpu,
    title: 'Build What Off-the-Shelf Cannot',
    description: 'Some problems require custom solutions. Specialized domain logic, unique data structures, regulatory constraints — we build where generic tools stop working.'
  }
]

function ValueProposition() {
  return (
    <section className="section section--alt outcomes" id="outcomes">
      <div className="container">
        <div className="section-header">
          <h2>The Business Case for Custom Software</h2>
          <p>
            The right custom software doesn't just solve today's problem. It creates operational advantages that compound.
          </p>
        </div>
        <div className="outcomes__grid">
          {outcomes.map((outcome, index) => {
            const IconComponent = outcome.icon
            return (
              <div className="outcome-card" key={index}>
                <div className="outcome-card__icon" aria-hidden="true">
                  <IconComponent size={28} strokeWidth={1.5} />
                </div>
                <h3 className="outcome-card__title">{outcome.title}</h3>
                <p className="outcome-card__description">{outcome.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ValueProposition

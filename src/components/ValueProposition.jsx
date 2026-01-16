import './ValueProposition.css'
import { MessageSquare, ClipboardList, Zap, Sparkles } from 'lucide-react'

const valueProps = [
  {
    icon: MessageSquare,
    title: 'Unified Communication',
    description: 'One place for every conversation. No scattered emails, missed messages, or duplicated threads—just clear, organized communication.'
  },
  {
    icon: ClipboardList,
    title: 'Structured Process',
    description: 'Every engagement follows clear, repeatable steps. You always know what comes next and what to expect from us.'
  },
  {
    icon: Zap,
    title: 'Efficient Collaboration',
    description: 'Less back-and-forth, more progress. We handle the logistics so you can focus on what matters.'
  },
  {
    icon: Sparkles,
    title: 'A Polished Experience',
    description: 'From your first interaction to ongoing engagement, every touchpoint is professional and seamless.'
  }
]

function ValueProposition() {
  return (
    <section className="section section--alt value-proposition" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2>What Working With Us Looks Like</h2>
          <p>
            Four pillars that define how we serve you.
          </p>
        </div>
        <div className="value-grid">
          {valueProps.map((prop, index) => {
            const IconComponent = prop.icon
            return (
              <div className="value-card" key={index}>
                <div className="value-card__icon" aria-hidden="true">
                  <IconComponent size={32} strokeWidth={1.5} />
                </div>
                <h3 className="value-card__title">{prop.title}</h3>
                <p className="value-card__description">{prop.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ValueProposition


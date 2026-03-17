import './Benefits.css'
import { Search, Layers, Code2, ShieldCheck, LifeBuoy } from 'lucide-react'

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Discovery',
    description: 'We start every engagement with a structured discovery process. We understand your business context, user needs, technical constraints, and success criteria before writing a line of code.'
  },
  {
    icon: Layers,
    number: '02',
    title: 'Solution Architecture',
    description: 'We design the system before we build it. Architecture decisions, technology stack selection, integration planning, and phased roadmapping — all documented and reviewed with you.'
  },
  {
    icon: Code2,
    number: '03',
    title: 'Build',
    description: 'Development happens in milestone-driven sprints with regular demos. You see working software throughout the build, not just at the end. No surprises.'
  },
  {
    icon: ShieldCheck,
    number: '04',
    title: 'QA & Delivery',
    description: 'Thorough quality assurance, user acceptance testing, and deployment. All code, documentation, and infrastructure access is transferred to you at handoff. You own everything.'
  },
  {
    icon: LifeBuoy,
    number: '05',
    title: 'Support & Iteration',
    description: 'We don\'t disappear at launch. Ongoing support, feature additions, performance monitoring, and iterative improvements are available as your product evolves.'
  }
]

function Benefits() {
  return (
    <section className="section process" id="process">
      <div className="container">
        <div className="section-header">
          <h2>How Engagements Work</h2>
          <p>
            Every project follows a structured process designed to eliminate surprises, maintain quality, and deliver software that actually works in production.
          </p>
        </div>
        <div className="process__steps">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div className="process-step" key={index}>
                <div className="process-step__left">
                  <div className="process-step__icon-wrap">
                    <IconComponent size={24} strokeWidth={1.5} />
                  </div>
                  {index < steps.length - 1 && <div className="process-step__connector" aria-hidden="true" />}
                </div>
                <div className="process-step__content">
                  <span className="process-step__number">{step.number}</span>
                  <h3 className="process-step__title">{step.title}</h3>
                  <p className="process-step__description">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Benefits

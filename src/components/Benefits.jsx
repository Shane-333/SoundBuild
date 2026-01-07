import './Benefits.css'

const benefits = [
  {
    icon: '⏱',
    title: 'Faster Client Turnaround',
    description: 'Reduce time-to-value with streamlined processes. What used to take weeks can happen in days.'
  },
  {
    icon: '📧',
    title: 'Fewer Handoffs and Emails',
    description: 'Stop chasing threads across inboxes. Everything lives in one place, visible to everyone who needs it.'
  },
  {
    icon: '✓',
    title: 'Clear Accountability',
    description: 'Every task has an owner. Every milestone has a due date. Nothing slips through unnoticed.'
  },
  {
    icon: '📈',
    title: 'Scalable Operations',
    description: 'Grow your client base without growing your overhead. Repeatable workflows mean consistent quality at any volume.'
  },
  {
    icon: '🎯',
    title: 'Consistent Client Experience',
    description: 'Every client receives the same professional treatment, regardless of which team member leads the engagement.'
  },
  {
    icon: '🕐',
    title: 'Time Reclaimed',
    description: 'Spend less time on coordination and administration. Redirect those hours toward strategic, billable work.'
  }
]

function Benefits() {
  return (
    <section className="section benefits">
      <div className="container">
        <div className="section-header">
          <h2>Why Consulting Firms Choose Softbuild</h2>
          <p>
            Practical advantages that show up in your work and your results.
          </p>
        </div>
        <div className="benefits__grid">
          {benefits.map((benefit, index) => (
            <div className="benefit" key={index}>
              <span className="benefit__icon" aria-hidden="true">{benefit.icon}</span>
              <div className="benefit__content">
                <h3 className="benefit__title">{benefit.title}</h3>
                <p className="benefit__description">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Benefits


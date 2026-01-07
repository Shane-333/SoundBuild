import './ConsultingUseCases.css'

const useCases = [
  {
    title: 'Intake',
    outcome: 'Your journey begins here. We set expectations, gather the information we need, and ensure you feel confident about what comes next.',
    visual: 'Intake Preview'
  },
  {
    title: 'Collaboration',
    outcome: 'We work alongside you to solve problems, share insights, and build momentum. Your input shapes the work at every step.',
    visual: 'Collaboration Preview'
  },
  {
    title: 'Delivery',
    outcome: 'When the work is ready, approvals are collected, documents are finalized, and milestones are marked complete—seamlessly.',
    visual: 'Delivery Preview'
  },
  {
    title: 'Ongoing Engagement',
    outcome: 'The relationship does not end at delivery. Whether it is quarterly check-ins, follow-up projects, or simply staying connected—we are here.',
    visual: 'Engagement Preview'
  }
]

function ConsultingUseCases() {
  return (
    <section className="section use-cases">
      <div className="container">
        <div className="section-header">
          <h2>One Unified Client Journey</h2>
          <p>
            Every client relationship follows a natural rhythm. We bring that rhythm into focus, connecting each phase into a single, coherent experience.
          </p>
        </div>
        <div className="use-cases__list">
          {useCases.map((useCase, index) => (
            <div 
              className={`use-case ${index % 2 === 1 ? 'use-case--reversed' : ''}`} 
              key={index}
            >
              <div className="use-case__content">
                <h3 className="use-case__title">{useCase.title}</h3>
                <p className="use-case__outcome">{useCase.outcome}</p>
              </div>
              <div className="use-case__visual">
                <div className="placeholder-visual use-case__placeholder">
                  <span>{useCase.visual}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ConsultingUseCases


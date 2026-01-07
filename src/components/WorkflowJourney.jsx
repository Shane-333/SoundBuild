import './WorkflowJourney.css'

const journeySteps = [
  { label: 'Intake', number: '01' },
  { label: 'Collaboration', number: '02' },
  { label: 'Delivery', number: '03' },
  { label: 'Engagement', number: '04' }
]

function WorkflowJourney() {
  return (
    <section className="section section--alt workflow-journey">
      <div className="container container--narrow">
        <div className="section-header">
          <h2>One Unified Client Journey</h2>
        </div>
        
        <div className="journey__narrative">
          <p>
            Every client relationship follows a natural rhythm. Softbuild brings 
            that rhythm into focus, connecting each phase into a single, coherent experience.
          </p>
          <p>
            It begins with <strong>intake</strong>—the first interaction, 
            where expectations are set and information is gathered. From there, 
            your team moves into <strong>collaboration</strong>, working alongside 
            the client to solve problems, share insights, and build momentum.
          </p>
          <p>
            When the work is ready, <strong>delivery</strong> happens seamlessly. 
            Approvals are collected, documents are finalized, and milestones are marked complete.
            But the relationship does not end there. <strong>Ongoing engagement</strong> keeps 
            the door open—whether that means quarterly check-ins, follow-up projects, 
            or simply staying connected.
          </p>
          <p>
            With Softbuild, there is no need to stitch together separate tools for each phase. 
            Your clients experience one continuous journey, and your team operates from one 
            shared system.
          </p>
        </div>

        <div className="journey__steps">
          {journeySteps.map((step, index) => (
            <div className="journey__step" key={index}>
              <span className="journey__step-number">{step.number}</span>
              <span className="journey__step-label">{step.label}</span>
              {index < journeySteps.length - 1 && (
                <div className="journey__step-connector" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WorkflowJourney


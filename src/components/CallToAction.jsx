import './CallToAction.css'

function CallToAction() {
  return (
    <section className="section cta" id="demo">
      <div className="container container--narrow">
        <div className="cta__content">
          <h2 className="cta__headline">
            Ready to get started?
          </h2>
          <p className="cta__subheadline">
            Experience the structure, clarity, and professionalism
            that defines every engagement with our team.
          </p>
          <a href="https://form.typeform.com/to/HxFO5ddY" className="btn btn--primary btn--large cta__button" target="_blank" rel="noopener noreferrer">
            Get Started
          </a>
          <p className="cta__reassurance">
            No obligation. We're here when you're ready.
          </p>
        </div>
      </div>
    </section>
  )
}

export default CallToAction


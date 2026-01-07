import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__content">
          <div className="hero__text">
            <h1 className="hero__headline">
              Built for growth, <em>crafted for clients</em>
            </h1>
            <p className="hero__subheadline">
Build the firm you want to run. Deliver the experience clients remember.
            </p>
            <div className="hero__actions">
              <a href="https://your-typeform-link.typeform.com" className="btn btn--primary btn--large" target="_blank" rel="noopener noreferrer">
                Get Started
              </a>
              <a href="#how-it-works" className="btn btn--secondary btn--large">
                Learn How It Works
              </a>
            </div>
          </div>
          <div className="hero__visual">
            <div className="placeholder-visual hero__placeholder">
              <span>Platform Interface Preview</span>
            </div>
          </div>
        </div>
      </div>
      <div className="hero__gradient" aria-hidden="true" />
    </section>
  )
}

export default Hero


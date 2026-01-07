import Hero from './components/Hero'
import ValueProposition from './components/ValueProposition'
import ConsultingUseCases from './components/ConsultingUseCases'
import WorkflowJourney from './components/WorkflowJourney'
import Benefits from './components/Benefits'
import TrustSection from './components/TrustSection'
import CallToAction from './components/CallToAction'
import logoImage from './assets/Soft_build_Logo.png'
import './App.css'

function App() {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header__inner">
            <a href="/" className="header__logo">
              <img 
                src={logoImage} 
                alt="SOFTBUILD" 
                className="header__logo-img"
              />
              <span className="header__logo-text">SOFTBUILD</span>
            </a>
            <nav className="header__nav">
              <a href="#how-it-works" className="header__nav-link">How It Works</a>
              <a href="#demo" className="header__nav-link">Contact</a>
              <a href="https://your-typeform-link.typeform.com" className="btn btn--primary header__cta" target="_blank" rel="noopener noreferrer">
                Get Started
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Hero />
        <ValueProposition />
        <ConsultingUseCases />
        <WorkflowJourney />
        <Benefits />
        <TrustSection />
        <CallToAction />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer__inner">
            <div className="footer__brand">
              <a href="/" className="footer__logo">
                <img 
                  src={logoImage} 
                  alt="Softbuild" 
                  className="footer__logo-img"
                />
                <span>Softbuild</span>
              </a>
              <p className="footer__tagline">
                Streamlined consulting workflows. Exceptional client experiences.
              </p>
            </div>
            <div className="footer__links">
              <div className="footer__column">
                <h4 className="footer__column-title">Product</h4>
                <a href="#how-it-works" className="footer__link">How It Works</a>
              </div>
              <div className="footer__column">
                <h4 className="footer__column-title">Company</h4>
                <a href="#about" className="footer__link">About</a>
                <a href="#contact" className="footer__link">Contact</a>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <p className="footer__copyright">
              &copy; {new Date().getFullYear()} Softbuild. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App


import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import LogoBar from './components/LogoBar'
import Services from './components/ConsultingUseCases'
import Outcomes from './components/ValueProposition'
import Process from './components/Benefits'
import Pricing from './components/Pricing'
import TrustSection from './components/TrustSection'
import About from './components/About'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import CallToAction from './components/CallToAction'
import Intake from './components/Intake'
import logoImage from './assets/Soft_build_Logo.png'
import './App.css'

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'How We Work' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#about', label: 'About' },
]

function App() {
  const [intakeOpen, setIntakeOpen] = useState(false)
  const [navOpen,    setNavOpen]    = useState(false)

  // Close mobile nav on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setNavOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [navOpen])

  const closeNav = () => setNavOpen(false)
  const openIntake = () => { closeNav(); setIntakeOpen(true) }

  return (
    <div className="app">
      {intakeOpen && <Intake onClose={() => setIntakeOpen(false)} />}

      {/* Mobile nav overlay */}
      {navOpen && (
        <div className="mobile-nav-overlay" aria-modal="true" role="dialog">
          <div className="mobile-nav-backdrop" onClick={closeNav} aria-hidden="true" />
          <nav className="mobile-nav-drawer">
            <div className="mobile-nav-header">
              <a href="/" className="header__logo" onClick={closeNav}>
                <img src={logoImage} alt="Sofbld" className="header__logo-img" />
                <span className="header__logo-text">SOFBLD</span>
              </a>
              <button
                className="mobile-nav-close"
                onClick={closeNav}
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="mobile-nav-links">
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} className="mobile-nav-link" onClick={closeNav}>
                  {l.label}
                </a>
              ))}
            </div>
            <div className="mobile-nav-footer">
              <button className="btn btn--primary mobile-nav-cta" onClick={openIntake}>
                Get a Free Consultation
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Header */}
      <header className="header">
        <div className="header__inner">

            {/* Desktop: Left — Logo */}
            <div className="header__left">
              <a href="/" className="header__logo">
                <img src={logoImage} alt="Sofbld" className="header__logo-img" />
                <span className="header__logo-text">SOFBLD</span>
              </a>
            </div>

            {/* Desktop: Centre — Nav links */}
            <nav className="header__nav" aria-label="Main navigation">
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} className="header__nav-link">{l.label}</a>
              ))}
            </nav>

            {/* Desktop: Right — CTA */}
            <div className="header__right">
              <button className="btn btn--primary header__cta" onClick={() => setIntakeOpen(true)}>
                Get a Free Consultation
              </button>
            </div>

            {/* Mobile controls (CTA + hamburger — hidden on desktop) */}
            <div className="header__mobile-controls">
              <button className="btn btn--primary header__cta" onClick={openIntake}>
                Get a Free Consultation
              </button>
              <button
                className="hamburger"
                onClick={() => setNavOpen(true)}
                aria-label="Open menu"
                aria-expanded={navOpen}
              >
                <span className="hamburger__line" />
                <span className="hamburger__line" />
                <span className="hamburger__line" />
              </button>
            </div>

        </div>
      </header>

      {/* Main Content */}
      <main>
        <Hero onOpenIntake={openIntake} />
        <LogoBar />
        <Services />
        <Outcomes />
        <Process />
        <Testimonials />
        <Pricing onOpenIntake={openIntake} />
        <TrustSection />
        <About />
        <FAQ />
        <CallToAction onOpenIntake={openIntake} />
      </main>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer__inner">
            <div className="footer__brand">
              <a href="/" className="footer__logo">
                <img src={logoImage} alt="Sofbld" className="footer__logo-img" />
                <span>Sofbld</span>
              </a>
              <p className="footer__tagline">
                Custom software systems for businesses that need more than templates.
                We design and build web apps, mobile apps, AI systems, and specialized fintech tools.
              </p>
              <div className="footer__social">
                <a href="#" className="footer__social-link" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="#" className="footer__social-link" aria-label="X (Twitter)">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
                </a>
              </div>
            </div>
            <div className="footer__links">
              <div className="footer__column">
                <h4 className="footer__column-title">Services</h4>
                <a href="#services" className="footer__link">Web App Development</a>
                <a href="#services" className="footer__link">Mobile App Development</a>
                <a href="#services" className="footer__link">AI Solutions</a>
                <a href="#services" className="footer__link">Internal Tools</a>
                <a href="#services" className="footer__link">Quant &amp; Fintech</a>
              </div>
              <div className="footer__column">
                <h4 className="footer__column-title">Company</h4>
                <a href="#about" className="footer__link">About</a>
                <a href="#process" className="footer__link">How We Work</a>
                <a href="#pricing" className="footer__link">Pricing</a>
                <a href="#faq" className="footer__link">FAQ</a>
              </div>
              <div className="footer__column">
                <h4 className="footer__column-title">Contact</h4>
                <a href="mailto:Musa.Bashir@outlook.com" className="footer__link">Musa.Bashir@outlook.com</a>
                <a href="#contact" className="footer__link">Book a Strategy Call</a>
                <a href="mailto:Musa.Bashir@outlook.com" className="footer__link">Get a Project Estimate</a>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <p className="footer__copyright">
              &copy; {new Date().getFullYear()} Sofbld. All rights reserved.
            </p>
            <div className="footer__legal">
              <a href="/privacy-policy" className="footer__legal-link">Privacy Policy</a>
              <a href="/terms-of-service" className="footer__legal-link">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

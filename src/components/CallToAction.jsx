import './CallToAction.css'
import { Calendar, ArrowRight } from 'lucide-react'

function CallToAction({ onOpenIntake }) {
  return (
    <section className="section cta">
      <div className="container container--narrow">
        <div className="cta__content">
          <span className="cta__eyebrow">READY TO BUILD?</span>
          <h2 className="cta__headline">
            Your project deserves software built for it — not configured around it.
          </h2>
          <p className="cta__subheadline">
            If you have a problem that generic software can't solve, a product idea that needs real engineering, or a process that's breaking under manual load — let's talk. We'll give you an honest assessment and a clear path forward.
          </p>
          <div className="cta__actions">
            <button className="btn btn--primary btn--large cta__button" onClick={onOpenIntake}>
              <Calendar size={18} strokeWidth={2} />
              Apply to Work With Us
            </button>
            <a href="mailto:hello@sofbld.com" className="btn btn--secondary btn--large cta__button">
              Get a Project Estimate
              <ArrowRight size={18} strokeWidth={2} />
            </a>
          </div>
          <p className="cta__reassurance">
            30–45 minute call. No hard sell. Just an honest conversation about whether custom software is the right answer.
          </p>
        </div>
      </div>
    </section>
  )
}

export default CallToAction

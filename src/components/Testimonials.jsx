import './Testimonials.css'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: 'We\'d been using three different SaaS tools duct-taped together for our operations. Sofbld built us a single custom platform that handles everything. The ROI was obvious in the first quarter.',
    name: 'Marcus Reid',
    title: 'COO',
    firm: 'Vantage Capital Partners'
  },
  {
    quote: 'Their team understood the financial domain constraints immediately. Most software vendors struggle with our compliance requirements — Sofbld treated it as a design constraint, not a blocker.',
    name: 'Diana Osei',
    title: 'Head of Technology',
    firm: 'Clearwater Analytics Group'
  },
  {
    quote: 'We handed them a complex brief and a tight timeline. They delivered a working MVP six weeks later, with clear documentation, staging environments, and a plan for iteration. Exactly what we needed.',
    name: 'Tom Harrington',
    title: 'Founder',
    firm: 'Fieldpoint Operations'
  }
]

function Testimonials() {
  return (
    <section className="section section--alt testimonials" id="testimonials">
      <div className="container">
        <div className="section-header">
          <h2>What Clients Say</h2>
          <p>
            Real results from companies that needed custom software and trusted us to build it.
          </p>
        </div>
        <div className="testimonials__grid">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial" key={index}>
              <Quote size={24} strokeWidth={1.5} className="testimonial__icon" />
              <blockquote className="testimonial__quote">
                {testimonial.quote}
              </blockquote>
              <div className="testimonial__author">
                <div className="testimonial__avatar">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="testimonial__info">
                  <span className="testimonial__name">{testimonial.name}</span>
                  <span className="testimonial__role">{testimonial.title}, {testimonial.firm}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials

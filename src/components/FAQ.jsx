import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import './FAQ.css'

const faqs = [
  {
    question: 'What kinds of projects do you take on?',
    answer: 'We focus on custom software builds where the right solution requires engineering from scratch. Web applications, mobile apps, AI systems, internal operations tools, and specialized fintech or quantitative software. If your problem can be solved by configuring an off-the-shelf product, we\'ll tell you — and we\'ll tell you which one. If it genuinely requires custom software, that\'s where we work best.'
  },
  {
    question: 'How much do projects typically cost?',
    answer: 'Strategy Sprints for scoping and architecture start at $5,000. MVP builds typically start at $25,000 for focused, production-ready applications. More complex platforms with advanced integrations typically start at $60,000. Quant, fintech, and specialized domain projects are scoped individually based on technical complexity. Ongoing support retainers start at $8,000/month. We give you honest budget ranges upfront so you can self-qualify before we talk.'
  },
  {
    question: 'How long does a typical project take?',
    answer: 'MVP builds typically take 6–12 weeks from kickoff to launch. More complex platforms run 12–24 weeks. Strategy Sprints for architecture and scoping take 1–2 weeks. These timelines assume clear requirements and an active client relationship — delays in feedback extend timelines. We set realistic expectations at the start and communicate openly when scope changes affect delivery.'
  },
  {
    question: 'Do clients own the code?',
    answer: 'Yes, completely. When the project is delivered, you receive the full source code, all repositories, environment configurations, deployment instructions, and any third-party credentials associated with the infrastructure we set up. There is no licensing, no ongoing dependency on Sofbld, and no lock-in. The software is yours.'
  },
  {
    question: 'Do you provide support after launch?',
    answer: 'Yes. All projects include a stabilization period after launch for bug fixes and minor adjustments at no additional cost. For ongoing product iteration, feature additions, performance monitoring, or maintenance, we offer monthly retainer arrangements. Clients with retainers get priority scheduling and a dedicated point of contact on our team.'
  },
  {
    question: 'Can you work on advanced, regulated, or specialized systems?',
    answer: 'Yes. We have experience building in regulated environments — financial services, compliance-sensitive platforms, and systems with strict data handling requirements. Our quant and fintech team specifically focuses on technically complex financial tooling where domain expertise is as important as engineering quality. We treat compliance constraints as design inputs, not obstacles.'
  },
  {
    question: 'How do we get started?',
    answer: 'Book a Strategy Call. We\'ll spend 30–45 minutes understanding your project, your constraints, and your goals. If there\'s a fit, we\'ll propose either a Strategy Sprint to scope and architect the solution, or move directly to a build proposal if the requirements are already clear. No pressure, no hard sell — just an honest conversation about whether custom software makes sense for your situation.'
  }
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="section faq" id="faq">
      <div className="container container--narrow">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>
            Honest answers to the questions serious buyers ask before starting a custom software project.
          </p>
        </div>
        <div className="faq__list">
          {faqs.map((faq, index) => (
            <div className={`faq__item ${openIndex === index ? 'faq__item--open' : ''}`} key={index}>
              <button className="faq__question" onClick={() => toggle(index)} aria-expanded={openIndex === index}>
                <span>{faq.question}</span>
                <ChevronDown size={20} strokeWidth={2} className="faq__chevron" />
              </button>
              <div className="faq__answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ

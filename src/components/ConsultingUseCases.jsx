import './ConsultingUseCases.css'
import { Monitor, Smartphone, Brain, Wrench, BarChart2 } from 'lucide-react'

const services = [
  {
    icon: Monitor,
    title: 'Web App Development',
    description: 'Custom SaaS platforms, client portals, admin dashboards, marketplaces, and workflow applications. We build for scale from day one.',
    problems: ['Spreadsheets breaking operations', 'Manual processes slowing delivery', 'Generic software that doesn\'t fit your workflow'],
    accent: '#4a9eff'
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'iOS and Android applications built with Flutter or React Native for cross-platform reliability. Customer-facing apps, booking systems, field service, and staff tools.',
    problems: ['Need a customer mobile experience', 'Employee workflow requires mobile access', 'Cross-platform deployment on a single codebase'],
    accent: '#8b5cf6'
  },
  {
    icon: Brain,
    title: 'AI Solutions',
    description: 'AI chatbots, internal knowledge assistants, support automation, lead qualification systems, and AI-enabled workflows embedded directly into your products.',
    problems: ['Repetitive labor consuming team capacity', 'Slow response times hurting experience', 'Need AI embedded in your actual workflow, not a gimmick'],
    accent: '#10b981'
  },
  {
    icon: Wrench,
    title: 'Internal Tools & Automation',
    description: 'Custom internal platforms that eliminate manual coordination. Operations tools, approval workflows, reporting systems, and integrations between your business systems.',
    problems: ['Teams relying on disconnected tools', 'No single source of operational truth', 'Processes that generic software can\'t handle'],
    accent: '#f59e0b'
  },
  {
    icon: BarChart2,
    title: 'Quant & Fintech Engineering',
    description: 'Specialized market dashboards, backtesting systems, broker integrations, analytics tools, portfolio platforms, and research interfaces for trading and finance teams.',
    problems: ['Off-the-shelf tools lack required domain depth', 'Custom data pipelines and market integrations needed', 'Compliance and reliability requirements exceed generic software'],
    accent: '#ef4444'
  }
]

function ConsultingUseCases() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-header">
          <h2>What We Build</h2>
          <p>
            We take on projects where the right solution is custom software — not a template, not a plugin, not a generic platform configured to fit.
          </p>
        </div>
        <div className="services__grid">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div className="service-card" key={index}>
                <div className="service-card__icon" style={{ color: service.accent }} aria-hidden="true">
                  <IconComponent size={28} strokeWidth={1.5} />
                </div>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">{service.description}</p>
                <div className="service-card__problems">
                  <span className="service-card__problems-label">Common triggers:</span>
                  <ul className="service-card__problem-list">
                    {service.problems.map((problem, i) => (
                      <li key={i}>{problem}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ConsultingUseCases

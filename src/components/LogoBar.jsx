import './LogoBar.css'

const trustItems = [
  { label: 'Custom Web Platforms' },
  { label: 'AI-Powered Systems' },
  { label: 'Mobile Applications' },
  { label: 'Fintech & Quant Tools' },
  { label: 'Internal Automation' },
  { label: 'Enterprise Dashboards' },
  { label: 'MVP to Scale' },
  { label: 'Full Code Ownership' },
]

function LogoBar() {
  return (
    <section className="logo-bar">
      <div className="container">
        <p className="logo-bar__label">
          Trusted for technically complex builds across sectors and company stages
        </p>
        <div className="logo-bar__grid">
          {trustItems.map((item, index) => (
            <div className="logo-bar__item" key={index}>
              <span className="logo-bar__dot" aria-hidden="true" />
              <span className="logo-bar__name">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LogoBar

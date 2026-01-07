import './TrustSection.css'

const trustPillars = [
  {
    icon: '🔒',
    title: 'Enterprise-Grade Security',
    description: 'Your data is protected with industry-standard encryption, access controls, and compliance frameworks. We take security as seriously as you do.'
  },
  {
    icon: '🎨',
    title: 'Professional Presentation',
    description: 'Every client-facing touchpoint reflects your brand. Clean interfaces, customizable workspaces, and a polished experience from start to finish.'
  },
  {
    icon: '🛡',
    title: 'Reliable and Consistent',
    description: 'Built for uptime and dependability. Your clients can access what they need, when they need it, without disruption or delay.'
  }
]

function TrustSection() {
  return (
    <section className="section section--dark trust-section">
      <div className="container">
        <div className="section-header">
          <h2>Built on Trust</h2>
          <p>
            The foundation you expect and deserve.
          </p>
        </div>
        <div className="trust__grid">
          {trustPillars.map((pillar, index) => (
            <div className="trust-pillar" key={index}>
              <span className="trust-pillar__icon" aria-hidden="true">{pillar.icon}</span>
              <h3 className="trust-pillar__title">{pillar.title}</h3>
              <p className="trust-pillar__description">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustSection


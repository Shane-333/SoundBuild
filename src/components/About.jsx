import './About.css'
import { Code2, BarChart2, Globe } from 'lucide-react'

const team = [
  {
    name: 'Alex Mercer',
    role: 'Founder & Engineering Lead',
    bio: '10 years building custom software for fintech, SaaS, and enterprise clients. Previously engineering lead at a series B fintech. Believes the right architecture decision at the start saves months of expensive rework.',
    linkedin: '#',
    icon: Code2
  },
  {
    name: 'Sara Kim',
    role: 'Product & Design Lead',
    bio: 'Former product designer at a leading financial data platform. Translates complex technical requirements into systems that real users actually want to use. Obsessed with interface clarity.',
    linkedin: '#',
    icon: Globe
  },
  {
    name: 'James Whitfield',
    role: 'Quant & Fintech Specialist',
    bio: 'Background in quantitative research and market infrastructure. Specializes in trading dashboards, backtesting systems, broker integrations, and financial data pipelines where precision is non-negotiable.',
    linkedin: '#',
    icon: BarChart2
  }
]

function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about__intro">
          <div className="section-header" style={{ textAlign: 'left', marginBottom: 0 }}>
            <h2>A Technical Team That Builds, Not Configures</h2>
            <p>
              Sofbld was built for a specific type of problem: the kind where generic software stops working and you need something built for your situation. We focus on technically complex, high-value custom builds where the right engineering decisions matter.
            </p>
            <p style={{ marginTop: '1rem' }}>
              We're not a generalist agency. We work with businesses and founders who have a real problem, a meaningful budget, and the understanding that good software takes good engineering.
            </p>
          </div>
        </div>
        <div className="about__grid">
          {team.map((member, index) => {
            const IconComponent = member.icon
            return (
              <div className="about__member" key={index}>
                <div className="about__avatar">
                  <IconComponent size={28} strokeWidth={1.5} />
                </div>
                <h3 className="about__name">{member.name}</h3>
                <p className="about__role">{member.role}</p>
                <p className="about__bio">{member.bio}</p>
                <a href={member.linkedin} className="about__linkedin" aria-label={`${member.name} on LinkedIn`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default About

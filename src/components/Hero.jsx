import { lazy, Suspense, useState, useEffect, useRef, useCallback } from 'react'
import './Hero.css'
import { ArrowRight, Calendar } from 'lucide-react'

const HeroOrbitScene = lazy(() => import('./HeroOrbitScene'))

// Only load the 3D scene on devices wide enough to benefit from it
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

// ── Animation constants ───────────────────────────────────
const CYCLE_MS    = 4200
const ACTIVATE_PX = 48   // px proximity to bubble center to trigger glow

// Order: Tech Domains (top-right) → Code Ownership (bottom-right) → Projects Delivered (bottom-left)
const STATS = [
  { number: '5',    label: 'Tech Domains'      },
  { number: '100%', label: 'Code Ownership'    },
  { number: '40+',  label: 'Projects Delivered'},
]

// ── Math helpers ──────────────────────────────────────────
function pdist(a, b) {
  return Math.hypot(b.x - a.x, b.y - a.y)
}

// Interpolate a point along the axis-aligned path used by the SVG.
// 3-point: M c1 → V c3.y (vertical) → H c3.x (horizontal)
// 2-point: M a → H b.x (horizontal)
function polylinePoint(pts, progress) {
  if (pts.length === 2) {
    const [a, b] = pts
    return { x: a.x + (b.x - a.x) * progress, y: a.y }
  }
  const [c1, , c3] = pts
  const seg1 = Math.abs(c3.y - c1.y)  // vertical segment length
  const seg2 = Math.abs(c3.x - c1.x)  // horizontal segment length
  const total = seg1 + seg2
  const d = progress * total
  if (d <= seg1) {
    const t = seg1 > 0 ? d / seg1 : 0
    return { x: c1.x, y: c1.y + (c3.y - c1.y) * t }
  }
  const t = seg2 > 0 ? (d - seg1) / seg2 : 0
  return { x: c1.x + (c3.x - c1.x) * t, y: c3.y }
}

// ── HeroBubbles ───────────────────────────────────────────
// Renders 3 corner bubbles + an SVG connecting-line overlay with animated pulse
function HeroBubbles({ heroRef }) {
  const bubbleRefs  = useRef([])
  const rafRef      = useRef(null)
  const startRef    = useRef(null)
  const reduced     = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  const [progress, setProgress] = useState(0)   // 0..1 along the polyline
  const [centers,  setCenters]  = useState([])  // [{x,y}] relative to hero

  // Measure center positions of VISIBLE bubbles relative to the hero section.
  // display:none elements return an all-zero rect — skip them to avoid a
  // phantom SVG path anchored at the hero's top-left corner.
  const measure = useCallback(() => {
    const hero = heroRef.current
    if (!hero) return
    const heroRect = hero.getBoundingClientRect()
    const next = [0, 1, 2].flatMap(i => {
      const el = bubbleRefs.current[i]
      if (!el) return []
      // offsetWidth/Height === 0 means the element is hidden (display:none)
      if (el.offsetWidth === 0 && el.offsetHeight === 0) return []
      const r = el.getBoundingClientRect()
      return [{ x: r.left - heroRect.left + r.width / 2, y: r.top - heroRect.top + r.height / 2 }]
    })
    if (next.length >= 2) setCenters(next)
  }, [heroRef])

  useEffect(() => {
    const id = setTimeout(measure, 60) // wait one paint for CSS to settle
    const ro = new ResizeObserver(measure)
    if (heroRef.current) ro.observe(heroRef.current)
    window.addEventListener('resize', measure)
    return () => { clearTimeout(id); ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [measure])

  // RAF loop — drives progress 0→1 on repeat
  useEffect(() => {
    if (reduced.current) return
    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts
      setProgress(((ts - startRef.current) % CYCLE_MS) / CYCLE_MS)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const hasCenters = centers.length >= 2

  // Current pulse position on the polyline
  const pulsePos = hasCenters && !reduced.current
    ? polylinePoint(centers, progress)
    : null

  // Which bubble is closest to the pulse (within threshold)
  const activeIdx = pulsePos && hasCenters
    ? centers.reduce((best, c, i) => {
        const d = pdist(pulsePos, c)
        return d < ACTIVATE_PX && d < (best.d ?? Infinity) ? { i, d } : best
      }, {}).i ?? -1
    : -1

  // Build an axis-aligned path so lines are perfectly vertical / horizontal.
  // 3 points: c1 (top-right) → straight down → straight left to c3 (bottom-left)
  // 2 points: c2 (bottom-right) → straight left to c3 (bottom-left)
  const pathD = (() => {
    if (!hasCenters) return ''
    if (centers.length === 3) {
      const [c1, , c3] = centers
      // Drop vertically from c1, then cross horizontally at c3's y level
      return `M ${c1.x} ${c1.y} V ${c3.y} H ${c3.x}`
    }
    // 2 points — horizontal line between the two bottom bubbles
    const [a, b] = centers
    return `M ${a.x} ${a.y} H ${b.x}`
  })()

  return (
    <>
      {/* Full-hero SVG: connecting line + travelling pulse */}
      <svg className="hero__connect-svg" aria-hidden="true">
        {hasCenters && (
          <>
            <defs>
              <filter id="hb-glow" x="-150%" y="-150%" width="400%" height="400%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Static dim line */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(74,158,255,0.38)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Animated pulse dot */}
            {pulsePos && (
              <circle
                cx={pulsePos.x}
                cy={pulsePos.y}
                r="3"
                fill="rgba(74,158,255,1)"
                filter="url(#hb-glow)"
              />
            )}
          </>
        )}
      </svg>

      {/* Corner chat-box bubbles */}
      {STATS.map((stat, i) => (
        <div
          key={i}
          ref={el => { bubbleRefs.current[i] = el }}
          className={`hero__bubble hero__bubble--c${i + 1}${activeIdx === i ? ' hero__bubble--active' : ''}`}
        >
          <span className="hero__bubble-number">{stat.number}</span>
          <span className="hero__bubble-label">{stat.label}</span>
        </div>
      ))}
    </>
  )
}

// ── Hero ──────────────────────────────────────────────────
function Hero({ onOpenIntake }) {
  const heroRef = useRef(null)

  return (
    <section className="hero" ref={heroRef}>
      {!isMobile && (
        <Suspense fallback={null}>
          <HeroOrbitScene />
        </Suspense>
      )}

      <div className="hero__text-vignette" aria-hidden="true" />

      <div className="container">
        <div className="hero__content">
          <div className="hero__text">
            <span className="hero__eyebrow">CUSTOM SOFTWARE ENGINEERING</span>
            <h1 className="hero__headline">
              Custom software systems for businesses that need{' '}
              <em>more than templates.</em>
            </h1>
            <p className="hero__subheadline">
              We design and build web applications, mobile apps, AI automations,
              internal platforms, and specialized financial tools that help
              companies streamline operations, improve customer experience, and
              launch new revenue-driving digital products.
            </p>
            <div className="hero__actions">
              <button className="btn btn--primary btn--large hero__btn-primary" onClick={onOpenIntake}>
                <Calendar size={18} strokeWidth={2} />
                Apply to Work With Us
              </button>
              <a href="#services" className="btn btn--large hero__btn-ghost">
                See What We Build
                <ArrowRight size={18} strokeWidth={2} />
              </a>
            </div>
            <p className="hero__trust-micro">
              Custom builds. Real code ownership. No templates. No lock-in.
            </p>
          </div>
        </div>
      </div>

      {/* Absolutely-positioned corner bubbles + SVG connecting line */}
      <HeroBubbles heroRef={heroRef} />
    </section>
  )
}

export default Hero

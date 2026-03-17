import { useState, useEffect, useRef } from 'react'
import './TechStackVisualizer.css'

const CYCLE_MS      = 4200
const CONTAINER_H   = 340
const ACTIVATION_PX = 30

// Panel center Y positions (px from top of container)
// 3 panels × 68px + 2 gaps × 52px = 204 + 104 = 308px total
// Centers: 34, 154, 274
const PANELS = [
  { number: '40+',  label: 'Projects Delivered', centerY: 34  },
  { number: '5',    label: 'Tech Domains',        centerY: 154 },
  { number: '100%', label: 'Code Ownership',      centerY: 274 },
]

export default function TechStackVisualizer() {
  const [pulseY, setPulseY] = useState(0)
  const rafRef   = useRef(null)
  const startRef = useRef(null)
  const reduced  = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    if (reduced.current) return
    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts
      setPulseY(((ts - startRef.current) % CYCLE_MS) / CYCLE_MS * CONTAINER_H)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="tsv" aria-hidden="true">

      {/* Central connecting line */}
      <div className="tsv__line" />

      {/* Travelling pulse */}
      {!reduced.current && (
        <div className="tsv__pulse" style={{ transform: `translateY(${pulseY - 20}px)` }} />
      )}

      {/* Chat-box styled panels */}
      {PANELS.map((panel, i) => {
        const active = !reduced.current && Math.abs(pulseY - panel.centerY) < ACTIVATION_PX
        return (
          <div
            key={i}
            className={`tsv__bubble tsv__bubble--${i + 1}${active ? ' tsv__bubble--active' : ''}`}
            style={{ top: `${panel.centerY - 34}px` }}
          >
            <span className="tsv__bubble-number">{panel.number}</span>
            <span className="tsv__bubble-label">{panel.label}</span>
          </div>
        )
      })}
    </div>
  )
}

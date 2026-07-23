import { useState, useEffect, useRef } from 'react'
import { C, useInView, type Project } from '../constants'
import { Label } from './ui/Label'
import { Heading } from './ui/Heading'
import { Tag } from './ui/Tag'
import { projects } from '../data'
import ctaasImg from '../img/ctaas.png'
import bibliofabImg from '../img/bibliofab.png'
import beninImg from '../img/benin.png'
import hemoImg from '../img/hemo.png'
import shootingImg from '../img/shooting.png'

function ProjectCard({ p, delay = 0 }: { p: Project; delay?: number }) {
  const [hov, setHov] = useState(false)
  const { ref, inView } = useInView()
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: C.white, borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column',
        border: `1px solid ${hov ? `${p.accent}30` : C.border}`,
        boxShadow: hov ? `0 20px 60px ${p.accent}15` : '0 2px 16px rgba(0,0,0,0.06)',
        transform: hov ? 'translateY(-5px)' : inView ? 'none' : 'translateY(28px)',
        opacity: inView ? 1 : 0,
        transition: `all 0.4s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
      }}>
      <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ width: 32, height: 3, background: p.accent, borderRadius: 2 }} />
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, letterSpacing: '-0.04em', color: C.ink }}>{p.title}</h3>
          <p style={{ fontFamily: 'var(--font-sub)', fontSize: 13, lineHeight: 1.75, color: p.accent, marginTop: 2 }}>{p.subtitle}</p>
        </div>
        <p style={{ fontFamily: 'var(--font-sub)', fontSize: 13.5, lineHeight: 1.75, color: C.muted }}>{p.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {p.focus.map(f => (
            <span key={f} style={{
              fontFamily: 'var(--font-sans)', fontSize: 11.5, fontWeight: 500,
              padding: '3px 10px', background: `${p.accent}10`, color: p.accent,
              borderRadius: 6,
            }}>
              {f}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 'auto' }}>
          {p.tags.map(t => <Tag key={t} mono>{t}</Tag>)}
        </div>
      </div>
    </div>
  )
}

function ProjectMarquee() {
  const images = [ctaasImg, bibliofabImg, beninImg, hemoImg, shootingImg]
  const alts = ["Plateforme de gestion des ayants droit militaires", "BiblioFab — Gestion de bibliothèque", "CultureBénin — Patrimoine culturel", "HemoConnect — Santé", "AI Shooting Engine — Génération de scènes"]
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)
  const [hoveredRow, setHoveredRow] = useState<1 | 2 | null>(null)

  useEffect(() => {
    const SPEED = 1.2
    let raf1 = 0, raf2 = 0

    function scroll(row: 1 | 2) {
      const ref = row === 1 ? row1Ref : row2Ref
      const el = ref.current
      if (!el || hoveredRow === row) return
      el.scrollLeft += row === 1 ? SPEED : -SPEED
      const half = el.scrollWidth / 2
      if (el.scrollLeft >= half) el.scrollLeft = 0
      if (el.scrollLeft <= 0) el.scrollLeft = half
      if (row === 1) raf1 = requestAnimationFrame(() => scroll(1))
      else raf2 = requestAnimationFrame(() => scroll(2))
    }

    raf1 = requestAnimationFrame(() => scroll(1))
    raf2 = requestAnimationFrame(() => scroll(2))

    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [hoveredRow])

  return (
    <div style={{ marginBottom: '3rem' }}>
      {([row1Ref, row2Ref] as const).map((ref, ri) => (
        <div key={ri} ref={ref} onMouseEnter={() => setHoveredRow((ri + 1) as 1 | 2)} onMouseLeave={() => setHoveredRow(null)}
          style={{
            display: 'flex', gap: 20, marginBottom: ri === 0 ? 20 : 0,
            overflow: 'hidden', scrollBehavior: 'auto',
            cursor: 'pointer',
          }}>
          {[...images, ...images, ...images, ...images].map((src, i) => (
            <div key={i} className="marquee-item" style={{
              flexShrink: 0, width: 480, height: 300,
              borderRadius: 14, overflow: 'hidden',
              background: C.borderLight,
              boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
            }}>
              <img src={src} alt={alts[i % alts.length]} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export function Projects() {
  return (
    <section id="projects" style={{ padding: '7rem 0', background: C.white }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <Label>Projets</Label>
            <Heading>Travaux sélectionnés.</Heading>
          </div>
        </div>
        <ProjectMarquee />
        <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.5rem' }}>
          {projects.map((p, i) => <ProjectCard key={p.id} p={p} delay={i * 0.08} />)}
        </div>
      </div>
    </section>
  )
}

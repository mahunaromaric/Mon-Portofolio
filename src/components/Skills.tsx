import { C, useInView } from '../constants'
import { Label } from './ui/Label'
import { Heading } from './ui/Heading'
import { useSkills } from '../data'

export function Skills() {
  const { skills: skillCategories } = useSkills()
  const { ref, inView } = useInView()

  return (
    <section id="skills" style={{ padding: '7rem 0', background: C.white }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
        <Label>Compétences</Label>
        <div ref={ref} style={{
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)',
          transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)',
        }}>
          <Heading>Une stack éprouvée, choisie avec soin.</Heading>
        </div>

        <div ref={ref} style={{
          marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '0.75rem',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)',
          transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1) 0.15s',
        }}>
          {skillCategories.map((cat, ci) => (
            <div key={cat.name} className="skills-row" style={{
              display: 'flex', alignItems: 'baseline', gap: '1.5rem', flexWrap: 'wrap',
              padding: '1rem 1.5rem', borderRadius: 12,
              background: ci % 2 === 0 ? C.cream : C.white,
              opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(12px)',
              transition: `all 0.5s cubic-bezier(0.4,0,0.2,1) ${ci * 0.1}s`,
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0,
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: cat.color, letterSpacing: '-0.02em',
              }}>
                {cat.icon}
                {cat.name}
              </div>
              <div style={{
                fontFamily: 'var(--font-sub)', fontSize: 15, lineHeight: 1.8, color: C.ink2,
                display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0.25rem 0',
              }}>
                {cat.skills.map((s, i) => (
                  <span key={s}>
                    {i > 0 && <span style={{ color: cat.color, opacity: 0.35, margin: '0 8px', fontSize: 12 }}>●</span>}
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

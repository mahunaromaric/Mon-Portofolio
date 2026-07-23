import { ArrowRight, Download } from 'lucide-react'
import { C, useInView } from '../constants'
import { Label } from './ui/Label'
import { Heading } from './ui/Heading'
import { Btn } from './ui/Btn'
import { timeline } from '../data'

export function About() {
  const { ref, inView } = useInView()
  return (
    <section id="about" style={{ padding: '7rem 0', background: C.white }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
        <div ref={ref} className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)' }}>
          <div>
            <Label>À propos</Label>
            <Heading>Je construis des solutions numériques qui répondent à de vrais besoins.</Heading>
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                "Je conçois des applications web en combinant développement, réflexion produit et expérience utilisateur. Pour moi, une bonne solution se juge à son utilité, pas seulement à son code.",
                "Mon approche est hybride : je m'intéresse autant à l'architecture technique qu'à la manière dont les utilisateurs interagissent avec le produit, du brief jusqu'à l'implémentation.",
                "Je travaille principalement avec React, Next.js, Laravel et PostgreSQL, tout en explorant l'IA et l'automatisation.",
              ].map((p, i) => (
                <p key={i} style={{ fontFamily: 'var(--font-sub)', fontSize: 16, lineHeight: 1.8, color: C.muted, textAlign: 'justify' }}>{p}</p>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: '2rem', flexWrap: 'wrap' }}>
              <Btn href="#contact">Discutons <ArrowRight size={13} /></Btn>
              <Btn href="/cv.pdf" variant="outline"><Download size={13} /> Télécharger le CV</Btn>
            </div>
          </div>

          <div style={{ position: 'relative', marginTop: '6rem' }}>
            <div style={{ position: 'absolute', left: 15, top: 10, bottom: 10, width: 1, background: C.border }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {timeline.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: '1.25rem', position: 'relative' }}>
                  <div style={{
                    width: 31, height: 31, borderRadius: '50%', flexShrink: 0, zIndex: 1,
                    background: i === 0 ? C.blue : C.white,
                    border: `2px solid ${i === 0 ? C.blue : C.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {i === 0 && <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#fff' }} />}
                  </div>
                  <div style={{ paddingTop: 3 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: C.slate, letterSpacing: '0.03em', marginBottom: 3 }}>{t.year}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14.5, color: C.ink, letterSpacing: '-0.02em' }}>
                      {t.role} <span style={{ color: C.blue, fontWeight: 600 }}>@ {t.co}</span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-sub)', fontSize: 13, color: C.muted, marginTop: 4, lineHeight: 1.6 }}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

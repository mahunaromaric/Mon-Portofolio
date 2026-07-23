import { ArrowRight, MapPin } from 'lucide-react'
import { C } from '../constants'
import { Btn } from './ui/Btn'
import { Tag } from './ui/Tag'
import profilImg from '../img/profil.webp'

const techs = ['React', 'Next.js', 'TypeScript', 'Laravel', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Figma']
const stats = [
  { v: '3+', l: 'Années de pratique' },
  { v: '5+', l: 'Projets développés' },
  { v: '4+', l: 'Technologies maîtrisées' },
  { v: '∞', l: 'Apprentissage continu' },
]

export function Hero() {
  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 72, background: C.cream }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '4rem 2rem', width: '100%' }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '5rem', alignItems: 'center' }}>
          <div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.04em',
              color: C.ink,
              marginBottom: '1.25rem',
            }}>
              Je transforme des idées en produits numériques <span style={{ color: C.blue }}>utiles</span>.
            </h1>

            <p style={{ fontFamily: 'var(--font-sub)', fontSize: 16.5, lineHeight: 1.8, color: C.muted, maxWidth: 540, marginBottom: '2.5rem', fontWeight: 400 }}>
              Je suis <strong style={{ color: C.ink2 }}>Romaric Mahuna GBENOU</strong>, développeur Full Stack basé au Bénin. Je conçois des applications web modernes en combinant développement, design d'interface et réflexion produit.
            </p>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: '3.5rem' }}>
              <Btn href="#projects">Voir mes projets <ArrowRight size={14} /></Btn>
            </div>

            <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', paddingTop: '2rem', borderTop: `1px solid ${C.border}` }}>
              {stats.map(s => (
                <div key={s.l}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 800, letterSpacing: '-0.05em', color: C.ink, lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: C.slate, marginTop: 5, fontWeight: 500 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-photo" style={{ position: 'relative' }}>
            <div style={{
              position: 'relative', zIndex: 1,
              background: C.white, borderRadius: 20, overflow: 'hidden',
              boxShadow: '0 24px 80px rgba(0,0,0,0.1)',
              border: `1px solid ${C.border}`,
            }}>
              <img
                src={profilImg}
                alt="Romaric Mahuna GBENOU — Développeur Full Stack"
                loading="eager"
                fetchPriority="high"
                style={{ width: '100%', height: 400, objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)',
                padding: '1.5rem',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: '#fff' }}>Mahuna</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                  <MapPin size={12} color="rgba(255,255,255,0.7)" />
                  <span style={{ fontFamily: 'var(--font-sub)', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Cotonou, Bénin</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: '1rem', justifyContent: 'center' }}>
              {techs.map(t => <Tag key={t} mono>{t}</Tag>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

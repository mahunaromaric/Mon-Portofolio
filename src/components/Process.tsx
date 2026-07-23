import { C, useInView } from '../constants'
import { Label } from './ui/Label'
import { Heading } from './ui/Heading'
import { processSteps } from '../data'

export function Process() {
  const { ref, inView } = useInView()
  return (
    <section style={{ padding: '7rem 0', background: '#111827', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 2rem' }}>
        <Label light>Processus</Label>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <Heading light>Ma façon de construire un produit.</Heading>
          <p style={{ fontFamily: 'var(--font-sub)', fontSize: 15, color: '#64748B', maxWidth: 360, lineHeight: 1.7 }}>
            Une approche structurée qui combine compréhension du besoin, conception, développement et amélioration continue.
          </p>
        </div>

        <div ref={ref} className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem' }}>
          {processSteps.map((step, i) => (
            <div key={step.num}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16,
                padding: '1.75rem',
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(20px)',
                transition: `all 0.55s cubic-bezier(0.4,0,0.2,1) ${i * 0.09}s`,
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: C.blue, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{step.num}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: '#fff', letterSpacing: '-0.03em', marginBottom: '0.75rem' }}>{step.title}</div>
              <p style={{ fontFamily: 'var(--font-sub)', fontSize: 13, lineHeight: 1.7, color: '#94A3B8', marginBottom: '0.75rem' }}>{step.lead}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {step.items.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: C.blue, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-sub)', fontSize: 12.5, color: '#64748B', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

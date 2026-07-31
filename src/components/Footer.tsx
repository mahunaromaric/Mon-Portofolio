import { GitBranch, Globe, Mail, MapPin } from 'lucide-react'
import { C } from '../constants'

export function Footer() {
  return (
    <footer style={{ background: '#0F172A', color: '#94A3B8' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '4rem 2rem 2rem' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 500, color: C.blue, opacity: 0.7 }}>~ $ </span>
              <span style={{ fontFamily: 'Caveat, cursive', fontWeight: 600, fontSize: 26, color: '#fff', lineHeight: 1 }}>Mahuna</span>
            </div>
            <p style={{ fontFamily: 'var(--font-sub)', fontSize: 14, lineHeight: 1.7, marginTop: '0.75rem', color: '#64748B' }}>
              Développeur Full Stack basé à Cotonou. Je conçois et développe des solutions numériques utiles, de l'idée à la mise en production.
            </p>
          </div>

          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 12.5, fontWeight: 700, color: '#fff', marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Navigation</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Accueil', 'À propos', 'Compétences', 'Projets', 'Contact'].map(l => (
                <a key={l} href={`#${l.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}
                  style={{ fontFamily: 'var(--font-sub)', fontSize: 14, color: '#64748B', textDecoration: 'none', transition: 'color 0.15s', padding: '15px 0' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#64748B'}>
                  {l}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 12.5, fontWeight: 700, color: '#fff', marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Projets</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['BiblioFab', 'HemoConnect', 'CultureBénin', 'AI Shooting Engine'].map(p => (
                <a key={p} href="#projects"
                  style={{ fontFamily: 'var(--font-sub)', fontSize: 14, color: '#64748B', textDecoration: 'none', transition: 'color 0.15s', padding: '15px 0' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#64748B'}>
                  {p}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 12.5, fontWeight: 700, color: '#fff', marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Contact</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: <Mail size={14} />, label: 'romamahuna@gmail.com', href: 'mailto:romamahuna@gmail.com' },
                { icon: <MapPin size={14} />, label: 'Cotonou, Bénin' },
                { icon: <GitBranch size={14} />, label: 'GitHub', href: 'https://github.com/mahunaromaric' },
                { icon: <Globe size={14} />, label: 'LinkedIn', href: 'https://linkedin.com/in/romaric-gbenou-174a853b5' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#475569', flexShrink: 0 }}>{item.icon}</span>
                  {item.href
                    ? <a href={item.href} style={{ fontFamily: 'var(--font-sub)', fontSize: 13.5, color: '#64748B', textDecoration: 'none', transition: 'color 0.15s', padding: '15px 0', display: 'inline-block', minWidth: 48 }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#64748B'}>{item.label}</a>
                    : <span style={{ fontFamily: 'var(--font-sub)', fontSize: 13.5, color: '#64748B' }}>{item.label}</span>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1E293B', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#475569' }}>© 2025 Romaric Mahuna GBENOU</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="https://wa.me/22961642237" target="_blank"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-sub)', fontSize: 13, color: '#64748B', textDecoration: 'none', transition: 'color 0.15s', minHeight: 48 }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#25D366'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#64748B'}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

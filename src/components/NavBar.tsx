import { useState, useEffect } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { C } from '../constants'
import { NavLink } from './ui/NavLink'

const links = ['Accueil', 'À propos', 'Compétences', 'Projets', 'Processus']
const hrefs = ['#hero', '#about', '#skills', '#projects', '#process']

export function NavBar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: C.cream,
      borderBottom: `1px solid ${C.border}`,
      boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
      transition: 'box-shadow 0.3s',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64,
      }}>
        <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 2 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 500, color: C.blue, opacity: 0.65 }}>~ $ </span>
          <span style={{ fontFamily: 'Caveat, cursive', fontWeight: 600, fontSize: 24, color: C.ink, lineHeight: 1 }}>Mahuna</span>
        </a>
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {links.map((l, i) => (
            <NavLink key={l} href={hrefs[i]}>{l}</NavLink>
          ))}
          <button style={{
            fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.05em', background: C.ink, color: '#fff',
            border: 'none', borderRadius: 0, padding: '9px 16px',
            cursor: 'pointer', transition: 'all 0.18s',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = C.blue; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = C.ink; e.currentTarget.style.transform = 'none' }}
            onClick={() => window.location.href = '#contact'}
          >
            Me contacter <ArrowRight size={10} />
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="nav-mobile-btn"
          style={{
            display: 'none', background: 'transparent',
            border: 'none', cursor: 'pointer', color: C.ink, padding: 4,
          }}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0,
          background: C.cream, backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${C.border}`,
          padding: '1rem 2rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        }}>
          {links.map((l, i) => (
            <a key={l} href={hrefs[i]} onClick={() => setOpen(false)}
              style={{
                display: 'block', padding: '10px 0',
                fontFamily: 'var(--font-sub)', fontSize: 13, fontWeight: 600,
                color: C.ink, textDecoration: 'none', textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: `1px solid ${C.borderLight}`,
              }}
            >
              {l}
            </a>
          ))}
          <div style={{ marginTop: '0.75rem' }}>
            <button style={{
              fontFamily: 'var(--font-sub)', fontSize: 13, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.05em',
              background: C.ink, color: '#fff',
              border: 'none', borderRadius: 0, padding: '12px 22px',
              cursor: 'pointer', width: '100%',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}
              onClick={() => { setOpen(false); window.location.href = '#contact' }}
            >
              Me contacter <ArrowRight size={13} />
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { C } from '../constants'
import { NavLink } from './ui/NavLink'

const links = ['Accueil', 'À propos', 'Compétences', 'Projets']
const hrefs = ['#hero', '#about', '#skills', '#projects']

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
        <a href="#hero" style={{ textDecoration: 'none', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 18, color: C.ink, letterSpacing: '-0.03em' }}>
          Mahuna
        </a>
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {links.map((l, i) => (
            <NavLink key={l} href={hrefs[i]}>{l}</NavLink>
          ))}
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
                display: 'block', padding: '12px 0',
                fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600,
                color: C.ink, textDecoration: 'none',
                borderBottom: `1px solid ${C.borderLight}`,
              }}
            >
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

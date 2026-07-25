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
      background: '#fff',
      borderBottom: `1px solid ${C.border}`,
      boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
      transition: 'box-shadow 0.3s',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64,
      }}>
        <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="22" height="22" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 110V38L45 38C52 38 57 43 57 50C57 55 53 59 49 61L70 24L91 61C87 59 83 55 83 50C83 43 88 38 95 38L115 38V110" stroke="#1a3a6b" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M70 24L48 78M70 24L92 78" stroke="#2563eb" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 55L4 70L12 85" stroke="#2563eb" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M128 55L136 70L128 85" stroke="#2563eb" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: C.ink, letterSpacing: '-0.04em' }}>
            Mahuna
          </span>
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
          background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)',
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

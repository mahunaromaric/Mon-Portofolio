import { useState, useEffect } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { C } from '../constants'
import { NavLink } from './ui/NavLink'

const links = ['Accueil', 'À propos', 'Compétences', 'Projets', 'Contact']
const hrefs = ['#hero', '#about', '#skills', '#projects', '#contact']

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
      position: 'fixed', top: 24, left: 0, right: 0, zIndex: 100,
      display: 'flex', justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      <div style={{
        pointerEvents: 'auto',
        width: '100%',
        maxWidth: 1100,
        margin: '0 1rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 20px',
        background: scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${scrolled ? C.border : C.borderLight}`,
        borderRadius: 100,
        boxShadow: scrolled
          ? '0 4px 24px rgba(0,0,0,0.08)'
          : '0 2px 12px rgba(0,0,0,0.04)',
        transition: 'all 0.3s',
      }}>
        <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, minHeight: 48 }}>
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
          <button style={{
            fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700,
            letterSpacing: '-0.02em', background: C.ink, color: '#fff',
            border: 'none', borderRadius: 100, padding: '14px 18px',
            cursor: 'pointer', transition: 'all 0.18s',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = C.blue; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = C.ink; e.currentTarget.style.transform = 'none' }}
            onClick={() => window.location.href = '#contact'}
          >
            Me contacter <ArrowRight size={12} />
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
          pointerEvents: 'auto',
          position: 'fixed', top: 80, left: '1rem', right: '1rem',
          maxWidth: 1100, margin: '0 auto',
          background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)',
          border: `1px solid ${C.border}`,
          borderRadius: 20,
          padding: '1rem 1.5rem',
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
          <div style={{ marginTop: '0.75rem' }}>
            <button style={{
              fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700,
              background: C.ink, color: '#fff',
              border: 'none', borderRadius: 100, padding: '14px 22px',
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

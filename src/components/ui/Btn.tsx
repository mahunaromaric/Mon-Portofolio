import { useState } from 'react'
import { C } from '../../constants'

export function Btn({ children, href, variant = 'primary', small }: { children: React.ReactNode; href?: string; variant?: 'primary' | 'ghost' | 'outline'; small?: boolean }) {
  const [hov, setHov] = useState(false)
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 7,
    padding: small ? '8px 16px' : '12px 22px',
    borderRadius: 9,
    textDecoration: 'none',
    fontSize: small ? 13 : 14,
    fontWeight: 700,
    fontFamily: 'var(--font-display)',
    letterSpacing: '-0.02em',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.18s',
  }
  const styles = {
    primary: { background: hov ? C.blueDark : C.blue, color: '#fff', boxShadow: hov ? '0 4px 16px rgba(37,99,235,0.38)' : '0 2px 8px rgba(37,99,235,0.24)', transform: hov ? 'translateY(-1px)' : 'none' },
    ghost: { background: hov ? '#fff' : 'transparent', color: hov ? C.ink : C.muted, border: `1px solid ${hov ? C.border : C.border}` },
    outline: { background: hov ? C.borderLight : '#fff', color: C.ink, border: `1px solid ${C.border}`, transform: hov ? 'translateY(-1px)' : 'none' },
  }
  return (
    <a
      href={href || '#'}
      style={{ ...base, ...styles[variant] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </a>
  )
}

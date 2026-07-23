import { useState } from 'react'
import { C } from '../../constants'

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: 'var(--font-display)', fontSize: 13.5, fontWeight: 500,
        color: hov ? C.ink : C.muted, textDecoration: 'none',
        transition: 'color 0.15s', letterSpacing: '-0.01em',
        position: 'relative',
      }}>
      {children}
      <span style={{
        position: 'absolute', bottom: -3, left: 0, right: 0, height: 2,
        background: C.blue, borderRadius: 1,
        transform: hov ? 'scaleX(1)' : 'scaleX(0)',
        transition: 'transform 0.25s ease',
        transformOrigin: hov ? 'left' : 'right',
      }} />
    </a>
  )
}

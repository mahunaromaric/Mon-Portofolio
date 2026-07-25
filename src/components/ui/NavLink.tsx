import { useState } from 'react'
import { C } from '../../constants'

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: 'var(--font-sub)', fontSize: 13, fontWeight: 600,
        color: hov ? C.ink : C.muted, textDecoration: 'none',
        textTransform: 'uppercase', letterSpacing: '0.05em',
        transition: 'color 0.15s',
        position: 'relative', padding: '6px 0',
      }}>
      {children}
      <span style={{
        position: 'absolute', bottom: -3, left: 0, right: 0, height: 1,
        background: C.blue, borderRadius: 1,
        transform: hov ? 'scaleX(1)' : 'scaleX(0)',
        transition: 'transform 0.25s ease',
        transformOrigin: hov ? 'left' : 'right',
      }} />
    </a>
  )
}

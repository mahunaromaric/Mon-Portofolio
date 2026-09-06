import { useEffect } from 'react'
import { GitBranch, Globe, Mail } from 'lucide-react'

const PAPER = '#F8F7F4'
const INK = '#1F2937'
const MUTED = '#64748B'
const BLUE = '#2563EB'
const BORDER = '#E5E7EB'

const links = [
  { icon: <Mail size={15} />, label: 'romamahuna@gmail.com', href: 'mailto:romamahuna@gmail.com' },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    label: 'WhatsApp',
    href: 'https://wa.me/22961642237',
  },
  { icon: <GitBranch size={15} />, label: 'GitHub', href: 'https://github.com/mahunaromaric' },
  { icon: <Globe size={15} />, label: 'LinkedIn', href: 'https://linkedin.com/in/romaric-gbenou-174a853b5' },
]

export function Maintenance() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'En reconstruction — Mahuna'
    let meta = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    let created = false
    let prevContent: string | null = null
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'robots'
      document.head.appendChild(meta)
      created = true
    } else {
      prevContent = meta.content
    }
    meta.content = 'noindex, nofollow'
    return () => {
      document.title = prevTitle
      if (!meta) return
      if (created) meta.remove()
      else if (prevContent !== null) meta.content = prevContent
    }
  }, [])

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: PAPER,
        color: INK,
        fontFamily: 'var(--font-sans)',
        padding: '2rem',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 520 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: '1.5rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: BLUE, opacity: 0.75 }}>~ $ </span>
          <span style={{ fontFamily: 'Caveat, cursive', fontWeight: 600, fontSize: 30, lineHeight: 1 }}>Mahuna</span>
          <span className="caret" aria-hidden style={{ width: 8, height: 17, background: BLUE, display: 'inline-block', marginLeft: 6 }} />
        </div>

        <div
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: MUTED,
            border: `1px solid ${BORDER}`,
            background: '#FFFFFF',
            borderRadius: 999,
            padding: '6px 14px',
            marginBottom: '1.25rem',
          }}
        >
          En reconstruction
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.9rem, 4.5vw, 2.7rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.15,
            marginBottom: '0.9rem',
          }}
        >
          Le portfolio fait peau neuve.
        </h1>
        <p style={{ fontFamily: 'var(--font-sub)', fontSize: 15.5, lineHeight: 1.75, color: MUTED, marginBottom: '2rem' }}>
          Je reconstruis le site pour mieux raconter mon travail. De retour très bientôt — en attendant, écrivons-nous.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                padding: '11px 18px',
                borderRadius: 10,
                background: '#FFFFFF',
                border: `1px solid ${BORDER}`,
                color: INK,
                fontFamily: 'var(--font-display)',
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'border-color 0.15s, color 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = BLUE
                e.currentTarget.style.color = BLUE
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = BORDER
                e.currentTarget.style.color = INK
              }}
            >
              {l.icon} {l.label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes caret-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .caret { animation: caret-blink 1.1s step-end infinite; }
        @media (prefers-reduced-motion: reduce) { .caret { animation: none; } }
      `}</style>
    </main>
  )
}

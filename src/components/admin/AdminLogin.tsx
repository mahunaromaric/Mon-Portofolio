import { useState } from 'react'
import { supabase } from '../../supabase/client'
import { C } from '../../constants'

export function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) { setError('Supabase non configuré'); return }
    setBusy(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setBusy(false)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      background: 'linear-gradient(135deg, #F8F7F4 0%, #EFF6FF 100%)',
    }}>
      {/* Panneau gauche - branding */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        padding: '4rem',
      }}>
        <div style={{ maxWidth: 400, width: '100%' }}>
          <svg width="48" height="48" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '1.5rem' }}>
            <path d="M25 110V38L45 38C52 38 57 43 57 50C57 55 53 59 49 61L70 24L91 61C87 59 83 55 83 50C83 43 88 38 95 38L115 38V110" stroke="#1a3a6b" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M70 24L48 78M70 24L92 78" stroke="#2563eb" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 55L4 70L12 85" stroke="#2563eb" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M128 55L136 70L128 85" stroke="#2563eb" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800,
            letterSpacing: '-0.04em', color: C.ink, marginBottom: 4,
          }}>
            Administration
          </h1>
          <p style={{
            fontFamily: 'var(--font-sub)', fontSize: 15, color: C.muted,
            marginBottom: '2.5rem', lineHeight: 1.6,
          }}>
            Connecte-toi pour gérer les projets, compétences, articles et messages du portfolio.
          </p>

          <form onSubmit={login}>
            {error && (
              <div style={{
                fontFamily: 'var(--font-sub)', fontSize: 13, color: '#DC2626',
                background: '#FEF2F2', padding: '10px 14px', borderRadius: 10,
                marginBottom: '1rem', border: '1px solid #FECACA',
              }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                fontFamily: 'var(--font-display)', fontSize: 12.5, fontWeight: 600,
                color: C.ink2, display: 'block', marginBottom: 6,
              }}>
                Email
              </label>
              <input
                type="email" required value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder="romamahuna@gmail.com"
                className="admin-input"
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: 10,
                  border: `1px solid ${C.border}`, fontFamily: 'var(--font-sans)',
                  fontSize: 14, outline: 'none', background: '#fff',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => e.target.style.borderColor = C.blue}
                onBlur={e => e.target.style.borderColor = C.border}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                fontFamily: 'var(--font-display)', fontSize: 12.5, fontWeight: 600,
                color: C.ink2, display: 'block', marginBottom: 6,
              }}>
                Mot de passe
              </label>
              <input
                type="password" required value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                className="admin-input"
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: 10,
                  border: `1px solid ${C.border}`, fontFamily: 'var(--font-sans)',
                  fontSize: 14, outline: 'none', background: '#fff',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => e.target.style.borderColor = C.blue}
                onBlur={e => e.target.style.borderColor = C.border}
              />
            </div>

            <button
              type="submit" disabled={busy}
              style={{
                width: '100%', padding: '13px', background: busy ? C.slate : C.ink,
                color: '#fff', border: 'none', borderRadius: 10,
                fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700,
                cursor: busy ? 'not-allowed' : 'pointer',
                transition: 'all 0.18s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
              onMouseEnter={e => { if (!busy) e.currentTarget.style.background = C.blue }}
              onMouseLeave={e => { if (!busy) e.currentTarget.style.background = C.ink }}
            >
              {busy ? (
                <>
                  <span style={{
                    width: 16, height: 16, borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: '#fff',
                    animation: 'spin 0.6s linear infinite',
                    display: 'inline-block',
                  }} />
                  Connexion...
                </>
              ) : 'Se connecter'}
            </button>
          </form>

          <a href="/"
            style={{
              display: 'block', textAlign: 'center', marginTop: '2rem',
              fontFamily: 'var(--font-sub)', fontSize: 13, color: C.muted,
              textDecoration: 'none',
            }}
            onMouseEnter={e => e.currentTarget.style.color = C.blue}
            onMouseLeave={e => e.currentTarget.style.color = C.muted}
          >
            ← Retour au portfolio
          </a>
        </div>
      </div>

      {/* Panneau droit - décoratif */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        padding: '4rem', background: C.ink, color: '#fff',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-30%', right: '-20%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'rgba(37,99,235,0.08)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-20%', left: '-10%',
          width: 300, height: 300, borderRadius: '50%',
          background: 'rgba(37,99,235,0.05)',
        }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 360 }}>
          <svg width="64" height="64" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '2rem' }}>
            <path d="M25 110V38L45 38C52 38 57 43 57 50C57 55 53 59 49 61L70 24L91 61C87 59 83 55 83 50C83 43 88 38 95 38L115 38V110" stroke="#94A3B8" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M70 24L48 78M70 24L92 78" stroke="#2563eb" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 55L4 70L12 85" stroke="#2563eb" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M128 55L136 70L128 85" stroke="#2563eb" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800,
            letterSpacing: '-0.03em', marginBottom: '0.75rem',
          }}>
            Mahuna
          </h2>
          <p style={{
            fontFamily: 'var(--font-sub)', fontSize: 14, lineHeight: 1.7,
            color: '#94A3B8',
          }}>
            Romaric Mahuna GBENOU<br />
            Développeur Full Stack
          </p>
        </div>
      </div>
    </div>
  )
}

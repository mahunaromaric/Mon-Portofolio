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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F7F4' }}>
      <form onSubmit={login} style={{ background: '#fff', padding: '3rem', borderRadius: 20, width: '100%', maxWidth: 400, boxShadow: '0 4px 32px rgba(0,0,0,0.06)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, letterSpacing: '-0.04em', color: C.ink, marginBottom: 4 }}>Connexion</h1>
        <p style={{ fontFamily: 'var(--font-sub)', fontSize: 14, color: C.muted, marginBottom: '2rem' }}>Administration du portfolio</p>
        {error && <p style={{ fontFamily: 'var(--font-sub)', fontSize: 13, color: '#DC2626', background: '#FEF2F2', padding: '8px 12px', borderRadius: 8, marginBottom: '1rem' }}>{error}</p>}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontFamily: 'var(--font-display)', fontSize: 12.5, fontWeight: 600, color: C.ink2, display: 'block', marginBottom: 6 }}>Email</label>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: `1px solid ${C.border}`, fontFamily: 'var(--font-sans)', fontSize: 14, outline: 'none' }}
            onFocus={e => e.target.style.borderColor = C.blue}
            onBlur={e => e.target.style.borderColor = C.border} />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ fontFamily: 'var(--font-display)', fontSize: 12.5, fontWeight: 600, color: C.ink2, display: 'block', marginBottom: 6 }}>Mot de passe</label>
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: `1px solid ${C.border}`, fontFamily: 'var(--font-sans)', fontSize: 14, outline: 'none' }}
            onFocus={e => e.target.style.borderColor = C.blue}
            onBlur={e => e.target.style.borderColor = C.border} />
        </div>
        <button type="submit" disabled={busy}
          style={{ width: '100%', padding: '12px', background: C.ink, color: '#fff', border: 'none', borderRadius: 10, fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, cursor: 'pointer', opacity: busy ? 0.6 : 1 }}>
          {busy ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  )
}

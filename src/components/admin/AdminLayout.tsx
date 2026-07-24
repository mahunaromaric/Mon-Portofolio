import { useLocation } from 'react-router-dom'
import { supabase } from '../../supabase/client'
import { C } from '../../constants'

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: '📊' },
  { path: '/admin/projects', label: 'Projets', icon: '📁' },
  { path: '/admin/skills', label: 'Compétences', icon: '⚡' },
  { path: '/admin/experiences', label: 'Expériences', icon: '📅' },
  { path: '/admin/articles', label: 'Articles', icon: '📝' },
  { path: '/admin/messages', label: 'Messages', icon: '✉️' },
  { path: '/admin/analytics', label: 'Analytics', icon: '📈' },
]

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const loc = useLocation()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F7F4' }}>
      <aside style={{ width: 240, background: C.ink, padding: '2rem 0', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
          <a href="/" style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: '#fff', textDecoration: 'none', letterSpacing: '-0.04em' }}>Mahuna</a>
          <p style={{ fontFamily: 'var(--font-sub)', fontSize: 11.5, color: '#64748B', marginTop: 2 }}>Administration</p>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map(item => {
            const active = loc.pathname === item.path
            return (
              <a key={item.path} href={item.path}
                onClick={e => { e.preventDefault(); window.history.pushState({}, '', item.path); window.dispatchEvent(new PopStateEvent('popstate')) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 1.5rem',
                  fontFamily: 'var(--font-sub)', fontSize: 13.5, fontWeight: active ? 700 : 500,
                  color: active ? '#fff' : '#94A3B8', textDecoration: 'none',
                  background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                  borderRight: active ? `3px solid ${C.blue}` : '3px solid transparent',
                  transition: 'all 0.12s',
                }}>
                <span>{item.icon}</span>
                {item.label}
              </a>
            )
          })}
        </nav>
        <div style={{ marginTop: 'auto', padding: '1.5rem', borderTop: '1px solid #1E293B' }}>
          <button onClick={() => supabase?.auth.signOut()}
            style={{ width: '100%', padding: '8px', background: 'transparent', border: `1px solid #334155`, borderRadius: 8, fontFamily: 'var(--font-sub)', fontSize: 12.5, fontWeight: 600, color: '#94A3B8', cursor: 'pointer' }}>
            Déconnexion
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
        {children}
      </main>
    </div>
  )
}

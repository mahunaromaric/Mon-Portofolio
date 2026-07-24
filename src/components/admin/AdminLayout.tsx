import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { LayoutDashboard, Folder, Zap, Calendar, FileText, Mail, TrendingUp, Menu, LogOut } from 'lucide-react'
import { supabase } from '../../supabase/client'
import { useSession } from '../../lib/auth'
import { C } from '../../constants'

const iconSize = 16
const navItems = [
  { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={iconSize} /> },
  { path: '/admin/projects', label: 'Projets', icon: <Folder size={iconSize} /> },
  { path: '/admin/skills', label: 'Compétences', icon: <Zap size={iconSize} /> },
  { path: '/admin/experiences', label: 'Expériences', icon: <Calendar size={iconSize} /> },
  { path: '/admin/articles', label: 'Articles', icon: <FileText size={iconSize} /> },
  { path: '/admin/messages', label: 'Messages', icon: <Mail size={iconSize} /> },
  { path: '/admin/analytics', label: 'Analytics', icon: <TrendingUp size={iconSize} /> },
]

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const loc = useLocation()
  const { session } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigate = (path: string) => {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
    setSidebarOpen(false)
  }

  const currentLabel = navItems.find(i => i.path === loc.pathname)?.label || 'Dashboard'
  const email = session?.user?.email || ''

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F7F4' }}>

      {/* Sidebar */}
      <aside className={`admin-sidebar${sidebarOpen ? ' open' : ''}`} style={{
        width: 240, background: C.ink, display: 'flex', flexDirection: 'column', flexShrink: 0,
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100,
        transition: 'transform 0.25s ease',
      }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #1E293B' }}>
          <a href="/" style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: '#fff', textDecoration: 'none', letterSpacing: '-0.04em' }}>Mahuna</a>
          <p style={{ fontFamily: 'var(--font-sub)', fontSize: 11.5, color: '#64748B', marginTop: 2 }}>Administration</p>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '0.75rem 0', flex: 1 }}>
          {navItems.map(item => {
            const active = loc.pathname === item.path
            return (
              <a key={item.path} href={item.path} onClick={e => { e.preventDefault(); navigate(item.path) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 1.5rem',
                  fontFamily: 'var(--font-sub)', fontSize: 13.5, fontWeight: active ? 700 : 500,
                  color: active ? '#fff' : '#94A3B8', textDecoration: 'none',
                  background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                  borderRight: active ? `3px solid ${C.blue}` : '3px solid transparent',
                  transition: 'all 0.12s',
                }}>
                {item.icon}
                {item.label}
              </a>
            )
          })}
        </nav>
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #1E293B' }}>
          <button onClick={() => supabase?.auth.signOut()}
            style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '8px 12px', background: 'transparent', border: `1px solid #334155`, borderRadius: 8, fontFamily: 'var(--font-sub)', fontSize: 12.5, fontWeight: 600, color: '#94A3B8', cursor: 'pointer' }}>
            <LogOut size={14} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 99 }} />
      )}

      {/* Contenu principal */}
      <div style={{ flex: 1, marginLeft: 0, minWidth: 0 }} className="admin-main">

        {/* Header bar */}
        <header style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 1.5rem', background: '#fff', borderBottom: `1px solid ${C.border}`,
          position: 'sticky', top: 0, zIndex: 50,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setSidebarOpen(true)} className="admin-menu-btn"
              style={{ display: 'none', background: 'transparent', border: 'none', cursor: 'pointer', color: C.ink, padding: 4 }}>
              <Menu size={20} />
            </button>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: C.ink }}>{currentLabel}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontFamily: 'var(--font-sub)', fontSize: 12.5, color: C.muted }}>{email}</div>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: C.blueLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, color: C.blue, flexShrink: 0 }}>
              {email.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Body */}
        <main style={{ padding: '2rem' }}>
          {children}
        </main>
      </div>
    </div>
  )
}

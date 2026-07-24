import { supabase } from '../../supabase/client'
import { useSession } from '../../lib/auth'
import { AdminLogin } from './AdminLogin'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { session, loading } = useSession()

  if (!supabase) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F7F4' }}>
        <p style={{ fontFamily: 'var(--font-sub)', fontSize: 14, color: '#64748B' }}>
          Supabase non configuré. Ajoute VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env.local
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F7F4' }}>
        <p style={{ fontFamily: 'var(--font-sub)', fontSize: 14, color: '#64748B' }}>Chargement...</p>
      </div>
    )
  }

  if (!session) return <AdminLogin />
  return <>{children}</>
}

import { useEffect, useState } from 'react'
import { Eye, Download, Mail, TrendingUp, MousePointerClick } from 'lucide-react'
import { supabase } from '../../supabase/client'
import { C } from '../../constants'

export function DashboardPage() {
  const [stats, setStats] = useState({ views: 0, viewsToday: 0, downloads: 0, messages: 0, unread: 0 })
  const [viewsData, setViewsData] = useState<{ date: string; count: number }[]>([])
  const [downloadsData, setDownloadsData] = useState<{ date: string; count: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) return
    const today = new Date().toISOString().slice(0, 10)

    Promise.all([
      supabase.from('page_views').select('count').eq('date', today).maybeSingle(),
      supabase.from('page_views').select('*').order('date', { ascending: false }).limit(30),
      supabase.from('downloads').select('count').maybeSingle(),
      supabase.from('downloads').select('*').order('date', { ascending: false }).limit(30),
      supabase.from('messages').select('id', { count: 'exact', head: true }),
      supabase.from('messages').select('id', { count: 'exact', head: true }).eq('read', false),
    ]).then(([vToday, vHist, dTotal, dHist, msg, unr]) => {
      setStats({
        viewsToday: (vToday.data as any)?.count ?? 0,
        views: vHist.data?.reduce((s: number, r: any) => s + r.count, 0) ?? 0,
        downloads: (dTotal.data as any)?.count ?? 0,
        messages: msg.count ?? 0,
        unread: unr.count ?? 0,
      })
      if (vHist.data) setViewsData(vHist.data.reverse())
      if (dHist.data) setDownloadsData(dHist.data.reverse())
      setLoading(false)
    })
  }, [])

  const maxView = Math.max(...viewsData.map(d => d.count), 1)
  const maxDl = Math.max(...downloadsData.map(d => d.count), 1)

  if (loading) return <p style={{ fontFamily: 'var(--font-sub)', color: C.muted }}>Chargement...</p>

  const cards = [
    { label: 'Vues totales', value: stats.views.toLocaleString(), sub: `${stats.viewsToday} aujourd'hui`, icon: <Eye size={18} />, color: C.blue },
    { label: 'Téléchargements CV', value: stats.downloads.toLocaleString(), icon: <Download size={18} />, color: C.teal },
    { label: 'Messages reçus', value: stats.messages.toLocaleString(), sub: `${stats.unread} non lus`, icon: <Mail size={18} />, color: C.orange },
  ]

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, letterSpacing: '-0.04em', color: C.ink, marginBottom: '1.5rem' }}>
        Dashboard
      </h1>

      {/* Cartes stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {cards.map(c => (
          <div key={c.label} style={{
            background: '#fff', borderRadius: 16, padding: '1.5rem',
            border: `1px solid ${C.border}`,
            transition: 'box-shadow 0.2s',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div style={{ fontFamily: 'var(--font-sub)', fontSize: 12.5, color: C.muted, fontWeight: 500 }}>{c.label}</div>
              <span style={{ color: c.color, opacity: 0.7 }}>{c.icon}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: c.color, letterSpacing: '-0.04em', lineHeight: 1 }}>
              {c.value}
            </div>
            {c.sub && (
              <div style={{ fontFamily: 'var(--font-sub)', fontSize: 12, color: C.slate, marginTop: 6 }}>{c.sub}</div>
            )}
          </div>
        ))}
      </div>

      {/* Graphiques */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Vues */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '1.5rem', border: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
            <TrendingUp size={16} color={C.blue} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: C.ink }}>Vues — 30 derniers jours</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 120 }}>
            {viewsData.map(d => (
              <div key={d.date} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{
                  width: '100%', background: C.blue, borderRadius: '4px 4px 0 0',
                  height: `${Math.max((d.count / maxView) * 100, d.count > 0 ? 3 : 0)}px`,
                  opacity: 0.75, transition: 'height 0.3s',
                }} title={`${d.date}: ${d.count} vues`} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: C.slate }}>{d.date.slice(5)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Téléchargements */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '1.5rem', border: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
            <MousePointerClick size={16} color={C.teal} />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: C.ink }}>Downloads CV — 30 derniers jours</h2>
          </div>
          {downloadsData.length > 0 ? (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 120 }}>
              {downloadsData.map(d => (
                <div key={d.date} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <div style={{
                    width: '100%', background: C.teal, borderRadius: '4px 4px 0 0',
                    height: `${Math.max((d.count / maxDl) * 100, d.count > 0 ? 3 : 0)}px`,
                    opacity: 0.75, transition: 'height 0.3s',
                  }} title={`${d.date}: ${d.count} downloads`} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: C.slate }}>{d.date.slice(5)}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontFamily: 'var(--font-sub)', fontSize: 13, color: C.muted, textAlign: 'center', padding: '2rem 0' }}>
              Aucun téléchargement pour l'instant
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

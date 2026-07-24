import { useEffect, useState } from 'react'
import { supabase } from '../../supabase/client'
import { C } from '../../constants'

export function AnalyticsPage() {
  const [data, setData] = useState<{ date: string; count: number }[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) return
    supabase.from('page_views').select('*').order('date', { ascending: false }).limit(30).then(({ data: rows }) => {
      if (rows) {
        setData(rows.reverse())
        setTotal(rows.reduce((s, r) => s + r.count, 0))
      }
      setLoading(false)
    })
  }, [])

  const maxCount = Math.max(...data.map(d => d.count), 1)

  if (loading) return <p style={{ fontFamily: 'var(--font-sub)', color: C.muted }}>Chargement...</p>

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, letterSpacing: '-0.04em', color: C.ink, marginBottom: 4 }}>Analytics</h1>
      <p style={{ fontFamily: 'var(--font-sub)', fontSize: 32, fontWeight: 700, color: C.blue, marginBottom: '2rem' }}>{total} vues</p>

      <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', border: `1px solid ${C.border}` }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: '1.5rem' }}>30 derniers jours</h2>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 150 }}>
          {data.map(d => (
            <div key={d.date} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <div style={{
                width: '100%', background: C.blue, borderRadius: '4px 4px 0 0',
                height: `${(d.count / maxCount) * 120}px`,
                minHeight: d.count > 0 ? 4 : 0,
                opacity: 0.8,
                transition: 'height 0.3s',
              }} title={`${d.date}: ${d.count} vues`} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: C.slate, transform: 'rotate(-45deg)', whiteSpace: 'nowrap' }}>
                {d.date.slice(5)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

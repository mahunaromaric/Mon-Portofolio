import { useEffect, useState } from 'react'
import { supabase } from '../../supabase/client'
import { C } from '../../constants'

export function DashboardPage() {
  const [counts, setCounts] = useState({ projects: 0, messages: 0, unread: 0 })

  useEffect(() => {
    if (!supabase) return
    Promise.all([
      supabase.from('projects').select('id', { count: 'exact', head: true }),
      supabase.from('messages').select('id', { count: 'exact', head: true }),
      supabase.from('messages').select('id', { count: 'exact', head: true }).eq('read', false),
    ]).then(([p, m, u]) => {
      setCounts({ projects: p.count ?? 0, messages: m.count ?? 0, unread: u.count ?? 0 })
    })
  }, [])

  const cards = [
    { label: 'Projets', value: counts.projects, color: C.blue },
    { label: 'Messages', value: counts.messages, color: C.teal },
    { label: 'Non lus', value: counts.unread, color: C.orange },
  ]

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, letterSpacing: '-0.04em', color: C.ink, marginBottom: '1.5rem' }}>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        {cards.map(c => (
          <div key={c.label} style={{ background: '#fff', borderRadius: 16, padding: '1.5rem', border: `1px solid ${C.border}` }}>
            <div style={{ fontFamily: 'var(--font-sub)', fontSize: 13, color: C.muted, marginBottom: 6 }}>{c.label}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: c.color, letterSpacing: '-0.04em' }}>{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

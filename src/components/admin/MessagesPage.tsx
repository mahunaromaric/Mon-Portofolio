import { useEffect, useState } from 'react'
import { supabase } from '../../supabase/client'
import { C } from '../../constants'
import type { Database } from '../../supabase/schema'

type Message = Database['public']['Tables']['messages']['Row']

export function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Message | null>(null)

  const load = async () => {
    if (!supabase) return
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false })
    if (data) setMessages(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const markRead = async (id: number, read: boolean) => {
    if (!supabase) return
    await supabase.from('messages').update({ read }).eq('id', id)
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read } : m))
    if (selected?.id === id) setSelected(s => s ? { ...s, read } : null)
  }

  const remove = async (id: number) => {
    if (!supabase || !confirm('Supprimer ce message ?')) return
    await supabase.from('messages').delete().eq('id', id)
    setMessages(prev => prev.filter(m => m.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  if (loading) return <p style={{ fontFamily: 'var(--font-sub)', color: C.muted }}>Chargement...</p>

  const unread = messages.filter(m => !m.read)
  const read = messages.filter(m => m.read)

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, letterSpacing: '-0.04em', color: C.ink, marginBottom: '1.5rem' }}>Messages</h1>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1.5fr' : '1fr', gap: '1.5rem' }}>
        <div>
          {unread.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Non lus ({unread.length})</h2>
              {unread.map(m => <MessageRow key={m.id} msg={m} active={selected?.id === m.id} onClick={() => { setSelected(m); if (!m.read) markRead(m.id, true) }} onDelete={() => remove(m.id)} />)}
            </div>
          )}
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: C.muted, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Lus ({read.length})</h2>
            {read.map(m => <MessageRow key={m.id} msg={m} active={selected?.id === m.id} onClick={() => setSelected(m)} onDelete={() => remove(m.id)} />)}
          </div>
          {messages.length === 0 && <p style={{ fontFamily: 'var(--font-sub)', color: C.muted }}>Aucun message.</p>}
        </div>

        {selected && (
          <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', border: `1px solid ${C.border}`, position: 'sticky', top: '2rem', alignSelf: 'start' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: C.ink }}>{selected.name}</div>
              <a href={`mailto:${selected.email}`} style={{ fontFamily: 'var(--font-sub)', fontSize: 12.5, color: C.blue, textDecoration: 'none' }}>{selected.email}</a>
            </div>
            <div style={{ fontFamily: 'var(--font-sub)', fontSize: 12.5, color: C.muted, marginBottom: '0.75rem' }}>Sujet : <strong style={{ color: C.ink2 }}>{selected.subject}</strong></div>
            <div style={{ fontFamily: 'var(--font-sub)', fontSize: 13.5, lineHeight: 1.7, color: C.ink2, whiteSpace: 'pre-wrap' }}>{selected.message}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: C.slate, marginTop: '1.5rem' }}>{new Date(selected.created_at).toLocaleString('fr-FR')}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: '1rem' }}>
              <button onClick={() => markRead(selected.id, !selected.read)}
                style={{ padding: '6px 14px', background: 'transparent', color: C.blue, border: `1px solid ${C.blue}40`, borderRadius: 6, fontFamily: 'var(--font-sub)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                {selected.read ? 'Marquer non lu' : 'Marquer lu'}
              </button>
              <button onClick={() => remove(selected.id)}
                style={{ padding: '6px 14px', background: 'transparent', color: '#DC2626', border: '1px solid #FCA5A5', borderRadius: 6, fontFamily: 'var(--font-sub)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                Supprimer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function MessageRow({ msg, active, onClick, onDelete }: { msg: Message; active: boolean; onClick: () => void; onDelete: () => void }) {
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '10px 14px', cursor: 'pointer',
      background: active ? C.blueLight : msg.read ? '#fff' : '#F8FAFC',
      borderRadius: 10, marginBottom: 6, border: `1px solid ${active ? C.blue : C.border}`, transition: 'all 0.12s',
    }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: msg.read ? 'transparent' : C.blue, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 13.5, fontWeight: msg.read ? 500 : 700, color: C.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.name}</div>
        <div style={{ fontFamily: 'var(--font-sub)', fontSize: 12, color: C.muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.subject}</div>
      </div>
      <button onClick={e => { e.stopPropagation(); onDelete() }}
        style={{ padding: '3px 8px', background: 'transparent', color: '#94A3B8', border: 'none', borderRadius: 4, fontFamily: 'var(--font-sub)', fontSize: 11, cursor: 'pointer' }}>
        ✕
      </button>
    </div>
  )
}

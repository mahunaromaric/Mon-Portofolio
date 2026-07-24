import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { supabase } from '../../supabase/client'
import { C } from '../../constants'
import { useToast } from '../../lib/toast'
import type { Database } from '../../supabase/schema'

type Message = Database['public']['Tables']['messages']['Row']

export function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Message | null>(null)
  const { toast } = useToast()

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
    toast('Message supprimé')
    setMessages(prev => prev.filter(m => m.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  if (loading) return <p style={{ fontFamily: 'var(--font-sub)', color: C.muted }}>Chargement...</p>

  const unread = messages.filter(m => !m.read)
  const read = messages.filter(m => m.read)

  const renderList = (items: Message[], title: string) => (
    <div style={{ marginBottom: items.length > 0 ? '1.5rem' : 0 }}>
      {items.length > 0 && (
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: title === 'Non lus' ? C.ink : C.muted, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {title} ({items.length})
        </h2>
      )}
      {items.map(m => (
        <div key={m.id} onClick={() => { setSelected(m); if (!m.read) markRead(m.id, true) }} style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '10px 14px', cursor: 'pointer',
          background: selected?.id === m.id ? C.blueLight : m.read ? '#fff' : '#F8FAFC',
          borderRadius: 10, marginBottom: 6, border: `1px solid ${selected?.id === m.id ? C.blue : C.border}`,
          transition: 'all 0.12s',
        }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: m.read ? 'transparent' : C.blue, flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 13.5, fontWeight: m.read ? 500 : 700, color: C.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.name}</div>
            <div style={{ fontFamily: 'var(--font-sub)', fontSize: 12, color: C.muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.subject}</div>
          </div>
          <button onClick={e => { e.stopPropagation(); remove(m.id) }}
            style={{ padding: 4, background: 'transparent', color: '#94A3B8', border: 'none', borderRadius: 4, cursor: 'pointer', display: 'flex' }}>
            <X size={12} strokeWidth={3} />
          </button>
        </div>
      ))}
    </div>
  )

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, letterSpacing: '-0.04em', color: C.ink, marginBottom: '1.5rem' }}>Messages</h1>

      {messages.length === 0 ? (
        <p style={{ fontFamily: 'var(--font-sub)', color: C.muted }}>Aucun message.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1.5fr' : '1fr', gap: '1.5rem', alignItems: 'start' }}>
          <div>
            {renderList(unread, 'Non lus')}
            {renderList(read, 'Lus')}
          </div>
          {selected && (
            <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', border: `1px solid ${C.border}`, position: 'sticky', top: '5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: C.ink }}>{selected.name}</div>
                <a href={`mailto:${selected.email}`} style={{ fontFamily: 'var(--font-sub)', fontSize: 13, color: C.blue, textDecoration: 'none' }}>{selected.email}</a>
              </div>
              <div style={{ fontFamily: 'var(--font-sub)', fontSize: 13, color: C.muted, marginBottom: '0.75rem' }}>
                Sujet : <strong style={{ color: C.ink2 }}>{selected.subject}</strong>
              </div>
              <div style={{ fontFamily: 'var(--font-sub)', fontSize: 14, lineHeight: 1.7, color: C.ink2, whiteSpace: 'pre-wrap' }}>{selected.message}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: C.slate, marginTop: '1.5rem' }}>
                {new Date(selected.created_at).toLocaleString('fr-FR')}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: '1rem' }}>
                <button onClick={() => markRead(selected.id, !selected.read)}
                  style={{ padding: '8px 16px', background: 'transparent', color: C.blue, border: `1px solid ${C.blue}40`, borderRadius: 8, fontFamily: 'var(--font-sub)', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.12s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.blue; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.blue }}>
                  {selected.read ? 'Marquer non lu' : 'Marquer lu'}
                </button>
                <button onClick={() => remove(selected.id)}
                  style={{ padding: '8px 16px', background: 'transparent', color: '#DC2626', border: '1px solid #FCA5A5', borderRadius: 8, fontFamily: 'var(--font-sub)', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.12s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#DC2626'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#DC2626' }}>
                  Supprimer
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

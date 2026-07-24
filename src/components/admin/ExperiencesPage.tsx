import { useEffect, useState } from 'react'
import { supabase } from '../../supabase/client'
import { C } from '../../constants'
import type { Database } from '../../supabase/schema'

type Experience = Database['public']['Tables']['experiences']['Row']

export function ExperiencesPage() {
  const [items, setItems] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<number | 'new' | null>(null)
  const [form, setForm] = useState({ year: '', role: '', company: '', description: '' })

  const load = async () => {
    if (!supabase) return
    const { data } = await supabase.from('experiences').select('*').order('sort_order')
    if (data) setItems(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const save = async () => {
    if (!supabase) return
    if (editing === 'new') {
      await supabase.from('experiences').insert({ ...form, sort_order: items.length })
    } else {
      await supabase.from('experiences').update(form).eq('id', editing!)
    }
    setEditing(null)
    setForm({ year: '', role: '', company: '', description: '' })
    load()
  }

  const remove = async (id: number) => {
    if (!supabase || !confirm('Supprimer cette expérience ?')) return
    await supabase.from('experiences').delete().eq('id', id)
    load()
  }

  if (loading) return <p style={{ fontFamily: 'var(--font-sub)', color: C.muted }}>Chargement...</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, letterSpacing: '-0.04em', color: C.ink }}>Expériences</h1>
        <button onClick={() => { setEditing('new'); setForm({ year: '', role: '', company: '', description: '' }) }}
          style={{ padding: '8px 16px', background: C.blue, color: '#fff', border: 'none', borderRadius: 8, fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>+ Nouvelle</button>
      </div>

      {editing && (
        <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', marginBottom: '1.5rem', border: `1px solid ${C.border}` }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: C.ink, marginBottom: '1.25rem' }}>
            {editing === 'new' ? 'Nouvelle expérience' : 'Modifier'}
          </h2>
          {(['year', 'role', 'company'] as const).map(f => (
            <div key={f} style={{ marginBottom: '0.75rem' }}>
              <label style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 600, color: C.ink2, display: 'block', marginBottom: 4, textTransform: 'capitalize' }}>{f}</label>
              <input value={form[f]} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: `1px solid ${C.border}`, fontFamily: 'var(--font-sans)', fontSize: 13, outline: 'none' }} />
            </div>
          ))}
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 600, color: C.ink2, display: 'block', marginBottom: 4 }}>Description</label>
            <textarea rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: `1px solid ${C.border}`, fontFamily: 'var(--font-sans)', fontSize: 13, outline: 'none', resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: '1rem' }}>
            <button onClick={save} style={{ padding: '8px 20px', background: C.ink, color: '#fff', border: 'none', borderRadius: 8, fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Enregistrer</button>
            <button onClick={() => setEditing(null)} style={{ padding: '8px 20px', background: 'transparent', color: C.muted, border: `1px solid ${C.border}`, borderRadius: 8, fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Annuler</button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {items.map(exp => (
          <div key={exp.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#fff', borderRadius: 12, padding: '1rem 1.25rem', border: `1px solid ${C.border}` }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, fontWeight: 600, color: C.blue, minWidth: 80 }}>{exp.year}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: C.ink }}>{exp.role}</div>
              <div style={{ fontFamily: 'var(--font-sub)', fontSize: 12.5, color: C.muted, marginTop: 2 }}>{exp.company}</div>
            </div>
            <button onClick={() => { setEditing(exp.id); setForm({ year: exp.year, role: exp.role, company: exp.company, description: exp.description }) }}
              style={{ padding: '5px 12px', background: 'transparent', color: C.blue, border: `1px solid ${C.blue}40`, borderRadius: 6, fontFamily: 'var(--font-sub)', fontSize: 12, cursor: 'pointer' }}>Modifier</button>
            <button onClick={() => remove(exp.id)}
              style={{ padding: '5px 12px', background: 'transparent', color: '#DC2626', border: '1px solid #FCA5A5', borderRadius: 6, fontFamily: 'var(--font-sub)', fontSize: 12, cursor: 'pointer' }}>Suppr.</button>
          </div>
        ))}
        {items.length === 0 && <p style={{ fontFamily: 'var(--font-sub)', color: C.muted }}>Aucune expérience.</p>}
      </div>
    </div>
  )
}

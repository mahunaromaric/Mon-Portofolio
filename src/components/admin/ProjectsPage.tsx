import { useEffect, useState } from 'react'
import { supabase } from '../../supabase/client'
import { C } from '../../constants'
import type { Database } from '../../supabase/schema'

type Project = Database['public']['Tables']['projects']['Row']

const emptyForm = { title: '', subtitle: '', description: '', tags: '', focus: '', accent: C.blue }

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [editing, setEditing] = useState<number | 'new' | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)

  const load = async () => {
    if (!supabase) return
    const { data } = await supabase.from('projects').select('*').order('sort_order')
    if (data) setProjects(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const save = async () => {
    if (!supabase) return
    const payload = {
      ...form,
      tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
      focus: form.focus.split(',').map(s => s.trim()).filter(Boolean),
    }
    if (editing === 'new') {
      await supabase.from('projects').insert({ ...payload, published: false, sort_order: projects.length })
    } else {
      await supabase.from('projects').update(payload).eq('id', editing!)
    }
    setEditing(null)
    setForm(emptyForm)
    load()
  }

  const remove = async (id: number) => {
    if (!supabase || !confirm('Supprimer ce projet ?')) return
    await supabase.from('projects').delete().eq('id', id)
    load()
  }

  const toggle = async (id: number, published: boolean) => {
    if (!supabase) return
    await supabase.from('projects').update({ published }).eq('id', id)
    load()
  }

  if (loading) return <p style={{ fontFamily: 'var(--font-sub)', color: C.muted }}>Chargement...</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, letterSpacing: '-0.04em', color: C.ink }}>Projets</h1>
        <button onClick={() => { setEditing('new'); setForm(emptyForm) }}
          style={{ padding: '8px 16px', background: C.blue, color: '#fff', border: 'none', borderRadius: 8, fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
          + Nouveau
        </button>
      </div>

      {editing && (
        <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', marginBottom: '1.5rem', border: `1px solid ${C.border}` }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: C.ink, marginBottom: '1.25rem' }}>
            {editing === 'new' ? 'Nouveau projet' : 'Modifier le projet'}
          </h2>
          {(['title', 'subtitle', 'description'] as const).map(field => (
            <div key={field} style={{ marginBottom: '0.75rem' }}>
              <label style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 600, color: C.ink2, display: 'block', marginBottom: 4, textTransform: 'capitalize' }}>{field}</label>
              {field === 'description'
                ? <textarea rows={3} value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: `1px solid ${C.border}`, fontFamily: 'var(--font-sans)', fontSize: 13, outline: 'none', resize: 'vertical' }} />
                : <input value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: `1px solid ${C.border}`, fontFamily: 'var(--font-sans)', fontSize: 13, outline: 'none' }} />
              }
            </div>
          ))}
          {(['tags', 'focus'] as const).map(field => (
            <div key={field} style={{ marginBottom: '0.75rem' }}>
              <label style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 600, color: C.ink2, display: 'block', marginBottom: 4, textTransform: 'capitalize' }}>{field} (séparés par des virgules)</label>
              <input value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} placeholder="React, TypeScript, ..."
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: `1px solid ${C.border}`, fontFamily: 'var(--font-sans)', fontSize: 13, outline: 'none' }} />
            </div>
          ))}
          <div style={{ display: 'flex', gap: 8, marginTop: '1rem' }}>
            <button onClick={save} style={{ padding: '8px 20px', background: C.ink, color: '#fff', border: 'none', borderRadius: 8, fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Enregistrer</button>
            <button onClick={() => setEditing(null)} style={{ padding: '8px 20px', background: 'transparent', color: C.muted, border: `1px solid ${C.border}`, borderRadius: 8, fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Annuler</button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {projects.map(p => (
          <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#fff', borderRadius: 12, padding: '1rem 1.25rem', border: `1px solid ${C.border}` }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: C.ink }}>{p.title}</div>
              <div style={{ fontFamily: 'var(--font-sub)', fontSize: 12.5, color: C.muted, marginTop: 2 }}>{p.subtitle}</div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <input type="checkbox" checked={p.published} onChange={e => toggle(p.id, e.target.checked)} />
              <span style={{ fontFamily: 'var(--font-sub)', fontSize: 12, color: C.muted }}>Publié</span>
            </label>
            <button onClick={() => { setEditing(p.id); setForm({ title: p.title, subtitle: p.subtitle, description: p.description, tags: p.tags.join(', '), focus: p.focus.join(', '), accent: p.accent }) }}
              style={{ padding: '5px 12px', background: 'transparent', color: C.blue, border: `1px solid ${C.blue}40`, borderRadius: 6, fontFamily: 'var(--font-sub)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              Modifier
            </button>
            <button onClick={() => remove(p.id)}
              style={{ padding: '5px 12px', background: 'transparent', color: '#DC2626', border: '1px solid #FCA5A5', borderRadius: 6, fontFamily: 'var(--font-sub)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              Suppr.
            </button>
          </div>
        ))}
        {projects.length === 0 && <p style={{ fontFamily: 'var(--font-sub)', color: C.muted }}>Aucun projet pour l'instant.</p>}
      </div>
    </div>
  )
}

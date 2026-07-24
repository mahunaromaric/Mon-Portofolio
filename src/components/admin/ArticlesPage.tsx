import { useEffect, useState } from 'react'
import { supabase } from '../../supabase/client'
import { C } from '../../constants'
import type { Database } from '../../supabase/schema'

type Article = Database['public']['Tables']['articles']['Row']

export function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<number | 'new' | null>(null)
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', tags: '' })

  const load = async () => {
    if (!supabase) return
    const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false })
    if (data) setArticles(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const save = async () => {
    if (!supabase) return
    const payload = {
      title: form.title, slug: form.slug, excerpt: form.excerpt, content: form.content,
      tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
      published: true,
    }
    if (editing === 'new') {
      await supabase.from('articles').insert(payload)
    } else {
      await supabase.from('articles').update(payload).eq('id', editing!)
    }
    setEditing(null)
    setForm({ title: '', slug: '', excerpt: '', content: '', tags: '' })
    load()
  }

  const remove = async (id: number) => {
    if (!supabase || !confirm('Supprimer cet article ?')) return
    await supabase.from('articles').delete().eq('id', id)
    load()
  }

  const toggle = async (id: number, published: boolean) => {
    if (!supabase) return
    await supabase.from('articles').update({ published }).eq('id', id)
    load()
  }

  if (loading) return <p style={{ fontFamily: 'var(--font-sub)', color: C.muted }}>Chargement...</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, letterSpacing: '-0.04em', color: C.ink }}>Articles</h1>
        <button onClick={() => { setEditing('new'); setForm({ title: '', slug: '', excerpt: '', content: '', tags: '' }) }}
          style={{ padding: '8px 16px', background: C.blue, color: '#fff', border: 'none', borderRadius: 8, fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>+ Nouveau</button>
      </div>

      {editing && (
        <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', marginBottom: '1.5rem', border: `1px solid ${C.border}` }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: C.ink, marginBottom: '1.25rem' }}>
            {editing === 'new' ? 'Nouvel article' : 'Modifier'}
          </h2>
          {(['title', 'slug', 'excerpt'] as const).map(f => (
            <div key={f} style={{ marginBottom: '0.75rem' }}>
              <label style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 600, color: C.ink2, display: 'block', marginBottom: 4, textTransform: 'capitalize' }}>{f}</label>
              <input value={form[f]} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: `1px solid ${C.border}`, fontFamily: 'var(--font-sans)', fontSize: 13, outline: 'none' }} />
            </div>
          ))}
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 600, color: C.ink2, display: 'block', marginBottom: 4 }}>Contenu</label>
            <textarea rows={10} value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: `1px solid ${C.border}`, fontFamily: 'var(--font-mono)', fontSize: 13, outline: 'none', resize: 'vertical' }} />
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 600, color: C.ink2, display: 'block', marginBottom: 4 }}>Tags (séparés par des virgules)</label>
            <input value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} placeholder="React, JavaScript, ..."
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: `1px solid ${C.border}`, fontFamily: 'var(--font-sans)', fontSize: 13, outline: 'none' }} />
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: '1rem' }}>
            <button onClick={save} style={{ padding: '8px 20px', background: C.ink, color: '#fff', border: 'none', borderRadius: 8, fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Enregistrer</button>
            <button onClick={() => setEditing(null)} style={{ padding: '8px 20px', background: 'transparent', color: C.muted, border: `1px solid ${C.border}`, borderRadius: 8, fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Annuler</button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {articles.map(a => (
          <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#fff', borderRadius: 12, padding: '1rem 1.25rem', border: `1px solid ${C.border}` }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: C.ink }}>{a.title}</div>
              <div style={{ fontFamily: 'var(--font-sub)', fontSize: 12, color: C.muted, marginTop: 2 }}>{a.slug}</div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <input type="checkbox" checked={a.published} onChange={e => toggle(a.id, e.target.checked)} />
              <span style={{ fontFamily: 'var(--font-sub)', fontSize: 12, color: C.muted }}>Publié</span>
            </label>
            <button onClick={() => { setEditing(a.id); setForm({ title: a.title, slug: a.slug, excerpt: a.excerpt, content: a.content, tags: a.tags.join(', ') }) }}
              style={{ padding: '5px 12px', background: 'transparent', color: C.blue, border: `1px solid ${C.blue}40`, borderRadius: 6, fontFamily: 'var(--font-sub)', fontSize: 12, cursor: 'pointer' }}>Modifier</button>
            <button onClick={() => remove(a.id)}
              style={{ padding: '5px 12px', background: 'transparent', color: '#DC2626', border: '1px solid #FCA5A5', borderRadius: 6, fontFamily: 'var(--font-sub)', fontSize: 12, cursor: 'pointer' }}>Suppr.</button>
          </div>
        ))}
        {articles.length === 0 && <p style={{ fontFamily: 'var(--font-sub)', color: C.muted }}>Aucun article.</p>}
      </div>
    </div>
  )
}

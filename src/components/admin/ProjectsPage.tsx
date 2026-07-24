import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { supabase } from '../../supabase/client'
import { uploadImage } from '../../supabase/storage'
import { C } from '../../constants'
import { useToast } from '../../lib/toast'
import type { Database } from '../../supabase/schema'

type Project = Database['public']['Tables']['projects']['Row']

const emptyForm = { title: '', subtitle: '', description: '', tags: '', focus: '' }

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [editing, setEditing] = useState<number | 'new' | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  const load = async () => {
    if (!supabase) return
    const { data } = await supabase.from('projects').select('*').order('sort_order')
    if (data) setProjects(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const save = async () => {
    if (!supabase) return
    setSaving(true)
    let imageUrl: string | null = null
    if (imageFile) {
      const ext = imageFile.name.split('.').pop()
      imageUrl = await uploadImage(imageFile, `projects/${Date.now()}.${ext}`)
    }
    const payload = {
      title: form.title, subtitle: form.subtitle, description: form.description,
      tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
      focus: form.focus.split(',').map(s => s.trim()).filter(Boolean),
      ...(imageUrl ? { image_url: imageUrl } : {}),
    }
    const { error } = editing === 'new'
      ? await supabase.from('projects').insert({ ...payload, published: false, sort_order: projects.length })
      : await supabase.from('projects').update(payload).eq('id', editing!)
    setSaving(false)
    if (error) { toast('Erreur lors de l\'enregistrement', 'error'); return }
    toast(editing === 'new' ? 'Projet créé' : 'Projet modifié')
    setEditing(null); setForm(emptyForm); setImageFile(null); setImagePreview(null)
    load()
  }

  const remove = async (id: number) => {
    if (!supabase || !confirm('Supprimer ce projet ?')) return
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) { toast('Erreur lors de la suppression', 'error'); return }
    toast('Projet supprimé')
    load()
  }

  const toggle = async (id: number, published: boolean) => {
    if (!supabase) return
    await supabase.from('projects').update({ published }).eq('id', id)
    load()
  }

  const openEdit = (p: Project) => {
    setEditing(p.id)
    setForm({ title: p.title, subtitle: p.subtitle, description: p.description, tags: p.tags.join(', '), focus: p.focus.join(', ') })
    setImagePreview(p.image_url)
    setImageFile(null)
  }

  if (loading) return <p style={{ fontFamily: 'var(--font-sub)', color: C.muted }}>Chargement...</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, letterSpacing: '-0.04em', color: C.ink }}>Projets</h1>
        <button onClick={() => { setEditing('new'); setForm(emptyForm); setImageFile(null); setImagePreview(null) }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 18px', background: C.blue, color: '#fff', border: 'none', borderRadius: 9, fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s' }}>
          <Plus size={14} /> Nouveau
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
                    className="admin-input"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: `1px solid ${C.border}`, fontFamily: 'var(--font-sans)', fontSize: 13, outline: 'none', resize: 'vertical' }} />
                : <input value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    className="admin-input"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: `1px solid ${C.border}`, fontFamily: 'var(--font-sans)', fontSize: 13, outline: 'none' }} />
              }
            </div>
          ))}
          {(['tags', 'focus'] as const).map(field => (
            <div key={field} style={{ marginBottom: '0.75rem' }}>
              <label style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 600, color: C.ink2, display: 'block', marginBottom: 4, textTransform: 'capitalize' }}>{field} (séparés par des virgules)</label>
              <input value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} placeholder="React, TypeScript, ..."
                className="admin-input"
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: `1px solid ${C.border}`, fontFamily: 'var(--font-sans)', fontSize: 13, outline: 'none' }} />
            </div>
          ))}
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 600, color: C.ink2, display: 'block', marginBottom: 4 }}>Image</label>
            <input type="file" accept="image/*" onChange={e => {
              const f = e.target.files?.[0]
              if (f) { setImageFile(f); setImagePreview(URL.createObjectURL(f)) }
            }} style={{ fontFamily: 'var(--font-sans)', fontSize: 12 }} />
            {imagePreview && <img src={imagePreview} alt="" style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 8, marginTop: 8 }} />}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: '1rem' }}>
            <button onClick={save} disabled={saving}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', background: C.ink, color: '#fff', border: 'none', borderRadius: 9, fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, cursor: 'pointer', opacity: saving ? 0.6 : 1, transition: 'all 0.15s' }}>
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
            <button onClick={() => setEditing(null)} style={{ padding: '10px 20px', background: 'transparent', color: C.muted, border: `1px solid ${C.border}`, borderRadius: 9, fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Annuler</button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {projects.map(p => (
          <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#fff', borderRadius: 12, padding: '1rem 1.25rem', border: `1px solid ${C.border}` }}>
            {p.image_url && <img src={p.image_url} alt="" style={{ width: 48, height: 36, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />}
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: C.ink }}>{p.title}</div>
              <div style={{ fontFamily: 'var(--font-sub)', fontSize: 12.5, color: C.muted, marginTop: 2 }}>{p.subtitle}</div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <input type="checkbox" checked={p.published} onChange={e => toggle(p.id, e.target.checked)} />
              <span style={{ fontFamily: 'var(--font-sub)', fontSize: 12, color: C.muted }}>Publié</span>
            </label>
            <button onClick={() => openEdit(p)}
              style={{ padding: '6px 14px', background: 'transparent', color: C.blue, border: `1px solid ${C.blue}40`, borderRadius: 8, fontFamily: 'var(--font-sub)', fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.12s' }}
              onMouseEnter={e => { e.currentTarget.style.background = C.blue; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.blue }}>
              Modifier
            </button>
            <button onClick={() => remove(p.id)}
              style={{ padding: '6px 14px', background: 'transparent', color: '#DC2626', border: '1px solid #FCA5A5', borderRadius: 8, fontFamily: 'var(--font-sub)', fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.12s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#DC2626'; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#DC2626' }}>
              Suppr.
            </button>
          </div>
        ))}
        {projects.length === 0 && <p style={{ fontFamily: 'var(--font-sub)', color: C.muted }}>Aucun projet pour l'instant.</p>}
      </div>
    </div>
  )
}

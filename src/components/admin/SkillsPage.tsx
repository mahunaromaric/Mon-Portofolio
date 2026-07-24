import { useEffect, useState } from 'react'
import { supabase } from '../../supabase/client'
import { C } from '../../constants'
import type { Database } from '../../supabase/schema'

type Category = Database['public']['Tables']['skill_categories']['Row']
type Skill = Database['public']['Tables']['skills']['Row']

export function SkillsPage() {
  const [cats, setCats] = useState<(Category & { skills: Skill[] })[]>([])
  const [loading, setLoading] = useState(true)
  const [newCat, setNewCat] = useState('')

  const load = async () => {
    if (!supabase) return
    const { data: categories } = await supabase.from('skill_categories').select('*').order('id')
    const { data: skills } = await supabase.from('skills').select('*').order('sort_order')
    if (categories && skills) {
      setCats(categories.map(c => ({ ...c, skills: skills.filter(s => s.category_id === c.id) })))
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const addCat = async () => {
    if (!supabase || !newCat.trim()) return
    await supabase.from('skill_categories').insert({ name: newCat.trim() })
    setNewCat('')
    load()
  }

  const removeCat = async (id: number) => {
    if (!supabase || !confirm('Supprimer cette catégorie ?')) return
    await supabase.from('skill_categories').delete().eq('id', id)
    load()
  }

  const addSkill = async (catId: number) => {
    if (!supabase) return
    const name = prompt('Nouveau skill :')
    if (!name?.trim()) return
    await supabase.from('skills').insert({ category_id: catId, name: name.trim(), sort_order: 0 })
    load()
  }

  const removeSkill = async (id: number) => {
    if (!supabase || !confirm('Supprimer ce skill ?')) return
    await supabase.from('skills').delete().eq('id', id)
    load()
  }

  if (loading) return <p style={{ fontFamily: 'var(--font-sub)', color: C.muted }}>Chargement...</p>

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, letterSpacing: '-0.04em', color: C.ink, marginBottom: '1.5rem' }}>Compétences</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: '2rem' }}>
        <input value={newCat} onChange={e => setNewCat(e.target.value)} placeholder="Nouvelle catégorie (ex: Frontend)"
          style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: `1px solid ${C.border}`, fontFamily: 'var(--font-sans)', fontSize: 13, outline: 'none' }} />
        <button onClick={addCat} style={{ padding: '10px 18px', background: C.blue, color: '#fff', border: 'none', borderRadius: 8, fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Ajouter</button>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {cats.map(cat => (
          <div key={cat.id} style={{ background: '#fff', borderRadius: 16, padding: '1.25rem', border: `1px solid ${C.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: C.ink }}>{cat.name}</div>
              <button onClick={() => removeCat(cat.id)} style={{ padding: '3px 10px', background: 'transparent', color: '#DC2626', border: '1px solid #FCA5A5', borderRadius: 6, fontFamily: 'var(--font-sub)', fontSize: 12, cursor: 'pointer' }}>Suppr.</button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {cat.skills.map(s => (
                <span key={s.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', background: '#F1F5F9', borderRadius: 6, fontFamily: 'var(--font-sans)', fontSize: 12.5, color: C.ink2 }}>
                  {s.name}
                  <button onClick={() => removeSkill(s.id)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0, fontSize: 13, lineHeight: 1 }}>×</button>
                </span>
              ))}
              <button onClick={() => addSkill(cat.id)} style={{ padding: '4px 10px', background: 'transparent', border: `1px dashed ${C.border}`, borderRadius: 6, fontFamily: 'var(--font-sans)', fontSize: 12, color: C.muted, cursor: 'pointer' }}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

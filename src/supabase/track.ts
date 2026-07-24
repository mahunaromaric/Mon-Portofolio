import { supabase } from './client'

export async function trackDownload(file: string) {
  if (!supabase) return
  const today = new Date().toISOString().slice(0, 10)
  const { data } = await supabase.from('downloads').select('id, count').eq('file', file).eq('date', today).maybeSingle()
  if (data) {
    await supabase.from('downloads').update({ count: data.count + 1 }).eq('id', data.id)
  } else {
    await supabase.from('downloads').insert({ file, date: today, count: 1 })
  }
}

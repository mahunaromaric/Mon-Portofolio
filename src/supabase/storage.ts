import { supabase } from './client'

const BUCKET = 'images'

export async function uploadImage(file: File, path: string) {
  if (!supabase) return null
  const { data, error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true })
  if (error) { console.error('upload error', error); return null }
  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path)
  return urlData.publicUrl
}

export async function deleteImage(path: string) {
  if (!supabase) return
  await supabase.storage.from(BUCKET).remove([path])
}

export function publicUrl(path: string) {
  if (!supabase) return null
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
}

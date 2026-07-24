import { createClient } from '@supabase/supabase-js'
import type { Database } from './schema'

function createSupabaseClient() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase: VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY manquant.')
    return null
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}

export const supabase = createSupabaseClient()

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL or Anon Key is missing from environment variables.')
}

// If you use Supabase type generation (recommended):
// export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
// For now, using a generic client:
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
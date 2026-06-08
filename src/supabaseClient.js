import { createClient } from '@supabase/supabase-js'

// جلب مفاتيح البيئة الخاصة بـ Supabase من ملف الـ .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
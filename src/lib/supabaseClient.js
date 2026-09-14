import { createClient } from '@supabase/supabase-js'
const url='https://tnraadzmmeqdbcpzyjwf.supabase.co'
const key=import.meta.env.VITE_SUPABASE_ANON_KEY||''
export const supabase= key?createClient(url,key):null

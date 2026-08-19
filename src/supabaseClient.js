import {createClient} from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if(!supabaseUrl || !supabaseAnonKey){
    console.error('Variaveis do Supabase não foram encontradas. Olhe o arquivo .env (SUPABASE_URL e SUPABASE_ANON_KEY)')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
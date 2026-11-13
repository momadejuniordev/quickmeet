import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://qtultcenocskjneyacst.supabase.co';

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_Rpo-w_K0TVSZ1_0WS8MBWQ_wApmZ6an';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

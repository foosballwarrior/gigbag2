import { createClient } from '@supabase/supabase-js';
import { validateSupabaseConfig } from './utils/validation';
import { getEnvVar } from './utils/env';
import type { Database } from '@/types/supabase';

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

validateSupabaseConfig(supabaseUrl, supabaseAnonKey);

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../database/types/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('🔍 SUPABASE ENV CHECK:', {
  url: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'MISSING',
  hasKey: !!supabaseAnonKey,
  keyLength: supabaseAnonKey?.length || 0,
  mode: import.meta.env.MODE,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ FATAL: Supabase credentials missing!');
  console.error('Available env keys:', Object.keys(import.meta.env));
  throw new Error('Supabase credentials are required. Check your .env file or Vercel environment variables.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    storageKey: 'kidcoderclub-auth',
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'apikey': supabaseAnonKey,
    },
  },
});

console.log('✅ Supabase client initialized');

// Test connection on load
supabase
  .from('users')
  .select('count', { count: 'exact', head: true })
  .then(({ error, status }) => {
    if (error) {
      console.error('❌ Supabase connection test FAILED:', {
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        status
      });
      console.error('💡 Common fixes:');
      console.error('   1. Check if RLS is disabled: Run database/schema/02_dev_disable_rls.sql');
      console.error('   2. Check Vercel env vars: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
      console.error('   3. Check Supabase project is active and not paused');
    } else {
      console.log('✅ Supabase connected successfully!');
    }
  });

// Re-export types dari database untuk backward compatibility
export type { Database, User, Student, Mentor, UserInsert, StudentInsert, MentorInsert } from '../../database/types/database.types';

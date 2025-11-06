import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../database/types/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('🔍 ENV CHECK:', {
  url: import.meta.env.VITE_SUPABASE_URL,
  key: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'EXISTS' : 'MISSING',
  allEnvKeys: Object.keys(import.meta.env)
});

console.log('Supabase Config:', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey,
  keyLength: supabaseAnonKey?.length
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase environment variables are not set. Using localStorage as fallback.');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
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
    })
  : null;

console.log('Supabase client created:', !!supabase);

// Test connection on load
if (supabase) {
  supabase
    .from('users')
    .select('count', { count: 'exact', head: true })
    .then(({ error }) => {
      if (error) {
        console.error('❌ Supabase connection test failed:', error);
      } else {
        console.log('✅ Supabase connected successfully!');
      }
    });
}

// Re-export types dari database untuk backward compatibility
export type { Database, User, Student, Mentor, UserInsert, StudentInsert, MentorInsert } from '../../database/types/database.types';

// Test Supabase Connection
import { supabase } from './lib/supabase';

export const testSupabaseConnection = async () => {
  console.log('=== SUPABASE CONNECTION TEST ===');
  console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
  console.log('Supabase Client:', supabase ? 'Created' : 'NULL');
  
  if (!supabase) {
    console.error('❌ Supabase client is NULL - env variables not loaded');
    return false;
  }
  
  try {
    // Test connection dengan query sederhana
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Supabase query error:', error);
      return false;
    }
    
    console.log('✅ Supabase connection successful!');
    console.log('Query result:', data);
    return true;
  } catch (err) {
    console.error('❌ Supabase connection failed:', err);
    return false;
  }
};

// Auto-run test saat dev mode
if (import.meta.env.DEV) {
  testSupabaseConnection();
}

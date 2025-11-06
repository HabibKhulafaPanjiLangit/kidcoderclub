import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase Config:', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey,
  keyLength: supabaseAnonKey?.length
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set. Using localStorage as fallback.');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey, {
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
        console.error('Supabase connection test failed:', error);
      } else {
        console.log('✅ Supabase connected successfully!');
      }
    });
}

// Database Types
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'student' | 'mentor';
          status: 'pending' | 'approved' | 'rejected';
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          role: 'student' | 'mentor';
          status?: 'pending' | 'approved' | 'rejected';
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: 'student' | 'mentor';
          status?: 'pending' | 'approved' | 'rejected';
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      students: {
        Row: {
          id: string;
          user_id: string;
          parent_name: string;
          parent_email: string;
          phone: string;
          child_name: string;
          child_age: number;
          class_name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          parent_name: string;
          parent_email: string;
          phone: string;
          child_name: string;
          child_age: number;
          class_name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          parent_name?: string;
          parent_email?: string;
          phone?: string;
          child_name?: string;
          child_age?: number;
          class_name?: string;
          created_at?: string;
        };
      };
      mentors: {
        Row: {
          id: string;
          user_id: string;
          mentor_name: string;
          mentor_email: string;
          mentor_phone: string;
          expertise: string;
          experience: string;
          certificates: string[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          mentor_name: string;
          mentor_email: string;
          mentor_phone: string;
          expertise: string;
          experience: string;
          certificates?: string[] | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          mentor_name?: string;
          mentor_email?: string;
          mentor_phone?: string;
          expertise?: string;
          experience?: string;
          certificates?: string[] | null;
          created_at?: string;
        };
      };
    };
  };
};

export type User = Database['public']['Tables']['users']['Row'];
export type Student = Database['public']['Tables']['students']['Row'];
export type Mentor = Database['public']['Tables']['mentors']['Row'];

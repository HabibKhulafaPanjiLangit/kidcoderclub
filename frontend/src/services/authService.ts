import { supabase } from '../lib/supabase';

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'student' | 'mentor';
  phone?: string;
  // Student fields
  parentName?: string;
  parentEmail?: string;
  childName?: string;
  childAge?: number;
  className?: string;
  // Mentor fields
  mentorName?: string;
  mentorEmail?: string;
  mentorPhone?: string;
  expertise?: string;
  experience?: string;
  certificates?: File[];
}

interface LoginData {
  emailOrId: string;
  password: string;
  role: 'student' | 'mentor';
}

export class AuthService {
  /**
   * Register new user dengan Supabase
   */
  static async register(data: RegisterData) {
    try {
      // Jika Supabase tidak dikonfigurasi, gunakan localStorage
      if (!supabase) {
        console.log('Supabase not configured, using localStorage');
        return this.registerWithLocalStorage(data);
      }

      console.log('Attempting Supabase registration...');
      
      // Generate UUID untuk user
      const userId = crypto.randomUUID();
      console.log('Generated user ID:', userId);

      // 1. Insert user data ke table users dengan status pending
      console.log('Inserting user to database...');
      
      const insertPromise = supabase
        .from('users')
        .insert({
          id: userId,
          email: data.email,
          name: data.name,
          role: data.role,
          status: 'pending',
          phone: data.phone || null,
        })
        .select()
        .single();

      const { data: insertedUser, error: userError } = await insertPromise;

      if (userError) {
        console.error('Supabase error details:', {
          message: userError.message,
          details: userError.details,
          hint: userError.hint,
          code: userError.code
        });
        throw new Error(`Supabase error: ${userError.message}`);
      }
      
      console.log('✅ User record created successfully:', insertedUser);

      // 2. Insert data spesifik berdasarkan role
      if (data.role === 'student') {
        const { error: studentError } = await supabase
          .from('students')
          .insert({
            user_id: userId,
            parent_name: data.parentName!,
            parent_email: data.parentEmail!,
            phone: data.phone!,
            child_name: data.childName!,
            child_age: Number(data.childAge!),
            class_name: data.className!,
          });

        if (studentError) {
          console.error('Student insert error:', studentError);
          throw studentError;
        }
        console.log('Student record created successfully');
      } else if (data.role === 'mentor') {
        // For now, skip certificate upload (can add later)
        const { error: mentorError } = await supabase
          .from('mentors')
          .insert({
            user_id: userId,
            mentor_name: data.mentorName!,
            mentor_email: data.mentorEmail!,
            mentor_phone: data.mentorPhone!,
            expertise: data.expertise!,
            experience: data.experience!,
            certificates: null, // TODO: Add certificate upload
          });

        if (mentorError) {
          console.error('Mentor insert error:', mentorError);
          throw mentorError;
        }
        console.log('Mentor record created successfully');
      }

      console.log('Registration completed successfully!');
      return {
        success: true,
        userId: userId,
        message: 'Pendaftaran berhasil! Akun Anda akan ditinjau oleh admin.',
      };
    } catch (error: any) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.message || 'Terjadi kesalahan saat pendaftaran',
      };
    }
  }

  /**
   * Login user dengan Supabase
   */
  static async login(data: LoginData) {
    try {
      // Jika Supabase tidak dikonfigurasi, gunakan localStorage
      if (!supabase) {
        return this.loginWithLocalStorage(data);
      }

      // 1. Login dengan Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.emailOrId,
        password: data.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Login failed');

      // 2. Get user data dari table users
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .eq('role', data.role)
        .single();

      if (userError) throw userError;
      if (!userData) throw new Error('User not found');

      // 3. Check status approval
      if (userData.status !== 'approved') {
        // Logout jika belum approved
        await supabase.auth.signOut();
        
        const messages = {
          pending: 'Akun Anda masih menunggu persetujuan admin.',
          rejected: 'Akun Anda telah ditolak oleh admin.',
        };
        
        throw new Error(messages[userData.status as keyof typeof messages] || 'Akun tidak aktif');
      }

      // 4. Get additional data based on role
      let additionalData = null;
      if (data.role === 'student') {
        const { data: studentData } = await supabase
          .from('students')
          .select('*')
          .eq('user_id', authData.user.id)
          .single();
        additionalData = studentData;
      } else if (data.role === 'mentor') {
        const { data: mentorData } = await supabase
          .from('mentors')
          .select('*')
          .eq('user_id', authData.user.id)
          .single();
        additionalData = mentorData;
      }

      return {
        success: true,
        user: {
          ...userData,
          ...additionalData,
        },
        session: authData.session,
      };
    } catch (error: any) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.message || 'Email/ID atau password salah',
      };
    }
  }

  /**
   * Logout user
   */
  static async logout() {
    try {
      if (!supabase) {
        localStorage.removeItem('kidcoderclub_current_user');
        return { success: true };
      }

      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      return { success: true };
    } catch (error: any) {
      console.error('Logout error:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Get current user
   */
  static async getCurrentUser() {
    try {
      if (!supabase) {
        const user = localStorage.getItem('kidcoderclub_current_user');
        return user ? JSON.parse(user) : null;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      return userData;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  /**
   * Upload certificates ke Supabase Storage
   */
  private static async uploadCertificates(userId: string, certificates: File[]): Promise<string[]> {
    if (!supabase) return [];

    const urls: string[] = [];

    for (const file of certificates) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage
        .from('certificates')
        .upload(fileName, file);

      if (error) {
        console.error('Upload error:', error);
        continue;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('certificates')
        .getPublicUrl(fileName);

      urls.push(publicUrl);
    }

    return urls;
  }

  /**
   * Fallback: Register with localStorage
   */
  private static async registerWithLocalStorage(data: RegisterData) {
    const registeredUsers = JSON.parse(localStorage.getItem('kidcoderclub_registered_users') || '[]');

    const userId = `USER-${Date.now()}`;
    const newUser = {
      ...data,
      id: userId,
      status: 'pending' as const,
      registeredAt: new Date().toISOString(),
    };

    registeredUsers.push(newUser);
    localStorage.setItem('kidcoderclub_registered_users', JSON.stringify(registeredUsers));
    localStorage.setItem('last_registration_id', userId);

    return {
      success: true,
      userId: userId,
      message: 'Pendaftaran berhasil! Akun Anda akan ditinjau oleh admin.',
    };
  }

  /**
   * Fallback: Login with localStorage
   */
  private static async loginWithLocalStorage(data: LoginData) {
    const storedUsers = JSON.parse(localStorage.getItem('kidcoderclub_registered_users') || '[]');

    const user = storedUsers.find((u: any) =>
      (u.email === data.emailOrId || u.id === data.emailOrId) &&
      u.password === data.password &&
      u.role === data.role
    );

    if (!user) {
      throw new Error('Email/ID atau Password salah');
    }

    if (user.status !== 'approved') {
      const messages = {
        pending: 'Akun Anda masih menunggu persetujuan admin.',
        rejected: 'Akun Anda telah ditolak oleh admin.',
      };
      throw new Error(messages[user.status as keyof typeof messages] || 'Akun tidak aktif');
    }

    localStorage.setItem('kidcoderclub_current_user', JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }));

    return {
      success: true,
      user: user,
    };
  }
}

export default AuthService;

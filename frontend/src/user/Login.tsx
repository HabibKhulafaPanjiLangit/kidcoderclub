import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, AlertCircle, CheckCircle } from 'lucide-react';
import AuthService from '../services/authService';

type UserRole = 'student' | 'mentor';

interface LoginFormData {
  emailOrId: string;
  password: string;
  role: UserRole;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    emailOrId: '',
    password: '',
    role: 'student'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error saat user mengetik
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validasi input
      if (!formData.emailOrId || !formData.password) {
        setError('Email/ID dan Password wajib diisi');
        setIsLoading(false);
        return;
      }

      // Login menggunakan AuthService (Supabase atau localStorage)
      const result = await AuthService.login({
        emailOrId: formData.emailOrId,
        password: formData.password,
        role: formData.role,
      });

      if (!result.success) {
        setError((result as any).error || 'Email/ID atau Password salah');
        setIsLoading(false);
        return;
      }

      // Login berhasil
      setSuccess(true);
      
      // Simpan user session
      localStorage.setItem('kidcoderclub_current_user', JSON.stringify({
        id: (result as any).user.id,
        email: (result as any).user.email,
        name: (result as any).user.name,
        role: (result as any).user.role
      }));

      // Redirect berdasarkan role
      setTimeout(() => {
        if (formData.role === 'student') {
          window.location.href = '/dashboard/student';
        } else {
          window.location.href = '/dashboard/mentor';
        }
      }, 1500);

    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-green-100 border border-green-300 rounded-xl shadow">
        <div className="flex items-center space-x-2 mb-2 text-green-700">
          <CheckCircle className="w-6 h-6" />
          <h2 className="text-lg font-bold">Login Berhasil!</h2>
        </div>
        <p className="text-green-700">
          Selamat datang! Anda akan dialihkan ke dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Role Selection */}
      <div className="mb-6">
        <label className="block font-semibold mb-3 text-center">Login Sebagai</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, role: 'student' }))}
            className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center space-y-2 ${
              formData.role === 'student'
                ? 'border-blue-600 bg-blue-50 text-blue-600'
                : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <User className="w-8 h-8" />
            <span className="font-semibold">Murid</span>
          </button>
          
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, role: 'mentor' }))}
            className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center space-y-2 ${
              formData.role === 'mentor'
                ? 'border-green-600 bg-green-50 text-green-600'
                : 'border-gray-300 hover:border-green-400'
            }`}
          >
            <User className="w-8 h-8" />
            <span className="font-semibold">Mentor</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email/ID Field */}
        <div>
          <label className="block font-semibold mb-1">
            Email atau ID <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center border rounded-lg px-3 focus-within:border-blue-500 transition-colors">
            <Mail className="w-5 h-5 mr-2 text-gray-400" />
            <input
              type="text"
              name="emailOrId"
              value={formData.emailOrId}
              onChange={handleChange}
              placeholder="Masukkan email atau ID Anda"
              className="w-full py-2 outline-none"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label className="block font-semibold mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center border rounded-lg px-3 focus-within:border-blue-500 transition-colors">
            <Lock className="w-5 h-5 mr-2 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan password Anda"
              className="w-full py-2 outline-none"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Info Text */}
        <div className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="font-semibold text-blue-800 mb-1">📌 Catatan:</p>
          <p>Anda hanya bisa login setelah akun Anda disetujui oleh admin.</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              <span>Memproses...</span>
            </>
          ) : (
            <span>Login</span>
          )}
        </button>

        {/* Link to Registration */}
        <div className="text-center text-sm text-gray-600 mt-4">
          Belum punya akun?{' '}
          <a href="#registration" className="text-blue-600 font-semibold hover:underline">
            Daftar di sini
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;

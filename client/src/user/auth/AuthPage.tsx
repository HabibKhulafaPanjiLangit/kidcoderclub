import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AuthFormProps {
  role: 'admin' | 'student' | 'mentor';
  onBack: () => void;
}

type FormMode = 'login' | 'register' | 'forgot-password';

const AuthForm: React.FC<AuthFormProps> = ({ role, onBack }) => {
  const { login, register, resetPassword, isLoading } = useAuth();
  const [mode, setMode] = useState<FormMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const roleConfig = {
    admin: {
      title: 'Admin',
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-600'
    },
    student: {
      title: 'Murid',
      color: 'from-pink-400 to-pink-500',
      textColor: 'text-pink-500'
    },
    mentor: {
      title: 'Mentor',
      color: 'from-blue-400 to-blue-500',
      textColor: 'text-blue-500'
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (mode === 'login') {
      const success = await login({
        email: formData.email,
        password: formData.password,
        role
      });
      
      if (!success) {
        setError('Email atau password salah. Silakan coba lagi.');
      }
    } else if (mode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        setError('Password tidak cocok!');
        return;
      }
      
      if (formData.password.length < 6) {
        setError('Password minimal 6 karakter!');
        return;
      }
      
      const success = await register({
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        name: formData.name,
        role
      });
      
      if (!success) {
        setError('Email sudah terdaftar atau terjadi kesalahan.');
      }
    } else if (mode === 'forgot-password') {
      const success = await resetPassword(formData.email);
      
      if (success) {
        setSuccess('Link reset password telah dikirim ke email Anda!');
      } else {
        setError('Email tidak ditemukan.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
    setError('');
    setSuccess('');
  };

  const switchMode = (newMode: FormMode) => {
    setMode(newMode);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md relative">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${roleConfig[role].color} mb-4`}>
            <span className="text-2xl font-bold text-white">
              {role === 'admin' ? '👑' : role === 'student' ? '🎓' : '👨‍🏫'}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {mode === 'login' && `Masuk sebagai ${roleConfig[role].title}`}
            {mode === 'register' && `Daftar sebagai ${roleConfig[role].title}`}
            {mode === 'forgot-password' && 'Reset Password'}
          </h2>
          <p className="text-gray-600">
            {mode === 'login' && 'Masukkan email dan password Anda'}
            {mode === 'register' && 'Buat akun baru untuk mulai belajar'}
            {mode === 'forgot-password' && 'Masukkan email untuk reset password'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field (Register only) */}
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder="contoh@email.com"
                required
              />
            </div>
          </div>

          {/* Password Field (not for forgot password) */}
          {mode !== 'forgot-password' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder="Masukkan password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          {/* Confirm Password Field (Register only) */}
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konfirmasi Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder="Ulangi password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-3">
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r ${roleConfig[role].color} text-white py-3 px-4 rounded-xl font-semibold hover:opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {mode === 'login' && 'Masuk...'}
                {mode === 'register' && 'Mendaftar...'}
                {mode === 'forgot-password' && 'Mengirim...'}
              </>
            ) : (
              <>
                {mode === 'login' && 'Masuk'}
                {mode === 'register' && 'Daftar'}
                {mode === 'forgot-password' && 'Kirim Link Reset'}
              </>
            )}
          </button>
        </form>

        {/* Mode Switcher */}
        <div className="mt-6 text-center space-y-2">
          {mode === 'login' && (
            <>
              <button
                onClick={() => switchMode('forgot-password')}
                className={`${roleConfig[role].textColor} hover:underline text-sm`}
              >
                Lupa password?
              </button>
              <div className="text-gray-600 text-sm">
                Belum punya akun?{' '}
                <button
                  onClick={() => switchMode('register')}
                  className={`${roleConfig[role].textColor} hover:underline font-medium`}
                >
                  Daftar di sini
                </button>
              </div>
            </>
          )}
          
          {mode === 'register' && (
            <div className="text-gray-600 text-sm">
              Sudah punya akun?{' '}
              <button
                onClick={() => switchMode('login')}
                className={`${roleConfig[role].textColor} hover:underline font-medium`}
              >
                Masuk di sini
              </button>
            </div>
          )}
          
          {mode === 'forgot-password' && (
            <div className="text-gray-600 text-sm">
              Ingat password?{' '}
              <button
                onClick={() => switchMode('login')}
                className={`${roleConfig[role].textColor} hover:underline font-medium`}
              >
                Kembali ke login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
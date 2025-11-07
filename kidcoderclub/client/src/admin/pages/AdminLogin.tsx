import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import AuthService from '../../services/authService';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (!email || !password) {
        setError('Email dan Password wajib diisi');
        setIsLoading(false);
        return;
      }
      const result = await AuthService.login({
        emailOrId: email,
        password,
        role: 'admin',
      });
      if (!result.success && 'error' in result) {
        setError(result.error || 'Email atau Password salah');
        setIsLoading(false);
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
    } catch (error: any) {
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
          <h2 className="text-lg font-bold">Login Admin Berhasil!</h2>
        </div>
        <p className="text-green-700">Selamat datang! Anda akan dialihkan ke dashboard admin...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
      <div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-4">Masuk sebagai Admin</h2>
        <p className="text-center text-base text-purple-700 mb-6 font-semibold">Hanya admin yang dapat login di halaman ini. Akun dibuat oleh pengelola sistem.</p>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold">Email</label>
            <div className="relative">
              <input
                type="email"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email admin"
                required
              />
              <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block mb-2 font-semibold">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full p-3 pl-10 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password admin"
                required
              />
              <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
              </span>
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-600 shadow-lg transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, CheckCircle, AlertCircle } from 'lucide-react';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!password || !confirmPassword) {
      setError('Password dan konfirmasi wajib diisi');
      return;
    }
    if (password !== confirmPassword) {
      setError('Password dan konfirmasi tidak sama');
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setError(error.message);
        setIsLoading(false);
        return;
      }
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-green-100 border border-green-300 rounded-xl shadow">
        <div className="flex items-center space-x-2 mb-2 text-green-700">
          <CheckCircle className="w-6 h-6" />
          <h2 className="text-lg font-bold">Password Berhasil Diubah!</h2>
        </div>
        <p className="text-green-700">Silakan login dengan password baru Anda.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold">Password Baru</label>
          <div className="relative">
            <input
              type="password"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password baru"
              required
            />
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div>
          <label className="block mb-2 font-semibold">Konfirmasi Password</label>
          <div className="relative">
            <input
              type="password"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Konfirmasi password"
              required
            />
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? 'Memproses...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;

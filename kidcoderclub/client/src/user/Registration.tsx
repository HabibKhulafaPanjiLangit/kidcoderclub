
import React from 'react';
import { AlertCircle } from 'lucide-react';

  const Registration: React.FC = () => {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-xl shadow text-center">
        <h2 className="text-2xl font-bold text-center mb-6 text-red-600">Pendaftaran Dinonaktifkan</h2>
        <div className="p-6 bg-red-50 border-l-4 border-red-500 rounded-lg shadow-sm">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <h3 className="font-semibold text-red-800 mb-2">Hanya admin yang dapat login ke platform ini.</h3>
          <p className="text-red-700 text-sm mb-2">Pendaftaran user baru tidak tersedia.<br />Silakan hubungi admin jika Anda membutuhkan akses.</p>
          <p className="text-xs text-gray-500">Akses login hanya untuk akun admin yang dibuat khusus oleh pengelola melalui Supabase.</p>
        </div>
      </div>
    );
  };

export default Registration;

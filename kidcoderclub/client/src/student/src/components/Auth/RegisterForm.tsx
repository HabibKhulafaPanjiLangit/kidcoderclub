
import { AlertCircle } from 'lucide-react';

export default function RegisterForm() {
  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg text-center">
      <div className="flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-red-600 mr-2" />
        <h2 className="text-3xl font-bold text-gray-800">Pendaftaran Admin Dinonaktifkan</h2>
      </div>
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
        Pendaftaran akun admin baru tidak tersedia.<br />Silakan hubungi pengelola jika Anda membutuhkan akses admin.<br />Login hanya untuk admin yang sudah terdaftar di Supabase.
      </div>
    </div>
  );
}

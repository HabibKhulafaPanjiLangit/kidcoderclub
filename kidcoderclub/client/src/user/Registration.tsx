import React, { useState } from 'react';
import {
  Send,
  User,
  Mail,
  BookOpen,
  Phone,
  CheckCircle,
  AlertCircle,
  Users,
  GraduationCap,
  Upload,
  X,
  FileCheck,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import AuthService from '../services/authService';

type RegistrationType = 'student' | 'mentor';

type FormDataType = {
  registrationType: RegistrationType;
  parentName: string;
  parentEmail: string;
  phone: string;
  childName: string;
  childAge: number | string;
  className: string;
  // Fields untuk mentor
  mentorName?: string;
  mentorEmail?: string;
  mentorPhone?: string;
  expertise?: string;
  experience?: string;
  certificates?: File[];
  // Login credentials
  password?: string;
  confirmPassword?: string;
};

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    registrationType: 'student',
    parentName: '',
    parentEmail: '',
    phone: '',
    childName: '',
    childAge: '',
    className: '',
    mentorName: '',
    mentorEmail: '',
    mentorPhone: '',
    expertise: '',
    experience: '',
    certificates: [],
    password: '',
    confirmPassword: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'childAge' ? Number(value) : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      // Validasi tipe file (hanya gambar dan PDF)
      const validFiles = fileArray.filter(file => {
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
        return validTypes.includes(file.type);
      });
      
      if (validFiles.length !== fileArray.length) {
        setErrors(prev => ({
          ...prev,
          certificates: 'Hanya file gambar (JPG, PNG) atau PDF yang diperbolehkan'
        }));
        return;
      }

      // Validasi ukuran file (max 5MB per file)
      const maxSize = 5 * 1024 * 1024; // 5MB
      const oversizedFiles = validFiles.filter(file => file.size > maxSize);
      if (oversizedFiles.length > 0) {
        setErrors(prev => ({
          ...prev,
          certificates: 'Ukuran file maksimal 5MB per file'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        certificates: [...(prev.certificates || []), ...validFiles]
      }));
      
      // Clear error jika ada
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.certificates;
        return newErrors;
      });
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      certificates: prev.certificates?.filter((_, i) => i !== index) || []
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (formData.registrationType === 'student') {
      if (!formData.parentName) newErrors.parentName = 'Nama orang tua wajib diisi';
      if (!formData.parentEmail) newErrors.parentEmail = 'Email wajib diisi';
      if (!formData.phone) newErrors.phone = 'Nomor HP wajib diisi';
      if (!formData.childName) newErrors.childName = 'Nama anak wajib diisi';
      if (
        !formData.childAge ||
        Number(formData.childAge) < 5 ||
        Number(formData.childAge) > 13
      ) {
        newErrors.childAge = 'Usia anak harus antara 5 - 13 tahun';
      }
      if (!formData.className) newErrors.className = 'Kelas yang diikuti wajib diisi';
    } else if (formData.registrationType === 'mentor') {
      if (!formData.mentorName) newErrors.mentorName = 'Nama mentor wajib diisi';
      if (!formData.mentorEmail) newErrors.mentorEmail = 'Email wajib diisi';
      if (!formData.mentorPhone) newErrors.mentorPhone = 'Nomor HP wajib diisi';
      if (!formData.expertise) newErrors.expertise = 'Keahlian wajib diisi';
      if (!formData.experience) newErrors.experience = 'Pengalaman wajib diisi';
      if (!formData.certificates || formData.certificates.length === 0) {
        newErrors.certificates = 'Minimal 1 sertifikat keahlian wajib diupload';
      }
    }
    
    // Validasi password untuk semua user
    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password wajib diisi';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      console.log('Starting registration...');
      
      // Gunakan AuthService untuk registrasi (Supabase atau localStorage)
      const result = await AuthService.register({
        email: formData.registrationType === 'student' ? formData.parentEmail : formData.mentorEmail!,
        password: formData.password!,
        name: formData.registrationType === 'student' ? formData.childName : formData.mentorName!,
        role: formData.registrationType,
        phone: formData.registrationType === 'student' ? formData.phone : formData.mentorPhone,
        // Student fields
        parentName: formData.parentName,
        parentEmail: formData.parentEmail,
        childName: formData.childName,
        childAge: Number(formData.childAge),
        className: formData.className,
        // Mentor fields
        mentorName: formData.mentorName,
        mentorEmail: formData.mentorEmail,
        mentorPhone: formData.mentorPhone,
        expertise: formData.expertise,
        experience: formData.experience,
        certificates: formData.certificates,
      });

      console.log('Registration result:', result);

      if (!result.success) {
        const errorMsg = (result as any).error || 'Gagal mendaftar. Silakan coba lagi.';
        console.error('Registration failed:', errorMsg);
        setErrors({ general: errorMsg });
        return;
      }

      // Simpan ID registrasi
      const userId = (result as any).userId;
      if (userId) {
        localStorage.setItem('last_registration_id', userId);
      }
      
      console.log('Registration successful!');
      setSubmitted(true);
    } catch (error: any) {
      console.error('Registration exception:', error);
      const errorMsg = error?.message || error?.toString() || 'Gagal mendaftar. Silakan coba lagi.';
      setErrors({ general: `Error: ${errorMsg}` });
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-green-100 border border-green-300 rounded-xl shadow">
        <div className="flex items-center space-x-2 mb-4 text-green-700">
          <CheckCircle className="w-6 h-6" />
          <h2 className="text-lg font-bold">Pendaftaran Berhasil!</h2>
        </div>
        <div className="space-y-3 text-green-800">
          <p>
            {formData.registrationType === 'student' 
              ? 'Terima kasih telah mendaftarkan anak Anda.'
              : 'Terima kasih telah mendaftar sebagai mentor.'
            }
          </p>
          <div className="bg-white border border-green-300 rounded-lg p-4">
            <p className="font-semibold mb-2">📌 Langkah Selanjutnya:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Akun Anda akan ditinjau oleh admin</li>
              <li>Anda akan menerima notifikasi saat akun disetujui</li>
              <li>Setelah disetujui, Anda dapat login menggunakan email dan password yang telah dibuat</li>
            </ol>
          </div>
          <p className="text-sm">
            ID Pendaftaran Anda: <span className="font-mono font-bold">{localStorage.getItem('last_registration_id')}</span>
          </p>
          <div className="mt-4">
            <a 
              href="#login" 
              className="text-blue-600 hover:underline font-semibold"
            >
              Kembali ke halaman utama
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-center mb-6">Formulir Pendaftaran</h2>

      {errors.general && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg shadow-sm animate-shake">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-800 mb-1">
                {errors.general.includes('Email sudah terdaftar') || errors.general.includes('duplicate') 
                  ? '⚠️ Email Sudah Terdaftar' 
                  : '❌ Pendaftaran Gagal'}
              </h3>
              <p className="text-red-700 text-sm leading-relaxed">{errors.general}</p>
              {(errors.general.includes('Email sudah terdaftar') || errors.general.includes('duplicate')) && (
                <div className="mt-3 pt-3 border-t border-red-200">
                  <p className="text-red-600 text-xs font-medium">💡 Saran:</p>
                  <ul className="text-red-600 text-xs mt-1 space-y-1 ml-4 list-disc">
                    <li>Gunakan email lain yang belum terdaftar</li>
                    <li>Atau <a href="/login" className="underline font-semibold hover:text-red-800">login di sini</a> jika Anda sudah memiliki akun</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Pilihan Tipe Pendaftaran */}
      <div className="mb-6">
        <label className="block font-semibold mb-3 text-center">Daftar Sebagai</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, registrationType: 'student' }))}
            className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center space-y-2 ${
              formData.registrationType === 'student'
                ? 'border-blue-600 bg-blue-50 text-blue-600'
                : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <Users className="w-8 h-8" />
            <span className="font-semibold">Murid</span>
          </button>
          
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, registrationType: 'mentor' }))}
            className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center space-y-2 ${
              formData.registrationType === 'mentor'
                ? 'border-green-600 bg-green-50 text-green-600'
                : 'border-gray-300 hover:border-green-400'
            }`}
          >
            <GraduationCap className="w-8 h-8" />
            <span className="font-semibold">Mentor</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {formData.registrationType === 'student' ? (
          // Form untuk Murid
          [{
            label: 'Nama Orang Tua',
            name: 'parentName',
            icon: <User className="w-5 h-5 mr-2 text-gray-400" />,
            type: 'text'
          }, {
            label: 'Email',
            name: 'parentEmail',
            icon: <Mail className="w-5 h-5 mr-2 text-gray-400" />,
            type: 'email'
          }, {
            label: 'No. HP',
            name: 'phone',
            icon: <Phone className="w-5 h-5 mr-2 text-gray-400" />,
            type: 'text'
          }, {
            label: 'Nama Anak',
            name: 'childName',
            icon: <User className="w-5 h-5 mr-2 text-gray-400" />,
            type: 'text'
          }, {
            label: 'Usia Anak',
            name: 'childAge',
            icon: <BookOpen className="w-5 h-5 mr-2 text-gray-400" />,
            type: 'number'
          }, {
            label: 'Kelas yang Diikuti',
            name: 'className',
            icon: <BookOpen className="w-5 h-5 mr-2 text-gray-400" />,
            type: 'text'
          }].map((field) => (
            <div key={field.name}>
              <label className="block font-semibold mb-1">
                {field.label} <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border rounded-lg px-3">
                {field.icon}
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name as keyof FormDataType] as string}
                  onChange={handleChange}
                  className="w-full py-2 outline-none"
                  required
                  {...(field.name === 'childAge' ? { min: 5, max: 13 } : {})}
                />
              </div>
              {errors[field.name] && (
                <p className="text-red-500 text-sm">{errors[field.name]}</p>
              )}
            </div>
          ))
        ) : (
          // Form untuk Mentor
          [{
            label: 'Nama Lengkap',
            name: 'mentorName',
            icon: <User className="w-5 h-5 mr-2 text-gray-400" />,
            type: 'text'
          }, {
            label: 'Email',
            name: 'mentorEmail',
            icon: <Mail className="w-5 h-5 mr-2 text-gray-400" />,
            type: 'email'
          }, {
            label: 'No. HP',
            name: 'mentorPhone',
            icon: <Phone className="w-5 h-5 mr-2 text-gray-400" />,
            type: 'text'
          }, {
            label: 'Keahlian/Bidang',
            name: 'expertise',
            icon: <BookOpen className="w-5 h-5 mr-2 text-gray-400" />,
            type: 'text',
            placeholder: 'Contoh: Python, Scratch, Web Development'
          }, {
            label: 'Pengalaman Mengajar',
            name: 'experience',
            icon: <GraduationCap className="w-5 h-5 mr-2 text-gray-400" />,
            type: 'text',
            placeholder: 'Contoh: 2 tahun mengajar coding untuk anak'
          }].map((field) => (
            <div key={field.name}>
              <label className="block font-semibold mb-1">
                {field.label} <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border rounded-lg px-3">
                {field.icon}
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name as keyof FormDataType] as string || ''}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full py-2 outline-none"
                  required
                />
              </div>
              {errors[field.name] && (
                <p className="text-red-500 text-sm">{errors[field.name]}</p>
              )}
            </div>
          ))
        )}

        {/* Upload Sertifikat - Hanya untuk Mentor */}
        {formData.registrationType === 'mentor' && (
          <div>
            <label className="block font-semibold mb-1">
              Sertifikat Keahlian <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-600 mb-2">
              Upload minimal 1 sertifikat (JPG, PNG, atau PDF, max 5MB per file)
            </p>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-all">
              <label className="flex flex-col items-center cursor-pointer">
                <Upload className="w-10 h-10 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600 mb-2">
                  Klik untuk upload sertifikat
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,application/pdf"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Daftar file yang sudah diupload */}
            {formData.certificates && formData.certificates.length > 0 && (
              <div className="mt-3 space-y-2">
                {formData.certificates.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3"
                  >
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <FileCheck className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700 truncate">
                        {file.name}
                      </span>
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        ({(file.size / 1024).toFixed(0)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="ml-2 p-1 hover:bg-red-100 rounded-full transition-colors flex-shrink-0"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {errors.certificates && (
              <p className="text-red-500 text-sm mt-1">{errors.certificates}</p>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-300 my-6"></div>
        
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-4">
          <p className="text-sm text-yellow-800 font-semibold mb-2">
            🔐 Buat Kredensial Login
          </p>
          <p className="text-xs text-yellow-700">
            Password akan digunakan untuk login setelah akun Anda disetujui oleh admin.
          </p>
        </div>

        {/* Password Field */}
        <div>
          <label className="block font-semibold mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center border rounded-lg px-3">
            <Lock className="w-5 h-5 mr-2 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password || ''}
              onChange={handleChange}
              placeholder="Minimal 6 karakter"
              className="w-full py-2 outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="block font-semibold mb-1">
            Konfirmasi Password <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center border rounded-lg px-3">
            <Lock className="w-5 h-5 mr-2 text-gray-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword || ''}
              onChange={handleChange}
              placeholder="Ulangi password"
              className="w-full py-2 outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
        >
          <Send className="inline-block w-5 h-5 mr-2" />
          Daftar
        </button>
      </form>
    </div>
  );
};

export default Registration;

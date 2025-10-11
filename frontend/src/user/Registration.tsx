import React, { useState } from 'react';
import {
  Send,
  User,
  Mail,
  BookOpen,
  Phone,
  CheckCircle,
  AlertCircle,
  LogIn
} from 'lucide-react';
import {
  registerStudent,
  trackEvent,
  signInWithGoogle
} from '../services/firebaseService';
import { useSound } from '../hooks/useSound';

type FormDataType = {
  parentName: string;
  parentEmail: string;
  phone: string;
  childName: string;
  childAge: number | string;
  className: string;
};

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    parentName: '',
    parentEmail: '',
    phone: '',
    childName: '',
    childAge: '',
    className: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { playSuccessSound, playErrorSound } = useSound();

  const handleGoogleLogin = async () => {
  const result = await signInWithGoogle();

  if (result.success && result.user) {
    setFormData((prev) => ({
      ...prev,
      parentName: result.user.name ?? '',
      parentEmail: result.user.email ?? ''
    }));
    playSuccessSound();
  } else {
    setErrors({ general: result.error ?? 'Gagal login dengan Google.' });
    playErrorSound();
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'childAge' ? Number(value) : value
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
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
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      playErrorSound();
      return;
    }

    try {
      await registerStudent(formData);
      setSubmitted(true);
      playSuccessSound();
      trackEvent('registration_success', formData);
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: 'Gagal mendaftar. Silakan coba lagi.' });
      playErrorSound();
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-green-100 border border-green-300 rounded-xl shadow">
        <div className="flex items-center space-x-2 mb-2 text-green-700">
          <CheckCircle />
          <h2 className="text-lg font-bold">Pendaftaran Berhasil!</h2>
        </div>
        <p>Terima kasih telah mendaftar. Kami akan segera menghubungi Anda.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-center mb-6">Formulir Pendaftaran</h2>

      {errors.general && (
        <div className="mb-4 text-red-600 flex items-center gap-2">
          <AlertCircle />
          <span>{errors.general}</span>
        </div>
      )}

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full bg-white text-gray-800 border border-gray-300 py-3 rounded-xl font-semibold hover:shadow-md transition-all duration-300 flex items-center justify-center space-x-3 mb-6"
      >
        <LogIn className="w-5 h-5 text-blue-500" />
        <span>Login dengan Google</span>
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[{
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
            <label className="block font-semibold mb-1">{field.label}</label>
            <div className="flex items-center border rounded-lg px-3">
              {field.icon}
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name as keyof FormDataType] as string}
                onChange={handleChange}
                className="w-full py-2 outline-none"
                {...(field.name === 'childAge' ? { min: 5, max: 13 } : {})}
              />
            </div>
            {errors[field.name] && (
              <p className="text-red-500 text-sm">{errors[field.name]}</p>
            )}
          </div>
        ))}

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

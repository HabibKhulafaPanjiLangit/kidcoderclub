import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const benefits = [
  {
    icon: '💬',
    title: 'Forum & grup private',
    desc: 'Bonus pembelian kelas Premium',
  },
  {
    icon: '📄',
    title: 'Sertifikat kelulusan resmi',
    desc: 'Bonus pembelian kelas Premium',
  },
  {
    icon: '💼',
    title: 'Kesempatan magang & kerja',
    desc: 'Bonus pembelian kelas Premium',
  },
  {
    icon: '📦',
    title: 'Well-prepared assets',
    desc: 'Bahan untuk belajar di kelas Premium',
  },
  {
    icon: '📚',
    title: 'Resources',
    desc: 'Materi belajar lengkap',
  },
];

const classes = [
  {
    id: 1,
    name: 'Scratch Programming',
    description: 'Belajar dasar-dasar programming dengan visual yang menyenangkan',
    image: '🎮',
    price: 'Rp 450.000',
    rating: 4.9,
    students: 120,
    duration: '8 minggu',
    age: '7-12 tahun',
  },
  {
    id: 2,
    name: 'Minecraft Coding',
    description: 'Belajar coding sambil bermain di dunia Minecraft yang seru',
    image: '🏗️',
    price: 'Rp 550.000',
    rating: 4.8,
    students: 95,
    duration: '10 minggu',
    age: '8-14 tahun',
  },
  {
    id: 3,
    name: 'Python for Kids',
    description: 'Pengenalan bahasa Python dengan cara yang mudah dipahami',
    image: '🐍',
    price: 'Rp 650.000',
    rating: 4.7,
    students: 80,
    duration: '12 minggu',
    age: '10-16 tahun',
  },
];

const Checkout: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const cls = classes.find(c => c.id === Number(id));

  if (!cls) {
    return <div className="text-center py-20">Kelas tidak ditemukan.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-10 items-start">
        {/* Left: Class Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full lg:w-1/2">
          <div className="mb-6 flex flex-col items-center">
            <span className="text-7xl mb-4">{cls.image}</span>
            <h2 className="text-2xl font-bold mb-2">{cls.name}</h2>
            <p className="text-gray-600 mb-2">{cls.description}</p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-400 text-xl">★★★★★</span>
              <span className="text-gray-700">({cls.rating})</span>
            </div>
            <div className="flex gap-4 text-sm text-gray-500">
              <span>👦 {cls.students} siswa</span>
              <span>⏳ {cls.duration}</span>
              <span>🎂 {cls.age}</span>
            </div>
          </div>
          <div className="mt-6 border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold text-gray-800">{cls.price}</span>
              <span className="text-sm text-gray-500">/kelas</span>
            </div>
            <button
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300"
              onClick={() => alert('Simulasi pembayaran!')}
            >
              Bayar & Gabung Kelas
            </button>
          </div>
        </div>
        {/* Right: Benefits */}
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full lg:w-1/2">
          <h3 className="text-xl font-bold mb-6">Special benefits for you</h3>
          <ul className="space-y-4">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-center bg-gray-50 rounded-xl p-4">
                <span className="text-3xl mr-4">{b.icon}</span>
                <div>
                  <div className="font-semibold">{b.title}</div>
                  <div className="text-gray-500 text-sm">{b.desc}</div>
                </div>
                <span className="ml-auto text-green-500 text-xl">✔️</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
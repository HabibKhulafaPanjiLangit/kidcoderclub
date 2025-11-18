import React, { useState, useEffect } from 'react';
import { Star, Clock, Users, Trophy, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ClassesProps {
  onOpenModal: (type: string, cls: any) => void;
}

const Classes = ({ onOpenModal }: ClassesProps) => {
  const [visibleCards, setVisibleCards] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCards(prev => (prev < 3 ? prev + 1 : prev));
    }, 200);
    return () => clearInterval(timer);
  }, []);

  const classes = [
    {
      id: 1,
      name: 'Scratch Programming',
      description: 'Belajar dasar-dasar programming dengan visual yang menyenangkan',
      age: '7-12 tahun',
      duration: '8 minggu',
      students: 120,
      rating: 4.9,
      progress: 85,
      image: '🎮',
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50',
      price: 'Rp 450.000',
      features: ['Drag & Drop Coding', 'Animasi & Game', 'Storytelling Digital']
    },
    {
      id: 2,
      name: 'Minecraft Coding',
      description: 'Belajar coding sambil bermain di dunia Minecraft yang seru',
      age: '8-14 tahun',
      duration: '10 minggu',
      students: 95,
      rating: 4.8,
      progress: 78,
      image: '🏗️',
      color: 'from-green-400 to-blue-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-blue-50',
      price: 'Rp 550.000',
      features: ['Redstone Programming', 'Command Blocks', 'Mod Development']
    },
    {
      id: 3,
      name: 'Python for Kids',
      description: 'Pengenalan bahasa Python dengan cara yang mudah dipahami',
      age: '10-16 tahun',
      duration: '12 minggu',
      students: 80,
      rating: 4.7,
      progress: 92,
      image: '🐍',
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
      price: 'Rp 650.000',
      features: ['Syntax Dasar', 'Game Development', 'Data Visualization']
    }
  ];

  interface ProgressBarProps {
    progress: number;
    color: string;
  }

  const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color }) => {
    const [currentProgress, setCurrentProgress] = useState(0);
    useEffect(() => {
      const timer = setTimeout(() => {
        setCurrentProgress(progress);
      }, 500);
      return () => clearTimeout(timer);
    }, [progress]);

    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${currentProgress}%` }}
        ></div>
      </div>
    );
  };

  interface StarRatingProps {
    rating: number;
  }

  const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
        <span className="text-sm font-medium text-gray-700 ml-1">{rating}</span>
      </div>
    );
  };

  const handleBuyClick = (id: number) => {
    navigate(`/checkout/${id}`);
  };

  return (
    <section id="classes" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-purple-100 rounded-full px-4 py-2 mb-4">
            <Trophy className="w-4 h-4 text-purple-600 mr-2" />
            <span className="text-purple-600 font-medium">Kelas Populer</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Pilih Kelas
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Favoritmu!
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Setiap kelas dirancang khusus untuk membuat anak-anak jatuh cinta dengan dunia programming
          </p>
        </div>

        {/* Classes Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {classes.map((cls, index) => (
            <div
              key={cls.id}
              className={`group ${cls.bgColor} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ; ${
                index < visibleCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Class Header */}
              <div className="text-center mb-6">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">{cls.image}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{cls.name}</h3>
                <p className="text-gray-600 mb-4">{cls.description}</p>
              </div>

              {/* Class Info */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Usia:</span>
                  <span className="font-medium text-gray-800">{cls.age}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Durasi:</span>
                  <span className="font-medium text-gray-800">{cls.duration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Siswa:</span>
                  <span className="font-medium text-gray-800">{cls.students} anak</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600">Rating:</span>
                <StarRating rating={cls.rating} />
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Tingkat Kelulusan:</span>
                  <span className="font-medium text-gray-800">{cls.progress}%</span>
                </div>
                <ProgressBar progress={cls.progress} color={cls.color} />
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Yang Akan Dipelajari:</h4>
                <ul className="space-y-2">
                  {cls.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <ChevronRight className="w-4 h-4 text-purple-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price & CTA */}
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-gray-800">{cls.price}</span>
                  <span className="text-sm text-gray-500">/kelas</span>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => onOpenModal('class', cls)}
                    className={`w-full bg-gradient-to-r ${cls.color} text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    Lihat Detail
                  </button>
                  <button
                    onClick={() => handleBuyClick(cls.id)}
                    className="w-full bg-white border-2 border-gray-200 text-gray-700 py-2 rounded-xl font-medium hover:border-purple-300 transition-all duration-300"
                  >
                    Beli sekarang
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Classes;

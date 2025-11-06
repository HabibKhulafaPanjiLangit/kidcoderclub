import React, { useState } from 'react';
import { Eye, Heart, Star, Trophy } from 'lucide-react';

const Gallery = ({ onOpenModal }) => {
  const [filter, setFilter] = useState('all');
// Ini Baru
  const projects = [
    {
      id: 1,
      title: 'Game Racing Mobil',
      student: 'Andi, 10 tahun',
      category: 'scratch',
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Game racing mobil yang dibuat menggunakan Scratch dengan kontrol keyboard dan sistem skor.',
      likes: 45,
      views: 120,
      tech: 'Scratch'
    },
    {
      id: 2,
      title: 'Kastil Minecraft Otomatis',
      student: 'Sari, 12 tahun',
      category: 'minecraft',
      image: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Kastil dengan sistem redstone otomatis untuk membuka gerbang dan menyalakan lampu.',
      likes: 62,
      views: 180,
      tech: 'Minecraft'
    },
    {
      id: 3,
      title: 'Kalkulator Pintar',
      student: 'Budi, 13 tahun',
      category: 'python',
      image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Kalkulator dengan interface GUI yang dibuat menggunakan Python dan tkinter.',
      likes: 38,
      views: 95,
      tech: 'Python'
    },
    {
      id: 4,
      title: 'Animasi Kucing Lucu',
      student: 'Maya, 9 tahun',
      category: 'scratch',
      image: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Animasi interaktif kucing yang bisa bergerak dan berinteraksi dengan mouse.',
      likes: 71,
      views: 200,
      tech: 'Scratch'
    },
    {
      id: 5,
      title: 'Rumah Pohon Modern',
      student: 'Rizki, 11 tahun',
      category: 'minecraft',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Rumah pohon dengan design modern menggunakan blok-blok kreatif di Minecraft.',
      likes: 54,
      views: 150,
      tech: 'Minecraft'
    },
    {
      id: 6,
      title: 'Game Tebak Angka',
      student: 'Lina, 12 tahun',
      category: 'python',
      image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Game tebak angka interaktif dengan sistem hint dan scoring.',
      likes: 42,
      views: 110,
      tech: 'Python'
    },
    {
      id: 7,
      title: 'Cerita Interaktif',
      student: 'Dika, 10 tahun',
      category: 'scratch',
      image: 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Cerita interaktif dengan pilihan ending berbeda menggunakan Scratch.',
      likes: 59,
      views: 175,
      tech: 'Scratch'
    },
    {
      id: 8,
      title: 'Roller Coaster Kreatif',
      student: 'Toni, 13 tahun',
      category: 'minecraft',
      image: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Roller coaster dengan track yang panjang dan pemandangan yang indah.',
      likes: 67,
      views: 190,
      tech: 'Minecraft'
    }
  ];
  const [likesData, setLikesData] = useState(
    projects.reduce((acc, project) => {
      acc[project.id] = project.likes;
      return acc;
    }, {})
  );

  const handleLike = (id) => {
    setLikesData(prev => ({
      ...prev,
      [id]: prev[id] + 1
    }));
  };

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  const categories = [
    { id: 'all', name: 'Semua Karya', icon: '🎨' },
    { id: 'scratch', name: 'Scratch', icon: '🎮' },
    { id: 'minecraft', name: 'Minecraft', icon: '🏗️' },
    { id: 'python', name: 'Python', icon: '🐍' }
  ];

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-purple-100 rounded-full px-4 py-2 mb-4">
            <Trophy className="w-4 h-4 text-purple-600 mr-2" />
            <span className="text-purple-600 font-medium">Galeri Karya</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Karya Kreatif
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Siswa Kami!
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lihat hasil karya menakjubkan yang dibuat oleh siswa-siswa KidCoder Club
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <button
                      onClick={() => onOpenModal('gallery', project)}
                      className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {project.tech}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-4">Oleh: {project.student}</p>
                <p className="text-sm text-gray-700 mb-4 line-clamp-2">{project.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(project.id)}
                      className="flex items-center text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      <span>{likesData[project.id]}</span>
                    </button>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 text-blue-500 mr-1" />
                      <span>{project.views}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span>5.0</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Siap Membuat Karya Hebat?
            </h3>
            <p className="text-lg mb-6 text-white/90">
              Bergabunglah dengan KidCoder Club dan wujudkan ide kreatifmu!
            </p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Mulai Belajar Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
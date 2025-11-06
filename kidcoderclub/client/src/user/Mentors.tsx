import React, { useState } from 'react';
import { Star, Award, Heart, Users } from 'lucide-react';

const Mentors = ({ onOpenModal }) => {
  const [hoveredMentor, setHoveredMentor] = useState(null);

  const mentors = [
    {
      id: 1,
      name: 'Kak Sarah',
      role: 'Scratch Programming Expert',
      experience: '5 tahun',
      students: 200,
      rating: 4.9,
      specialties: ['Scratch', 'Game Development', 'Animation'],
      avatar: '👩‍💻',
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50',
      description: 'Ahli dalam mengajarkan programming untuk anak-anak dengan metode yang menyenangkan dan mudah dipahami.',
      achievements: ['Certified Scratch Educator', 'Kids Programming Award 2023', '200+ Happy Students']
    },
    {
      id: 2,
      name: 'Kak Budi',
      role: 'Minecraft Coding Specialist',
      experience: '4 tahun',
      students: 180,
      rating: 4.8,
      specialties: ['Minecraft', 'Redstone', 'Command Blocks'],
      avatar: '👨‍🔬',
      color: 'from-green-400 to-blue-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-blue-50',
      description: 'Spesialis dalam mengajarkan coding melalui dunia Minecraft yang disukai anak-anak.',
      achievements: ['Minecraft Education Certified', 'Game Development Expert', 'Creative Teaching Award']
    },
    {
      id: 3,
      name: 'Kak Maya',
      role: 'Python for Kids Instructor',
      experience: '6 tahun',
      students: 150,
      rating: 4.9,
      specialties: ['Python', 'Web Development', 'Data Science'],
      avatar: '👩‍🏫',
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
      description: 'Berpengalaman dalam mengajarkan Python dengan cara yang mudah dipahami untuk anak-anak.',
      achievements: ['Python Institute Certified', 'Young Developer Mentor', 'Innovation in Education']
    },
    {
      id: 4,
      name: 'Kak Rizki',
      role: 'Web Development Coach',
      experience: '3 tahun',
      students: 120,
      rating: 4.7,
      specialties: ['HTML', 'CSS', 'JavaScript'],
      avatar: '👨‍💼',
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      description: 'Mengajarkan web development dengan pendekatan yang kreatif dan interaktif untuk anak-anak.',
      achievements: ['Web Development Certified', 'Creative Coding Expert', 'Digital Art Integration']
    }
  ];

  const StarRating = ({ rating }) => (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="text-sm font-medium text-gray-700 ml-1">{rating}</span>
    </div>
  );

  const Tooltip = ({ mentor }) => (
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-white rounded-xl shadow-2xl p-6 z-10 border border-gray-100">
      <div className="text-center mb-4">
        <div className="text-4xl mb-2">{mentor.avatar}</div>
        <h4 className="font-bold text-gray-800">{mentor.name}</h4>
        <p className="text-sm text-gray-600">{mentor.role}</p>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{mentor.description}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Pengalaman:</span>
          <span className="font-medium">{mentor.experience}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Siswa:</span>
          <span className="font-medium">{mentor.students}+ anak</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Rating:</span>
          <StarRating rating={mentor.rating} />
        </div>
      </div>

      <div className="mb-4">
        <h5 className="font-semibold text-gray-800 mb-2">Keahlian:</h5>
        <div className="flex flex-wrap gap-1">
          {mentor.specialties.map((specialty, idx) => (
            <span
              key={idx}
              className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${mentor.color} text-white`}
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h5 className="font-semibold text-gray-800 mb-2">Pencapaian:</h5>
        <ul className="space-y-1">
          {mentor.achievements.map((achievement, idx) => (
            <li key={idx} className="text-xs text-gray-600 flex items-center">
              <Award className="w-3 h-3 text-yellow-500 mr-1" />
              {achievement}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <section id="mentors" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-purple-100 rounded-full px-4 py-2 mb-4">
            <Users className="w-4 h-4 text-purple-600 mr-2" />
            <span className="text-purple-600 font-medium">Tim Mentor</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Bertemu dengan
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Mentor Terbaik!
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mentor berpengalaman yang siap membimbing anak-anak dalam perjalanan coding mereka
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {mentors.map((mentor, index) => (
            <div
              key={mentor.id}
              className={`relative group ${mentor.bgColor} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}
              onMouseEnter={() => setHoveredMentor(mentor.id)}
              onMouseLeave={() => setHoveredMentor(null)}
            >
              {/* Tooltip */}
              {hoveredMentor === mentor.id && (
                <Tooltip mentor={mentor} />
              )}

              {/* Mentor Card */}
              <div className="text-center">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {mentor.avatar}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{mentor.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{mentor.role}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-center">
                    <StarRating rating={mentor.rating} />
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 text-red-500 mr-1" />
                      <span>{mentor.students}+ siswa</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 justify-center mb-6">
                  {mentor.specialties.slice(0, 2).map((specialty, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${mentor.color} text-white`}
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <div className="space-y-2">
                  <button 
                    onClick={() => onOpenModal('mentor', mentor)}
                    className={`w-full bg-gradient-to-r ${mentor.color} text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  >
                  Lihat Profil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-3xl p-8 shadow-lg inline-block">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Ingin Bertemu Langsung?
            </h3>
            <p className="text-gray-600 mb-6">
              Jadwalkan sesi konsultasi gratis dengan mentor pilihan Anda
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Konsultasi Gratis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mentors;
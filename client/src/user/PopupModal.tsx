import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Heart, Trophy, Users } from 'lucide-react';

const PopupModal = ({ isOpen, onClose, type, data }) => {
  const getModalContent = () => {
    switch (type) {
      case 'class':
        return (
          <div className="text-center">
            <div className="text-6xl mb-4">{data.image}</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{data.name}</h3>
            <p className="text-gray-600 mb-6">{data.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600">Usia</div>
                <div className="font-bold text-gray-800">{data.age}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600">Durasi</div>
                <div className="font-bold text-gray-800">{data.duration}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600">Siswa</div>
                <div className="font-bold text-gray-800">{data.students} anak</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600">Harga</div>
                <div className="font-bold text-gray-800">{data.price}</div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-3">Materi Pembelajaran:</h4>
              <ul className="space-y-2">
                {data.features?.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <Star className="w-4 h-4 text-yellow-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button className={`w-full bg-gradient-to-r ${data.color} text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300`}>
              Daftar Kelas Ini
            </button>
          </div>
        );

      case 'mentor':
        return (
          <div className="text-center">
            <div className="text-6xl mb-4">{data.avatar}</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{data.name}</h3>
            <p className="text-purple-600 font-medium mb-4">{data.role}</p>
            <p className="text-gray-600 mb-6">{data.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600">Pengalaman</div>
                <div className="font-bold text-gray-800">{data.experience}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600">Siswa</div>
                <div className="font-bold text-gray-800">{data.students}+ anak</div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-3">Keahlian:</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {data.specialties?.map((specialty, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${data.color} text-white`}
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-3">Pencapaian:</h4>
              <ul className="space-y-2">
                {data.achievements?.map((achievement, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <Trophy className="w-4 h-4 text-yellow-500 mr-2" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>

            <button className={`w-full bg-gradient-to-r ${data.color} text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300`}>
              Konsultasi dengan {data.name}
            </button>
          </div>
        );

      case 'gallery':
        return (
          <div>
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-64 object-cover rounded-xl mb-6"
            />
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{data.title}</h3>
              <p className="text-purple-600 font-medium mb-4">Karya: {data.student}</p>
              <p className="text-gray-600 mb-6">{data.description}</p>
              
              <div className="flex items-center justify-center space-x-6 mb-6">
                <div className="flex items-center">
                  <Heart className="w-5 h-5 text-red-500 mr-2" />
                  <span className="font-medium">{data.likes} likes</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="font-medium">{data.views} views</span>
                </div>
              </div>

              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300">
                Beri Apresiasi ❤️
              </button>
            </div>
          </div>
        );

      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-3xl max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {getModalContent()}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupModal;
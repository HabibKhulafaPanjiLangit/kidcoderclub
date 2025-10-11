import React, { useState } from 'react';
import { Code, Palette, Gamepad2, Brain, Layers } from 'lucide-react';

const CoursesSelection: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>('');

  const courses = [
    {
      id: 'scratch',
      title: 'Scratch Programming',
      description: 'Visual programming untuk anak-anak pemula',
      icon: Code,
      color: 'bg-orange-500',
      students: 45,
      classes: 8
    },
    {
      id: 'python',
      title: 'Python untuk Anak',
      description: 'Bahasa pemrograman Python yang mudah dipelajari',
      icon: Code,
      color: 'bg-blue-500',
      students: 32,
      classes: 6
    },
    {
      id: 'minecraft',
      title: 'Minecraft Coding',
      description: 'Belajar coding sambil bermain Minecraft',
      icon: Gamepad2,
      color: 'bg-green-500',
      students: 28,
      classes: 5
    },
    {
      id: 'uiux',
      title: 'UI/UX Kids',
      description: 'Desain antarmuka yang menarik untuk anak-anak',
      icon: Palette,
      color: 'bg-purple-500',
      students: 15,
      classes: 3
    },
    {
      id: 'ai',
      title: 'AI untuk Anak',
      description: 'Pengenalan artificial intelligence dengan cara yang fun',
      icon: Brain,
      color: 'bg-pink-500',
      students: 20,
      classes: 4
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Bidang Pembelajaran</h2>
        <p className="text-gray-600">Pilih dan kelola bidang pembelajaran yang Anda ajarkan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const IconComponent = course.icon;
          return (
            <div
              key={course.id}
              className={`bg-white p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedCourse === course.id 
                  ? 'border-blue-500 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedCourse(course.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${course.color} p-3 rounded-xl`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Murid</p>
                  <p className="text-xl font-bold text-gray-800">{course.students}</p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {course.classes} Kelas
                </span>
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  Kelola →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedCourse && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Aksi untuk {courses.find(c => c.id === selectedCourse)?.title}
          </h3>
          <div className="flex flex-wrap gap-3">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Lihat Kelas
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
              Tambah Kelas Baru
            </button>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
              Upload Materi
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              Statistik
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesSelection;
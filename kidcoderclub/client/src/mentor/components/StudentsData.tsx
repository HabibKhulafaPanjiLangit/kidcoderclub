import React, { useState } from 'react';
import { Users, TrendingUp, Award, Eye, Edit, UserPlus } from 'lucide-react';

const StudentsData: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('all');
  const [showStudentDetail, setShowStudentDetail] = useState<number | null>(null);

  const classes = [
    { id: 'all', name: 'Semua Kelas', count: 24 },
    { id: 'scratch-a', name: 'Scratch - Kelas A', count: 8 },
    { id: 'python-b', name: 'Python - Kelas B', count: 6 },
    { id: 'minecraft-c', name: 'Minecraft - Kelas C', count: 10 }
  ];

  const students = [
    {
      id: 1,
      name: 'Andi Pratama',
      age: 10,
      course: 'Scratch',
      class: 'Kelas A',
      progress: 85,
      attendance: 95,
      lastScore: 95,
      joinDate: '2024-01-01',
      avatar: '👦',
      parent: 'Ibu Sari',
      phone: '081234567890',
      skills: ['Animasi', 'Game Design', 'Problem Solving'],
      projects: 5
    },
    {
      id: 2,
      name: 'Sari Indah',
      age: 11,
      course: 'Python',
      class: 'Kelas B',
      progress: 78,
      attendance: 88,
      lastScore: 88,
      joinDate: '2024-01-05',
      avatar: '👧',
      parent: 'Pak Ahmad',
      phone: '081234567891',
      skills: ['Variables', 'Functions', 'Loops'],
      projects: 3
    },
    {
      id: 3,
      name: 'Budi Santoso',
      age: 9,
      course: 'Minecraft',
      class: 'Kelas C',
      progress: 90,
      attendance: 92,
      lastScore: 92,
      joinDate: '2023-12-20',
      avatar: '👦',
      parent: 'Ibu Rina',
      phone: '081234567892',
      skills: ['Redstone', 'Building', 'Commands'],
      projects: 7
    },
    {
      id: 4,
      name: 'Maya Dewi',
      age: 12,
      course: 'UI/UX',
      class: 'Kelas A',
      progress: 75,
      attendance: 85,
      lastScore: 87,
      joinDate: '2024-01-10',
      avatar: '👧',
      parent: 'Pak Deni',
      phone: '081234567893',
      skills: ['Wireframing', 'Color Theory', 'User Research'],
      projects: 4
    }
  ];

  const getCourseColor = (course: string) => {
    switch (course) {
      case 'Scratch': return 'bg-orange-500';
      case 'Python': return 'bg-blue-500';
      case 'Minecraft': return 'bg-green-500';
      case 'UI/UX': return 'bg-purple-500';
      case 'AI': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const filteredStudents = selectedClass === 'all' 
    ? students 
    : students.filter(student => {
        const classMatch = classes.find(c => c.id === selectedClass);
        return classMatch && student.class === classMatch.name.split(' - ')[1];
      });

  const selectedStudent = students.find(s => s.id === showStudentDetail);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Data Murid</h2>
            <p className="text-gray-600">Kelola dan pantau perkembangan murid Anda</p>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
            <UserPlus className="h-4 w-4" />
            <span>Tambah Murid</span>
          </button>
        </div>
      </div>

      {/* Class Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-wrap gap-3">
          {classes.map((classItem) => (
            <button
              key={classItem.id}
              onClick={() => setSelectedClass(classItem.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedClass === classItem.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {classItem.name} ({classItem.count})
            </button>
          ))}
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{student.avatar}</div>
                <div>
                  <p className="font-semibold text-gray-800">{student.name}</p>
                  <p className="text-sm text-gray-600">{student.age} tahun</p>
                </div>
              </div>
              <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-medium ${getCourseColor(student.course)}`}>
                {student.course}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{student.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(student.progress)}`}
                    style={{ width: `${student.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Kehadiran</p>
                  <p className="font-medium">{student.attendance}%</p>
                </div>
                <div>
                  <p className="text-gray-600">Nilai Terakhir</p>
                  <p className="font-medium">{student.lastScore}</p>
                </div>
                <div>
                  <p className="text-gray-600">Kelas</p>
                  <p className="font-medium">{student.class}</p>
                </div>
                <div>
                  <p className="text-gray-600">Proyek</p>
                  <p className="font-medium">{student.projects}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <button
                  onClick={() => setShowStudentDetail(student.id)}
                  className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-1"
                >
                  <Eye className="h-4 w-4" />
                  <span>Detail</span>
                </button>
                <button className="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Student Detail Modal */}
      {showStudentDetail && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Detail Murid</h3>
              <button
                onClick={() => setShowStudentDetail(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{selectedStudent.avatar}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{selectedStudent.name}</h4>
                    <p className="text-gray-600">{selectedStudent.age} tahun</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-white text-xs font-medium ${getCourseColor(selectedStudent.course)}`}>
                      {selectedStudent.course} - {selectedStudent.class}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Orang Tua:</span>
                    <span className="font-medium">{selectedStudent.parent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Telepon:</span>
                    <span className="font-medium">{selectedStudent.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bergabung:</span>
                    <span className="font-medium">{new Date(selectedStudent.joinDate).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
              </div>

              {/* Progress & Stats */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Progress Pembelajaran</span>
                    <span className="font-bold text-lg">{selectedStudent.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${getProgressColor(selectedStudent.progress)}`}
                      style={{ width: `${selectedStudent.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-blue-600">{selectedStudent.attendance}%</p>
                    <p className="text-sm text-gray-600">Kehadiran</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">{selectedStudent.lastScore}</p>
                    <p className="text-sm text-gray-600">Nilai Terakhir</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-purple-600">{selectedStudent.projects}</p>
                    <p className="text-sm text-gray-600">Proyek</p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-orange-600">{selectedStudent.skills.length}</p>
                    <p className="text-sm text-gray-600">Skills</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-6">
              <h5 className="font-semibold text-gray-800 mb-3">Keterampilan yang Dikuasai</h5>
              <div className="flex flex-wrap gap-2">
                {selectedStudent.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Beri Feedback
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Edit Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsData;
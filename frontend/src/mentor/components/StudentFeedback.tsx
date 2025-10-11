import React, { useState } from 'react';
import { Star, MessageSquare, TrendingUp, Award, Send } from 'lucide-react';

const StudentFeedback: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const students = [
    {
      id: 1,
      name: 'Andi Pratama',
      course: 'Scratch',
      class: 'Kelas A',
      lastScore: 95,
      progress: 85,
      avatar: '👦',
      lastFeedback: '2024-01-10'
    },
    {
      id: 2,
      name: 'Sari Indah',
      course: 'Python',
      class: 'Kelas B',
      lastScore: 88,
      progress: 78,
      avatar: '👧',
      lastFeedback: '2024-01-08'
    },
    {
      id: 3,
      name: 'Budi Santoso',
      course: 'Minecraft',
      class: 'Kelas C',
      lastScore: 92,
      progress: 90,
      avatar: '👦',
      lastFeedback: '2024-01-12'
    },
    {
      id: 4,
      name: 'Maya Dewi',
      course: 'UI/UX',
      class: 'Kelas A',
      lastScore: 87,
      progress: 75,
      avatar: '👧',
      lastFeedback: '2024-01-05'
    }
  ];

  const feedbackHistory = [
    {
      id: 1,
      student: 'Andi Pratama',
      date: '2024-01-10',
      score: 95,
      comment: 'Sangat kreatif dalam membuat game! Logika pemrograman sudah bagus.',
      skills: ['Kreativitas', 'Problem Solving', 'Logika']
    },
    {
      id: 2,
      student: 'Sari Indah',
      date: '2024-01-08',
      score: 88,
      comment: 'Pemahaman konsep Python cukup baik, perlu latihan lebih di loops.',
      skills: ['Sintaks Python', 'Konsep Dasar']
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

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderStars = (score: number) => {
    const stars = Math.floor(score / 20);
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < stars ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Feedback Murid</h2>
            <p className="text-gray-600">Berikan penilaian dan feedback untuk perkembangan murid</p>
          </div>
          <button
            onClick={() => setShowFeedbackForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Beri Feedback</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Students List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Daftar Murid</h3>
          <div className="space-y-4">
            {students.map((student) => (
              <div
                key={student.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedStudent === student.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedStudent(student.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{student.avatar}</div>
                    <div>
                      <p className="font-medium text-gray-800">{student.name}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className={`inline-block w-2 h-2 rounded-full ${getCourseColor(student.course)}`}></span>
                        <span>{student.course} - {student.class}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${getScoreColor(student.lastScore)}`}>
                      {student.lastScore}
                    </p>
                    <div className="flex items-center space-x-1">
                      {renderStars(student.lastScore)}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{student.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback History */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Riwayat Feedback
          </h3>
          <div className="space-y-4">
            {feedbackHistory.map((feedback) => (
              <div key={feedback.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-800">{feedback.student}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`text-lg font-bold ${getScoreColor(feedback.score)}`}>
                      {feedback.score}
                    </span>
                    <Award className="h-4 w-4 text-yellow-500" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{feedback.comment}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {feedback.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  {new Date(feedback.date).toLocaleDateString('id-ID')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback Form Modal */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Beri Feedback</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Murid</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} - {student.course}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nilai (0-100)</label>
                <input 
                  type="number" 
                  min="0" 
                  max="100" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keterampilan yang Dikuasai</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Kreativitas', 'Problem Solving', 'Logika', 'Sintaks', 'Debugging', 'Kolaborasi'].map((skill) => (
                    <label key={skill} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Komentar</label>
                <textarea 
                  rows={4} 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                  placeholder="Berikan feedback yang konstruktif untuk murid..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Area yang Perlu Diperbaiki</label>
                <textarea 
                  rows={3} 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                  placeholder="Saran untuk perbaikan..."
                ></textarea>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowFeedbackForm(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Kirim Feedback</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentFeedback;
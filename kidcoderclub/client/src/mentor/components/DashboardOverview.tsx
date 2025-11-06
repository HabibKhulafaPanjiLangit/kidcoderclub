import React from 'react';
import { Users, BookOpen, Calendar, TrendingUp, Award, Clock } from 'lucide-react';

const DashboardOverview: React.FC = () => {
  const stats = [
    { title: 'Total Murid', value: '24', icon: Users, color: 'bg-blue-500', change: '+3 minggu ini' },
    { title: 'Kelas Aktif', value: '6', icon: BookOpen, color: 'bg-green-500', change: '+1 kelas baru' },
    { title: 'Jadwal Hari Ini', value: '3', icon: Calendar, color: 'bg-orange-500', change: '2 jam lagi' },
    { title: 'Rating Rata-rata', value: '4.8', icon: Award, color: 'bg-purple-500', change: '⭐⭐⭐⭐⭐' },
  ];

  const upcomingClasses = [
    { time: '09:00', title: 'Scratch Dasar - Kelas A', students: 8, duration: '90 menit' },
    { time: '11:00', title: 'Python untuk Pemula - Kelas B', students: 6, duration: '120 menit' },
    { time: '14:00', title: 'Minecraft Coding - Kelas C', students: 10, duration: '90 menit' },
  ];

  const recentFeedback = [
    { student: 'Andi', course: 'Scratch', score: 95, comment: 'Sangat kreatif dalam membuat game!' },
    { student: 'Sari', course: 'Python', score: 88, comment: 'Pemahaman logika sudah bagus' },
    { student: 'Budi', course: 'UI/UX', score: 92, comment: 'Desain yang menarik dan user-friendly' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Classes */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Jadwal Hari Ini</h3>
            <Clock className="h-5 w-5 text-gray-500" />
          </div>
          <div className="space-y-4">
            {upcomingClasses.map((class_, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
                  {class_.time}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{class_.title}</p>
                  <p className="text-sm text-gray-500">{class_.students} murid • {class_.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Feedback */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Feedback Terbaru</h3>
            <TrendingUp className="h-5 w-5 text-gray-500" />
          </div>
          <div className="space-y-4">
            {recentFeedback.map((feedback, index) => (
              <div key={index} className="border-l-4 border-green-400 pl-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-gray-800">{feedback.student}</p>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                    {feedback.score}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{feedback.course}</p>
                <p className="text-sm text-gray-500 mt-1">{feedback.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
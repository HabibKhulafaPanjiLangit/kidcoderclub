import React, { useState } from 'react';
import { Calendar, Clock, Users, Plus, Edit, Trash2 } from 'lucide-react';

const ClassSchedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2024-01-15');
  const [showAddForm, setShowAddForm] = useState(false);

  const scheduleData = [
    {
      id: 1,
      time: '09:00 - 10:30',
      title: 'Scratch Dasar - Kelas A',
      course: 'Scratch',
      students: 8,
      date: '2024-01-15',
      room: 'Online - Zoom',
      status: 'scheduled'
    },
    {
      id: 2,
      time: '11:00 - 13:00',
      title: 'Python untuk Pemula - Kelas B',
      course: 'Python',
      students: 6,
      date: '2024-01-15',
      room: 'Online - Google Meet',
      status: 'scheduled'
    },
    {
      id: 3,
      time: '14:00 - 15:30',
      title: 'Minecraft Coding - Kelas C',
      course: 'Minecraft',
      students: 10,
      date: '2024-01-15',
      room: 'Online - Zoom',
      status: 'completed'
    }
  ];

  const upcomingWeek = [
    { date: '2024-01-15', day: 'Sen', classes: 3 },
    { date: '2024-01-16', day: 'Sel', classes: 2 },
    { date: '2024-01-17', day: 'Rab', classes: 4 },
    { date: '2024-01-18', day: 'Kam', classes: 1 },
    { date: '2024-01-19', day: 'Jum', classes: 3 },
    { date: '2024-01-20', day: 'Sab', classes: 2 },
    { date: '2024-01-21', day: 'Min', classes: 0 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Jadwal Kelas</h2>
            <p className="text-gray-600">Kelola jadwal mengajar Anda</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Kelas</span>
          </button>
        </div>
      </div>

      {/* Weekly Calendar */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Minggu Ini
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {upcomingWeek.map((day) => (
            <div
              key={day.date}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedDate === day.date
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedDate(day.date)}
            >
              <div className="text-center">
                <p className="text-sm font-medium">{day.day}</p>
                <p className="text-lg font-bold">{new Date(day.date).getDate()}</p>
                <p className="text-xs mt-1">
                  {day.classes > 0 ? `${day.classes} kelas` : 'Kosong'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule List */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Jadwal {new Date(selectedDate).toLocaleDateString('id-ID', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h3>
        
        <div className="space-y-4">
          {scheduleData
            .filter(item => item.date === selectedDate)
            .map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`${getCourseColor(item.course)} p-2 rounded-lg`}>
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{item.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {item.time}
                        </span>
                        <span className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {item.students} murid
                        </span>
                        <span>{item.room}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status === 'scheduled' ? 'Terjadwal' : item.status === 'completed' ? 'Selesai' : 'Dibatalkan'}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          
          {scheduleData.filter(item => item.date === selectedDate).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Tidak ada kelas pada tanggal ini</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Class Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tambah Kelas Baru</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul Kelas</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bidang</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>Scratch</option>
                  <option>Python</option>
                  <option>Minecraft</option>
                  <option>UI/UX</option>
                  <option>AI</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                  <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Waktu</label>
                  <input type="time" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassSchedule;
import React from 'react';
import { MessageCircle, Users, ExternalLink, Plus, Settings } from 'lucide-react';

const WhatsAppGroups: React.FC = () => {
  const whatsappGroups = [
    {
      id: 1,
      name: 'Scratch Kelas A - Orang Tua',
      course: 'Scratch',
      class: 'Kelas A',
      members: 16,
      link: 'https://chat.whatsapp.com/ABC123',
      lastActivity: '2 jam yang lalu',
      avatar: '🟧',
      description: 'Grup komunikasi untuk orang tua murid Scratch Kelas A'
    },
    {
      id: 2,
      name: 'Python Kelas B - Parents',
      course: 'Python',
      class: 'Kelas B',
      members: 12,
      link: 'https://chat.whatsapp.com/DEF456',
      lastActivity: '30 menit yang lalu',
      avatar: '🐍',
      description: 'Grup diskusi dan update progress Python Kelas B'
    },
    {
      id: 3,
      name: 'Minecraft Coding - Kelas C',
      course: 'Minecraft',
      class: 'Kelas C',
      members: 20,
      link: 'https://chat.whatsapp.com/GHI789',
      lastActivity: '1 jam yang lalu',
      avatar: '⬜',
      description: 'Grup koordinasi untuk project Minecraft Coding'
    },
    {
      id: 4,
      name: 'UI/UX Kids - Kelas A',
      course: 'UI/UX',
      class: 'Kelas A',
      members: 8,
      link: 'https://chat.whatsapp.com/JKL012',
      lastActivity: '3 jam yang lalu',
      avatar: '🎨',
      description: 'Grup sharing design dan feedback UI/UX'
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

  const handleOpenWhatsApp = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Grup WhatsApp</h2>
            <p className="text-gray-600">Kelola komunikasi dengan orang tua dan murid melalui WhatsApp</p>
          </div>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Buat Grup Baru</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-xl">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{whatsappGroups.length}</p>
              <p className="text-sm text-gray-600">Total Grup</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {whatsappGroups.reduce((total, group) => total + group.members, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Member</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Settings className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">4</p>
              <p className="text-sm text-gray-600">Kelas Aktif</p>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Groups List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {whatsappGroups.map((group) => (
          <div key={group.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{group.avatar}</div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{group.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-block px-2 py-1 rounded-full text-white text-xs font-medium ${getCourseColor(group.course)}`}>
                      {group.course}
                    </span>
                    <span className="text-sm text-gray-600">{group.class}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => handleOpenWhatsApp(group.link)}
                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                title="Buka di WhatsApp"
              >
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>

            <p className="text-gray-600 text-sm mb-4">{group.description}</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{group.members} member</span>
                </div>
                <span className="text-gray-600">Aktif {group.lastActivity}</span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleOpenWhatsApp(group.link)}
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Buka Chat</span>
                </button>
                <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-xl text-white">
        <h3 className="text-lg font-semibold mb-2">Tips Komunikasi WhatsApp</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <p>✅ Kirim update progress rutin</p>
            <p>✅ Share foto hasil karya murid</p>
            <p>✅ Berikan feedback positif</p>
          </div>
          <div className="space-y-2">
            <p>✅ Jawab pertanyaan orang tua</p>
            <p>✅ Koordinasi jadwal makeup class</p>
            <p>✅ Share materi tambahan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppGroups;
import React from 'react';
import { 
  Home, 
  BookOpen, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Users, 
  MessageCircle,
  Code,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'courses', label: 'Bidang Pembelajaran', icon: Code },
    { id: 'schedule', label: 'Jadwal Kelas', icon: Calendar },
    { id: 'materials', label: 'Materi Pembelajaran', icon: FileText },
    { id: 'feedback', label: 'Feedback Murid', icon: MessageSquare },
    { id: 'students', label: 'Data Murid', icon: Users },
    { id: 'whatsapp', label: 'Grup WhatsApp', icon: MessageCircle },
  ];

  return (
    <div className="bg-white shadow-xl h-full w-64 fixed left-0 top-0 z-40">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">KidCoderClub</h1>
            <p className="text-sm text-gray-500">Mentor Dashboard</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600 border-r-3 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <IconComponent className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-xl p-4 text-white">
          <p className="text-sm font-medium">Selamat Mengajar!</p>
          <p className="text-xs opacity-90">Semangat membimbing anak-anak</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
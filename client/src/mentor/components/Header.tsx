import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard Mentor</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Cari murid, kelas..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button className="relative p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 p-2 rounded-full">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Pak Budi</p>
              <p className="text-sm text-gray-500">Mentor Senior</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
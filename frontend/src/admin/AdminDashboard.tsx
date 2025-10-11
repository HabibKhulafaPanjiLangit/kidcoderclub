import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import UsersPage from './pages/UsersPage';
import CertificatesPage from './pages/CertificatesPage';
import MaterialsPage from './pages/MaterialsPage';
import PaymentsPage from './pages/PaymentsPage';
import StatsPage from './pages/StatsPage';
import MaintenancePage from './pages/MaintenancePage';

function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">KC</span>
                </div>
                <span className="font-bold text-gray-800">KidCoderClub</span>
              </div>
            </div>
          </div>

          {/* Routes */}
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="certificates" element={<CertificatesPage />} />
            <Route path="materials" element={<MaterialsPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="stats" element={<StatsPage />} />
            <Route path="maintenance" element={<MaintenancePage />} />
          </Routes>
        </div>
      </div>
    </AppProvider>
  );
}

export default AdminDashboard;
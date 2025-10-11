import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardOverview from './components/DashboardOverview';
import CoursesSelection from './components/CoursesSelection';
import ClassSchedule from './components/ClassSchedule';
import MaterialsManagement from './components/MaterialsManagement';
import StudentFeedback from './components/StudentFeedback';
import StudentsData from './components/StudentsData';
import WhatsAppGroups from './components/WhatsAppGroups';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'courses':
        return <CoursesSelection />;
      case 'schedule':
        return <ClassSchedule />;
      case 'materials':
        return <MaterialsManagement />;
      case 'feedback':
        return <StudentFeedback />;
      case 'students':
        return <StudentsData />;
      case 'whatsapp':
        return <WhatsAppGroups />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform lg:translate-x-0`}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        <Header />
        <main className="p-6">
          {renderContent()}
        </main>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-4 right-4 lg:hidden bg-blue-500 text-white p-3 rounded-full shadow-lg z-50"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  );
}

export default App;
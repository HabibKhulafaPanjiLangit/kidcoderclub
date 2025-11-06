import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Navbar from './components/Layout/Navbar';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Gallery from './pages/Gallery';
import Mentors from './pages/Mentors';
import Pricing from './pages/Pricing';
import FAQ from './pages/FAQ';
import Partnerships from './pages/Partnerships';
import Portfolio from './pages/Portfolio';
import Testimonial from './pages/Testimonial';
import Feedback from './pages/Feedback';
import Chatbot from './components/Chatbot';

function AuthScreen() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {showLogin ? (
        <LoginForm onToggleForm={() => setShowLogin(false)} />
      ) : (
        <RegisterForm onToggleForm={() => setShowLogin(true)} />
      )}
    </div>
  );
}

function MainApp() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'courses':
        return <Courses />;
      case 'gallery':
        return <Gallery />;
      case 'mentors':
        return <Mentors />;
      case 'pricing':
        return <Pricing />;
      case 'faq':
        return <FAQ />;
      case 'partnerships':
        return <Partnerships />;
      case 'portfolio':
        return <Portfolio />;
      case 'testimonial':
        return <Testimonial />;
      case 'feedback':
        return <Feedback />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      {renderPage()}
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;

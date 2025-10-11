import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomeAnimation from './user/WelcomeAnimation';
import MusicPlayer from './user/MusicPlayer';
import PopupModal from './user/PopupModal';
import Header from './user/Header';
import Hero from './user/Hero';
import Classes from './user/kelas/Classes';
import Mentors from './user/Mentors';
import Gallery from './user/Gallery';
import Testimonials from './user/Testimonials';
import Registration from './user/Registration';
import Footer from './user/Footer';
import AdminDashboard from './admin/AdminDashboard';
import { trackPageView } from './services/firebaseService';
import Checkout from './user/kelas/Checkout';
import AuthFlow from './user/auth/AuthFlow';

function App() {
  return (
    <Routes>
      <Route path="/*" element={<MainLayout />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
      <Route path="/checkout/:id" element={<Checkout />} />
      <Route path="/register" element={<AuthFlow mode="default" />} />
      <Route path="/admin-login" element={<AuthFlow mode="admin" />} />
    </Routes>
  );
}

function MainLayout() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [modalData, setModalData] = useState({ isOpen: false, type: '', data: {} });

  useEffect(() => {
    trackPageView('home');
  }, []);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  const openModal = (type: any, data: any) => {
    setModalData({ isOpen: true, type, data });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, type: '', data: {} });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {showWelcome && <WelcomeAnimation onComplete={handleWelcomeComplete} />}
      
      <PopupModal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        type={modalData.type}
        data={modalData.data}
      />
      
      <Header />
      <Hero />
      <Classes onOpenModal={openModal} />
      <Mentors onOpenModal={openModal} />
      <Gallery onOpenModal={openModal} />
      <Testimonials />
      <Registration />
      <Footer />
      <MusicPlayer />
    </div>
  );
}

export default App;
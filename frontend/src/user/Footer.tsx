import React from 'react';
import { Code, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Heart } from 'lucide-react';
import { subscribeNewsletter, trackEvent } from '../services/firebaseService';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = React.useState('');
  const [isSubscribing, setIsSubscribing] = React.useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = React.useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribing(true);
    try {
      const result = await subscribeNewsletter(email);
      
      if (result.success) {
        setSubscriptionMessage('Berhasil berlangganan newsletter!');
        setEmail('');
        await trackEvent('newsletter_subscription', { email });
      } else {
        setSubscriptionMessage(result.error || 'Gagal berlangganan newsletter');
      }
    } catch (error) {
      setSubscriptionMessage('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsSubscribing(false);
      setTimeout(() => setSubscriptionMessage(''), 3000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
                <Code className="text-white w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">KidCoder Club</h3>
                <p className="text-gray-400 text-sm">Belajar coding seru!</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Mengembangkan potensi anak-anak Indonesia melalui pembelajaran programming yang menyenangkan dan interaktif.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-pink-600 p-2 rounded-lg hover:bg-pink-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-red-600 p-2 rounded-lg hover:bg-red-700 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Menu Cepat</h4>
            <ul className="space-y-2">
              <li><a href="#classes" className="text-gray-400 hover:text-white transition-colors">Kelas</a></li>
              <li><a href="#mentors" className="text-gray-400 hover:text-white transition-colors">Mentor</a></li>
              <li><a href="#gallery" className="text-gray-400 hover:text-white transition-colors">Galeri</a></li>
              <li><a href="#registration" className="text-gray-400 hover:text-white transition-colors">Pendaftaran</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Program Kelas</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Scratch Programming</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Minecraft Coding</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Python for Kids</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Web Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Game Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Mobile App</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hubungi Kami</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-purple-500" />
                <span className="text-gray-400">Jakarta, Indonesia</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-purple-500" />
                <span className="text-gray-400">0812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-500" />
                <span className="text-gray-400">info@kidcoderclub.com</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h5 className="font-semibold mb-2">Newsletter</h5>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="flex">
                <input
                  type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Anda"
                    required
                  className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:outline-none"
                />
                  <button 
                    type="submit"
                    disabled={isSubscribing}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-r-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubscribing ? 'Loading...' : 'Subscribe'}
                </button>
              </div>
                {subscriptionMessage && (
                  <p className={`text-sm ${subscriptionMessage.includes('Berhasil') ? 'text-green-400' : 'text-red-400'}`}>
                    {subscriptionMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} KidCoder Club. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
          <div className="text-center mt-4 text-gray-400 text-sm">
            Made with <Heart className="w-4 h-4 inline text-red-500" /> for Indonesian kids
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
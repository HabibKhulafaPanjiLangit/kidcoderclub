import React from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Users, Trophy, ArrowRight } from 'lucide-react';
import HeroAnimation from './HeroAnimation'; // Import the new component

const Hero = () => {

  const letterAnimation = {
    initial: { y: 0 },
    animate: (i) => ({
      y: [0, -12, 0],
      transition: {
        delay: i * 0.08,
        duration: 2.5,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      },
    }),
  };

  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      {/* Full-screen background animations */}
      <HeroAnimation />

      {/* Static Animated Background Elements (kept for texture) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-300 rounded-full opacity-10 animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-green-300 rounded-full opacity-10 animate-bounce delay-500"></div>
      </div>

      {/* Content Layer (with z-index to be on top) */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-yellow-300 mr-2" />
              <span className="text-white text-sm font-medium">
                #1 Platform Coding untuk Anak
              </span>
            </div>

            <h1 className="font-baloo text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight overflow-visible">
              <span className="flex justify-center lg:justify-start">
                {"Belajar Coding".split("").map((char, index) => (
                  <motion.span key={index} custom={index} initial="initial" animate="animate" variants={letterAnimation} style={{ display: 'inline-block' }}>
                    {char}
                  </motion.span>
                ))}
              </span>
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text">
                <span className="">
                  {"Jadi Seru!".split("").map((char, index) => (
                    <motion.span key={index} custom={index + "Belajar Coding".length} initial="initial" animate="animate" variants={letterAnimation} style={{ display: 'inline-block' }}>
                      {char}
                    </motion.span>
                  ))}
                </span>
              </span>
            </h1>

            <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Bergabunglah dengan KidCoder Club dan rasakan serunya belajar programming! 
              Dengan mentor berpengalaman dan metode pembelajaran yang menyenangkan, 
              anak-anak akan menjadi programmer cilik yang handal.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 hover:text-purple-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105">
                <Play className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Mulai Belajar
              </button>
              <button 
                className="group bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300 flex items-center justify-center border-2 border-white/30 hover:border-white/50"
                onClick={() => {
                  // Play button click sound
                  try {
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.1);
                  } catch (error) {
                    console.log('Audio not supported');
                  }
                }}
              >
                Lihat Demo
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-2">
                  <Users className="w-8 h-8 text-yellow-300 mx-auto" />
                </div>
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm text-white/80">Siswa Aktif</div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-2">
                  <Trophy className="w-8 h-8 text-yellow-300 mx-auto" />
                </div>
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-sm text-white/80">Proyek Selesai</div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-2">
                  <Star className="w-8 h-8 text-yellow-300 mx-auto" />
                </div>
                <div className="text-2xl font-bold text-white">4.9</div>
                <div className="text-sm text-white/80">Rating</div>
              </div>
            </div>
          </div>

          {/* This div is now empty on the right, but keeps the grid structure */}
          <div className="relative hidden lg:block">
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
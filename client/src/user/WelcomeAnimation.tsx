import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Code, Play } from 'lucide-react';

// Simple audio context for welcome sounds
const playWelcomeSound = () => {
  try {
    const audioContext = new (window.AudioContext || window.AudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (error) {
    console.log('Audio not supported');
  }
};

type WelcomeAnimationProps = {
  onComplete: () => void;
};

const WelcomeAnimation: React.FC<WelcomeAnimationProps> = ({ onComplete }) => {

  const [currentStep, setCurrentStep] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);

  const characters = ['👦', '👧', '🤖', '🐼', '🦊', '🦄', '🧒', '👶', '💻', '🚀', '💡'];
  const colors = ['text-yellow-400', 'text-pink-400', 'text-gray-400', 'text-green-400', 'text-orange-400', 'text-indigo-400', 'text-blue-400', 'text-teal-400', 'text-purple-400', 'text-red-400', 'text-cyan-400'];

  const steps = [
    {
      title: "Selamat Datang di",
      subtitle: "KidCoder Club! 🎉",
      description: "Tempat seru belajar coding untuk anak-anak!",
      icon: <Code className="w-16 h-16 text-purple-500" />,
      bgColor: "from-purple-400 to-pink-500"
    },
    {
      title: "      Belajar Sambil       Bermain!",
      titleEmoji: "🎮",
      subtitle: "Scratch • Minecraft • Python",
      description: "Coding jadi mudah dan menyenangkan!",
      icon: <Play className="w-16 h-16 text-blue-500" />,
      bgColor: "from-blue-400 to-cyan-500"
    },
    {
      title: "Bergabung dengan       500+ Anak!",
      titleEmoji: "👫",
      subtitle: "Komunitas Coding Terbesar",
      description: "Buat teman baru dan belajar bersama!",
      icon: <Heart className="w-16 h-16 text-red-500" />,
      bgColor: "from-red-400 to-pink-500"
    }
  ];

  useEffect(() => {
    playWelcomeSound();
    
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          setTimeout(() => {
            setShowAnimation(false);
            onComplete();
          }, 2000);
          return prev;
        }
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [onComplete]);

  type FloatingCharacterProps = {
  character: string;
  delay: number;
  color: string;
};

const FloatingCharacter: React.FC<FloatingCharacterProps> = ({ character, delay, color }) => (
  <motion.div
    initial={{ y: 100, opacity: 0, rotate: -10 }}
    animate={{ 
      y: [0, -20, 0], 
      opacity: 1, 
      rotate: [0, 10, -5, 0],
      scale: [1, 1.1, 1]
    }}
    transition={{ 
      duration: 2, 
      delay,
      repeat: Infinity,
      repeatType: "reverse"
    }}
    className={`text-6xl ${color} absolute`}
    style={{
      left: `${Math.random() * 80 + 10}%`,
      top: `${Math.random() * 60 + 20}%`
    }}
  >
    {character}
  </motion.div>
);


  const SparkleEffect = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ scale: 0, rotate: 0 }}
    animate={{ 
      scale: [0, 1, 0], 
      rotate: [0, 180, 360],
      opacity: [0, 1, 0]
    }}
    transition={{ 
      duration: 2, 
      delay,
      repeat: Infinity,
      repeatType: "loop"
    }}
    className="absolute text-yellow-300 text-2xl"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }}
  >
    ✨
  </motion.div>
);


  if (!showAnimation) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400"
      >
        {/* Floating Characters */}
        {characters.map((character, index) => (
          <FloatingCharacter
            key={index}
            character={character}
            delay={index * 0.5}
            color={colors[index]}
          />
        ))}

        {/* Sparkle Effects */}
        {[...Array(8)].map((_, index) => (
          <SparkleEffect key={index} delay={index * 0.3} />
        ))}

        {/* Main Content */}
        <div className="font-baloo text-center z-10 max-w-2xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ y: 50, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl"
              onAnimationComplete={() => {
                if (currentStep === 0) {
                  setTimeout(playWelcomeSound, 200);
                }
              }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="mb-6"
              >
                {steps[currentStep].icon}
              </motion.div>

              <motion.h1
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.4,
                      ease: "easeOut",
                      staggerChildren: 0.05,
                    },
                  },
                }}
                initial="hidden"
                animate="visible"
                className="text-4xl lg:text-6xl font-bold text-white mb-4"
              >
                {steps[currentStep].title.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { type: 'spring', stiffness: 300, damping: 24 },
                      },
                    }}
                    style={{ display: 'inline-block', whiteSpace: 'pre' }}
                  >
                    {char}
                  </motion.span>
                ))}
                {steps[currentStep].titleEmoji && (
                  <motion.span
                    className="ml-2"
                    style={{ display: 'inline-block'}}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    {steps[currentStep].titleEmoji}
                  </motion.span>
                )}
              </motion.h1>

              <motion.h2
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl lg:text-3xl font-bold text-yellow-300 mb-4"
              >
                {steps[currentStep].subtitle}
              </motion.h2>

              <motion.p
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-white/90 mb-8"
              >
                {steps[currentStep].description}
              </motion.p>

              {/* Progress Dots */}
              <div className="flex justify-center space-x-2">
                {steps.map((_, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      scale: index === currentStep ? 1.5 : 1,
                      opacity: index === currentStep ? 1 : 0.5
                    }}
                    className={`w-3 h-3 rounded-full ${
                      index === currentStep ? 'bg-yellow-300' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Skip Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => {
              setShowAnimation(false);
              onComplete();
            }}
            className="mt-6 text-white/80 hover:text-white transition-colors underline"
          >
            Lewati Animasi
          </motion.button>
        </div>

        {/* Loading Animation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <Star className="w-8 h-8 text-yellow-300" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomeAnimation;

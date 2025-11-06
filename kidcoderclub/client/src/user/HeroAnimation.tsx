import React from 'react';
import { motion } from 'framer-motion';

const characters = ['💻', '🚀', '💡', '🐍', '🎮', '🌐', '👨‍💻', '👩‍💻', '🤖', '🦊', '⭐', '🏆'];
const colors = ['text-yellow-300', 'text-pink-400', 'text-gray-200', 'text-green-300', 'text-orange-300', 'text-indigo-300', 'text-blue-300', 'text-teal-300', 'text-purple-400', 'text-red-400', 'text-yellow-200', 'text-cyan-300'];

const FloatingCharacter: React.FC<{ character: string; delay: number; color: string; }> = ({ character, delay, color }) => {
  // Increased travel distance for wider movement
  const xDist = Math.random() * 200 - 100; // Moves between -100px and +100px
  const yDist = Math.random() * 200 - 100; // Moves between -100px and +100px

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: [0, 0.7, 0], // Fade in and out
        scale: 1.1,
        x: [0, xDist, -xDist, 0],
        y: [0, yDist, -yDist, 0],
        rotate: [0, Math.random() * 60 - 30, Math.random() * 60 - 30, 0],
      }}
      transition={{
        duration: Math.random() * 10 + 10, // Random duration between 10 and 20 seconds
        delay,
        repeat: Infinity,
        repeatType: "loop", // Loop for continuous movement
        ease: "easeInOut"
      }}
      className={`text-5xl ${color} absolute`}
      style={{
        // Wider initial position range
        left: `${Math.random() * 95}%`,
        top: `${Math.random() * 95}%`,
      }}
    >
      {character}
    </motion.div>
  );
};

const SparkleEffect: React.FC<{ delay: number }> = ({ delay }) => (
  <motion.div
    initial={{ scale: 0, rotate: 0 }}
    animate={{ 
      scale: [0, 1, 0], 
      rotate: [0, 180, 360],
      opacity: [0, 1, 0]
    }}
    transition={{ 
      duration: 3, 
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

const HeroAnimation = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {characters.map((character, index) => (
        <FloatingCharacter
          key={index}
          character={character}
          delay={index * 0.8}
          color={colors[index % colors.length]}
        />
      ))}
      {[...Array(15)].map((_, index) => (
        <SparkleEffect key={index} delay={index * 0.5} />
      ))}
    </div>
  );
};

export default HeroAnimation;

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import bgMusic1 from '../assets/sounds/bg-music.mp3';
import bgMusic2 from '../../public/sounds/bg-music - Copy.mp3'; // Menggunakan path relatif dari root project

const MusicPlayer = () => {
  const playlist = [bgMusic1, bgMusic2]; // Tambahkan semua musik di sini
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const musicPreference = localStorage.getItem('kidcoder-music');
    if (musicPreference === 'enabled') {
      setIsPlaying(true);
    }

    const handleUserInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          localStorage.setItem('kidcoder-music', 'enabled');
        }).catch((e) => {
          console.log('Audio auto-play blocked:', e);
        });
      }
      document.removeEventListener('click', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.src = playlist[currentSongIndex];

      if (isPlaying) {
        audioRef.current.play().catch((e) => {
          console.log('Audio play failed:', e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isMuted, volume, currentSongIndex, playlist]);

  const handleSongEnd = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => {
      const newState = !prev;
      localStorage.setItem('kidcoder-music', newState ? 'enabled' : 'disabled');
      return newState;
    });
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current && !isMuted) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-purple-200">
        <div className="flex items-center space-x-3">
          <button
            onClick={togglePlay}
            className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
              isPlaying
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          <button
            onClick={toggleMute}
            className={`p-2 rounded-full transition-all duration-300 ${
              isMuted
                ? 'bg-red-100 text-red-600'
                : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${volume * 100}%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`,
            }}
          />

          {isPlaying && (
            <div key={currentSongIndex} className="flex space-x-1">
              <div className="w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-pulse" style={{ height: '12px', animationDelay: '0ms' }}></div>
              <div className="w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-pulse" style={{ height: '16px', animationDelay: '150ms' }}></div>
              <div className="w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-pulse" style={{ height: '10px', animationDelay: '300ms' }}></div>
            </div>
          )}
        </div>

        {isPlaying && (
          <div className="mt-2 text-center">
            <p className="text-xs text-gray-600 font-medium">🎵 Happy Coding Music</p>
          </div>
        )}
      </div>

      {/* Audio element */}
      <audio ref={audioRef} onEnded={handleSongEnd} preload="auto">
        <source src={playlist[currentSongIndex]} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Inline CSS slider thumb custom */}
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;

import React, { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { Shield, GraduationCap, Presentation, Star, Cloud, Laptop, Code, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AuthPage from './AuthPage';
import UserDashboard from '../dashboard/UserDashboard';

interface AuthFlowProps {
  mode?: 'default' | 'admin';
}

const AuthFlow: React.FC<AuthFlowProps> = ({ mode = 'default' }) => {
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'admin' | 'student' | 'mentor' | null>(null);

  // If user is logged in, handle redirection
  if (user) {
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <UserDashboard />;
  }

  // If a role is selected (either from a card click or if mode is 'admin'), show the auth form
  const roleToShow = mode === 'admin' ? 'admin' : selectedRole;
  if (roleToShow) {
    return <AuthPage role={roleToShow} onBack={() => setSelectedRole(null)} />;
  }

  // Otherwise, show the role selection screen
  return <RoleSelection onSelectRole={setSelectedRole} mode={mode} />;
};

const RoleSelection: React.FC<{ 
  onSelectRole: (role: 'admin' | 'student' | 'mentor') => void;
  mode: 'default' | 'admin';
}> = ({ onSelectRole, mode }) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const allUserTypes = useMemo(() => [
    {
      id: 'admin',
      title: 'Admin',
      subtitle: 'Kelola Platform',
      icon: Shield,
      bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-400 hover:to-purple-500',
      iconColor: 'text-white',
      textColor: 'text-white'
    },
    {
      id: 'student',
      title: 'Murid',
      subtitle: 'Mulai Belajar',
      icon: GraduationCap,
      bgColor: 'bg-gradient-to-br from-pink-400 to-pink-500',
      hoverColor: 'hover:from-pink-300 hover:to-pink-400',
      iconColor: 'text-white',
      textColor: 'text-white'
    },
    {
      id: 'mentor',
      title: 'Mentor',
      subtitle: 'Mengajar Koding',
      icon: Presentation,
      bgColor: 'bg-gradient-to-br from-blue-400 to-blue-500',
      hoverColor: 'hover:from-blue-300 hover:to-blue-400',
      iconColor: 'text-white',
      textColor: 'text-white'
    }
  ], []);

  const userTypes = useMemo(() => {
    if (mode === 'admin') {
      return allUserTypes.filter(type => type.id === 'admin');
    }
    return allUserTypes.filter(type => type.id !== 'admin');
  }, [mode, allUserTypes]);

  const decorativeElements = [
    { Icon: Star, position: 'top-10 left-10', size: 'w-6 h-6', color: 'text-yellow-300', rotation: 'rotate-12' },
    { Icon: Star, position: 'top-20 right-20', size: 'w-4 h-4', color: 'text-pink-300', rotation: '-rotate-12' },
    { Icon: Cloud, position: 'top-32 left-1/4', size: 'w-8 h-8', color: 'text-blue-200', rotation: '' },
    { Icon: Laptop, position: 'bottom-20 left-16', size: 'w-10 h-10', color: 'text-purple-300', rotation: 'rotate-6' },
    { Icon: Code, position: 'bottom-32 right-16', size: 'w-6 h-6', color: 'text-indigo-300', rotation: '-rotate-6' },
    { Icon: Sparkles, position: 'top-1/2 right-10', size: 'w-5 h-5', color: 'text-yellow-200', rotation: 'rotate-45' },
    { Icon: Star, position: 'bottom-1/3 left-8', size: 'w-5 h-5', color: 'text-pink-200', rotation: 'rotate-45' },
    { Icon: Cloud, position: 'top-1/3 right-1/4', size: 'w-6 h-6', color: 'text-blue-100', rotation: '' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 relative overflow-hidden">
      {/* Decorative Elements */}
      {decorativeElements.map((element, index) => {
        const { Icon, position, size, color, rotation } = element;
        return (
          <div key={index} className={`absolute ${position} ${rotation} opacity-60 animate-pulse`}>
            <Icon className={`${size} ${color}`} />
          </div>
        );
      })}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-lg tracking-tight">
            Kid<span className="text-yellow-300">Coder</span>Club
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-bold drop-shadow-md">
            {mode === 'admin' ? 'Portal Administrasi' : '🚀 Belajar Coding Seru! 🌟'}
          </p>
        </div>

        {/* Login Cards */}
        <div className={`grid grid-cols-1 ${userTypes.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-6 md:gap-8 w-full max-w-4xl justify-center`}>
          {userTypes.map((userType) => {
            const Icon = userType.icon;
            const isHovered = hoveredCard === userType.id;
            
            return (
              <div
                key={userType.id}
                className={`
                  ${userType.bgColor} ${userType.hoverColor}
                  rounded-3xl p-8 md:p-10 shadow-2xl transform transition-all duration-300 cursor-pointer
                  ${isHovered ? 'scale-105 shadow-3xl rotate-1' : 'hover:scale-105 hover:shadow-3xl hover:-rotate-1'}
                  border-4 border-white/20
                `}
                onMouseEnter={() => setHoveredCard(userType.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => onSelectRole(userType.id as 'admin' | 'student' | 'mentor')}
              >
                <div className="text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="bg-white/20 rounded-full p-4 backdrop-blur-sm">
                      <Icon className={`w-12 h-12 md:w-16 md:h-16 ${userType.iconColor} drop-shadow-lg`} />
                    </div>
                  </div>
                  <h3 className={`text-2xl md:text-3xl font-black ${userType.textColor} mb-2 drop-shadow-md`}>
                    {userType.title}
                  </h3>
                  <p className={`text-base md:text-lg ${userType.textColor} opacity-90 font-semibold drop-shadow-sm`}>
                    {userType.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AuthFlow;

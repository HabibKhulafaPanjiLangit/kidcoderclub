import React from 'react';
import { Users, GraduationCap, BookOpen, DollarSign, TrendingUp, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

const StatsPage: React.FC = () => {
  const { systemStats, users, certificates, learningMaterials, payments } = useApp();

  const chartData = [
    { month: 'Jan', users: 120, revenue: 8500 },
    { month: 'Feb', users: 180, revenue: 12000 },
    { month: 'Mar', users: 250, revenue: 15500 },
    { month: 'Apr', users: 320, revenue: 18000 },
    { month: 'May', users: 410, revenue: 22000 },
    { month: 'Jun', users: 480, revenue: 25000 },
  ];

  const stats = [
    {
      title: 'Total Users',
      value: systemStats.totalUsers,
      icon: Users,
      color: 'blue',
      change: '+12%',
      isPositive: true
    },
    {
      title: 'Active Mentors',
      value: systemStats.activeMentors,
      icon: GraduationCap,
      color: 'green',
      change: '+8%',
      isPositive: true
    },
    {
      title: 'Learning Materials',
      value: learningMaterials.length,
      icon: BookOpen,
      color: 'purple',
      change: '+15%',
      isPositive: true
    },
    {
      title: 'Monthly Revenue',
      value: `$${systemStats.monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'orange',
      change: '+23%',
      isPositive: true
    },
    {
      title: 'Certificates Issued',
      value: certificates.filter(c => c.status === 'issued').length,
      icon: Award,
      color: 'yellow',
      change: '+18%',
      isPositive: true
    },
    {
      title: 'Completed Courses',
      value: systemStats.completedCourses,
      icon: TrendingUp,
      color: 'indigo',
      change: '+25%',
      isPositive: true
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      yellow: 'bg-yellow-500',
      indigo: 'bg-indigo-500'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">System Data & Statistics</h1>
        <p className="text-gray-600">Comprehensive overview of platform performance</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${getColorClasses(stat.color)} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${
                  stat.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* User Growth Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">User Growth</h3>
          <div className="space-y-4">
            {chartData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{data.month}</span>
                <div className="flex items-center gap-4 flex-1 mx-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(data.users / 500) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 w-12 text-right">{data.users}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue</h3>
          <div className="space-y-4">
            {chartData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{data.month}</span>
                <div className="flex items-center gap-4 flex-1 mx-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(data.revenue / 25000) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 w-16 text-right">${data.revenue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">User Distribution</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Students</span>
              <span className="font-semibold text-blue-600">
                {users.filter(u => u.role === 'student').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Mentors</span>
              <span className="font-semibold text-green-600">
                {users.filter(u => u.role === 'mentor').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Admins</span>
              <span className="font-semibold text-purple-600">
                {users.filter(u => u.role === 'admin').length}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Status */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Completed</span>
              <span className="font-semibold text-green-600">
                {payments.filter(p => p.status === 'completed').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Pending</span>
              <span className="font-semibold text-yellow-600">
                {payments.filter(p => p.status === 'pending').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Failed</span>
              <span className="font-semibold text-red-600">
                {payments.filter(p => p.status === 'failed').length}
              </span>
            </div>
          </div>
        </div>

        {/* Content Stats */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Content Statistics</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Published Materials</span>
              <span className="font-semibold text-green-600">
                {learningMaterials.filter(m => m.status === 'published').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Draft Materials</span>
              <span className="font-semibold text-yellow-600">
                {learningMaterials.filter(m => m.status === 'draft').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Certificates Issued</span>
              <span className="font-semibold text-blue-600">
                {certificates.filter(c => c.status === 'issued').length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
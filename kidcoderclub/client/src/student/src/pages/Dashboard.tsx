import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Award, TrendingUp, MessageSquare, FileText, Users } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    certificates: 0,
    avgProgress: 0,
  });
  const [recentCourses, setRecentCourses] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select('*, courses(*)')
        .eq('student_id', user.id)
        .order('enrolled_at', { ascending: false });

      const { data: certificates } = await supabase
        .from('certificates')
        .select('*')
        .eq('student_id', user.id);

      if (enrollments) {
        const avgProgress =
          enrollments.reduce((sum, e) => sum + (e.progress_percentage || 0), 0) /
          (enrollments.length || 1);

        setStats({
          enrolledCourses: enrollments.length,
          certificates: certificates?.length || 0,
          avgProgress: Math.round(avgProgress),
        });

        setRecentCourses(enrollments.slice(0, 3));
      }
    };

    fetchDashboardData();
  }, [user]);

  const quickLinks = [
    { icon: BookOpen, label: 'My Courses', color: 'blue', description: 'Continue learning' },
    { icon: Award, label: 'Certificates', color: 'yellow', description: 'View achievements' },
    { icon: TrendingUp, label: 'Progress', color: 'green', description: 'Track performance' },
    { icon: MessageSquare, label: 'Testimonials', color: 'purple', description: 'Share feedback' },
    { icon: FileText, label: 'Assignments', color: 'orange', description: 'Submit work' },
    { icon: Users, label: 'Mentors', color: 'pink', description: 'Meet instructors' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
        <p className="text-gray-600 mt-2">Continue your coding journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Enrolled Courses</p>
              <p className="text-4xl font-bold mt-2">{stats.enrolledCourses}</p>
            </div>
            <BookOpen className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Certificates Earned</p>
              <p className="text-4xl font-bold mt-2">{stats.certificates}</p>
            </div>
            <Award className="w-12 h-12 text-yellow-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Average Progress</p>
              <p className="text-4xl font-bold mt-2">{stats.avgProgress}%</p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-200" />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.label}
                className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100"
              >
                <div className={`w-12 h-12 rounded-lg bg-${link.color}-100 flex items-center justify-center mx-auto mb-3`}>
                  <Icon className={`w-6 h-6 text-${link.color}-600`} />
                </div>
                <p className="font-semibold text-gray-900 text-sm">{link.label}</p>
                <p className="text-xs text-gray-500 mt-1">{link.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {recentCourses.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Continue Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentCourses.map((enrollment) => (
              <div key={enrollment.id} className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={enrollment.courses.thumbnail_url || 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600'}
                  alt={enrollment.courses.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">{enrollment.courses.title}</h3>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-blue-600">{enrollment.progress_percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${enrollment.progress_percentage}%` }}
                      />
                    </div>
                  </div>
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Continue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Clock, CheckCircle, FileText, MessageCircle } from 'lucide-react';

export default function Courses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [materials, setMaterials] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [whatsappGroup, setWhatsappGroup] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
    if (user) {
      fetchEnrollments();
    }
  }, [user]);

  useEffect(() => {
    if (selectedCourse) {
      fetchCourseMaterials();
      fetchCourseAssignments();
      fetchWhatsAppGroup();
    }
  }, [selectedCourse]);

  const fetchCourses = async () => {
    const { data } = await supabase
      .from('courses')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    setCourses(data || []);
    setLoading(false);
  };

  const fetchEnrollments = async () => {
    const { data } = await supabase
      .from('enrollments')
      .select('*')
      .eq('student_id', user!.id);

    setEnrollments(data || []);
  };

  const fetchCourseMaterials = async () => {
    const { data } = await supabase
      .from('course_materials')
      .select('*')
      .eq('course_id', selectedCourse.id)
      .order('order_index', { ascending: true });

    setMaterials(data || []);
  };

  const fetchCourseAssignments = async () => {
    const { data } = await supabase
      .from('assignments')
      .select('*')
      .eq('course_id', selectedCourse.id)
      .order('created_at', { ascending: false });

    setAssignments(data || []);
  };

  const fetchWhatsAppGroup = async () => {
    const { data } = await supabase
      .from('whatsapp_groups')
      .select('*')
      .eq('course_id', selectedCourse.id)
      .maybeSingle();

    setWhatsappGroup(data);
  };

  const handleEnroll = async (courseId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase.from('enrollments').insert({
        student_id: user.id,
        course_id: courseId,
        progress_percentage: 0,
      });

      if (!error) {
        fetchEnrollments();
      }
    } catch (err) {
      console.error('Enrollment failed:', err);
    }
  };

  const isEnrolled = (courseId: string) => {
    return enrollments.some((e) => e.course_id === courseId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading courses...</div>
      </div>
    );
  }

  if (selectedCourse) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => setSelectedCourse(null)}
          className="mb-6 text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to Courses
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <img
            src={selectedCourse.thumbnail_url || 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800'}
            alt={selectedCourse.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedCourse.title}</h1>
            <p className="text-gray-600 mb-4">{selectedCourse.description}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                {selectedCourse.category}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                {selectedCourse.level}
              </span>
              <span className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                {selectedCourse.duration_hours} hours
              </span>
            </div>
          </div>
        </div>

        {whatsappGroup && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <div className="flex items-start">
              <MessageCircle className="w-6 h-6 text-green-600 mt-1 mr-3" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Join Community</h3>
                <p className="text-gray-700 mb-4">{whatsappGroup.group_name}</p>
                <a
                  href={whatsappGroup.invite_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Join WhatsApp Group
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Learning Materials</h2>
            {materials.length === 0 ? (
              <p className="text-gray-500">No materials available yet.</p>
            ) : (
              <div className="space-y-4">
                {materials.map((material, index) => (
                  <div key={material.id} className="bg-white rounded-xl shadow border border-gray-100 p-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2">{material.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{material.content}</p>
                        {material.video_url && (
                          <a
                            href={material.video_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            Watch Video →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Assignments</h2>
            {assignments.length === 0 ? (
              <p className="text-gray-500">No assignments available yet.</p>
            ) : (
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="bg-white rounded-xl shadow border border-gray-100 p-4">
                    <div className="flex items-start">
                      <FileText className="w-6 h-6 text-orange-600 mr-3 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2">{assignment.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{assignment.description}</p>
                        {assignment.due_date && (
                          <p className="text-sm text-gray-500">
                            Due: {new Date(assignment.due_date).toLocaleDateString()}
                          </p>
                        )}
                        <button className="mt-3 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">
                          Submit Assignment
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Explore Courses</h1>
        <p className="text-gray-600 mt-2">Learn coding with fun and interactive courses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const enrolled = isEnrolled(course.id);
          return (
            <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
              <img
                src={course.thumbnail_url || 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600'}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {course.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                    course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {course.level}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration_hours}h
                  </span>
                  <span className="text-lg font-bold text-blue-600">
                    Rp {course.price.toLocaleString()}
                  </span>
                </div>
                {enrolled ? (
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    View Course
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnroll(course.id)}
                    className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No courses available at the moment.</p>
        </div>
      )}
    </div>
  );
}

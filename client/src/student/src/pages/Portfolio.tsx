import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { FolderOpen, Plus, X, ExternalLink } from 'lucide-react';

export default function Portfolio() {
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    course_id: '',
    project_url: '',
    image_url: '',
    technologies: '',
  });

  useEffect(() => {
    if (user) {
      fetchPortfolios();
      fetchCourses();
    }
  }, [user]);

  const fetchPortfolios = async () => {
    const { data } = await supabase
      .from('portfolios')
      .select('*, courses(title)')
      .eq('student_id', user!.id)
      .order('created_at', { ascending: false });

    setPortfolios(data || []);
    setLoading(false);
  };

  const fetchCourses = async () => {
    const { data } = await supabase
      .from('enrollments')
      .select('courses(*)')
      .eq('student_id', user!.id);

    setCourses(data?.map((e) => e.courses) || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from('portfolios').insert({
      student_id: user!.id,
      title: formData.title,
      description: formData.description,
      course_id: formData.course_id,
      project_url: formData.project_url || null,
      image_url: formData.image_url || null,
      technologies: formData.technologies.split(',').map((t) => t.trim()).filter(Boolean),
    });

    if (!error) {
      setShowForm(false);
      setFormData({
        title: '',
        description: '',
        course_id: '',
        project_url: '',
        image_url: '',
        technologies: '',
      });
      fetchPortfolios();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this portfolio item?')) {
      await supabase.from('portfolios').delete().eq('id', id);
      fetchPortfolios();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading portfolio...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Portfolio</h1>
          <p className="text-gray-600 mt-2">Showcase your amazing projects</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Project
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">Add New Project</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Related Course
                </label>
                <select
                  required
                  value={formData.course_id}
                  onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project URL
                </label>
                <input
                  type="url"
                  value={formData.project_url}
                  onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="React, TypeScript, Tailwind CSS"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Add Project
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {portfolios.length === 0 ? (
        <div className="text-center py-16">
          <FolderOpen className="w-20 h-20 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Projects Yet</h3>
          <p className="text-gray-600 mb-6">Start building your portfolio by adding your first project</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Add Your First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio) => (
            <div
              key={portfolio.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <img
                src={portfolio.image_url || 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600'}
                alt={portfolio.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{portfolio.title}</h3>
                  {portfolio.project_url && (
                    <a
                      href={portfolio.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{portfolio.description}</p>
                <p className="text-xs text-gray-500 mb-3">Course: {portfolio.courses?.title}</p>
                {portfolio.technologies && portfolio.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {portfolio.technologies.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => handleDelete(portfolio.id)}
                  className="w-full py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

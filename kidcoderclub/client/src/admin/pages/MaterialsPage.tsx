import React, { useState } from 'react';
import { Plus, Search, BookOpen, Video, FileText, HelpCircle, Edit, Trash2, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LearningMaterial } from '../types';

const MaterialsPage: React.FC = () => {
  const { learningMaterials, addLearningMaterial, updateLearningMaterial, deleteLearningMaterial } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<LearningMaterial | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'video' as 'video' | 'document' | 'interactive' | 'quiz',
    category: '',
    difficulty: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    duration: 0,
    status: 'published' as 'published' | 'draft' | 'archived'
  });

  const filteredMaterials = learningMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || material.type === filterType;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'document': return FileText;
      case 'quiz': return HelpCircle;
      default: return BookOpen;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMaterial) {
      updateLearningMaterial(editingMaterial.id, formData);
      setEditingMaterial(null);
    } else {
      addLearningMaterial({
        ...formData,
        createdDate: new Date().toISOString().split('T')[0]
      });
      setShowAddModal(false);
    }
    setFormData({
      title: '',
      description: '',
      type: 'video',
      category: '',
      difficulty: 'beginner',
      duration: 0,
      status: 'published'
    });
  };

  const handleEdit = (material: LearningMaterial) => {
    setEditingMaterial(material);
    setFormData({
      title: material.title,
      description: material.description,
      type: material.type,
      category: material.category,
      difficulty: material.difficulty,
      duration: material.duration,
      status: material.status
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this learning material?')) {
      deleteLearningMaterial(id);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Learning Materials</h1>
        <p className="text-gray-600">Manage educational content and resources</p>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Types</option>
          <option value="video">Videos</option>
          <option value="document">Documents</option>
          <option value="interactive">Interactive</option>
          <option value="quiz">Quizzes</option>
        </select>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Material
        </button>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => {
          const TypeIcon = getTypeIcon(material.type);
          return (
            <div key={material.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    material.type === 'video' ? 'bg-red-100 text-red-600' :
                    material.type === 'document' ? 'bg-blue-100 text-blue-600' :
                    material.type === 'quiz' ? 'bg-purple-100 text-purple-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    <TypeIcon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 line-clamp-2">{material.title}</h3>
                    <p className="text-sm text-gray-600">{material.category}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  material.status === 'published' ? 'bg-green-100 text-green-800' :
                  material.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {material.status.charAt(0).toUpperCase() + material.status.slice(1)}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{material.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Difficulty:</span>
                  <span className={`font-medium capitalize ${
                    material.difficulty === 'beginner' ? 'text-green-600' :
                    material.difficulty === 'intermediate' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {material.difficulty}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium text-gray-800">{material.duration} min</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Created:</span>
                  <span className="font-medium text-gray-800">{material.createdDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                  title="View Material"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => handleEdit(material)}
                  className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(material.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingMaterial) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {editingMaterial ? 'Edit Material' : 'Add New Material'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="video">Video</option>
                    <option value="document">Document</option>
                    <option value="interactive">Interactive</option>
                    <option value="quiz">Quiz</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Programming"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingMaterial(null);
                    setFormData({
                      title: '',
                      description: '',
                      type: 'video',
                      category: '',
                      difficulty: 'beginner',
                      duration: 0,
                      status: 'published'
                    });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingMaterial ? 'Update' : 'Add'} Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialsPage;
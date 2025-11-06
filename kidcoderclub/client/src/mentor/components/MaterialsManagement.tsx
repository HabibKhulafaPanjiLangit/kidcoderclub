import React, { useState } from 'react';
import { Upload, FileText, Video, Image, Download, Edit, Trash2, Plus } from 'lucide-react';

const MaterialsManagement: React.FC = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('all');

  const materials = [
    {
      id: 1,
      title: 'Pengenalan Scratch - Slide Presentasi',
      type: 'presentation',
      course: 'Scratch',
      size: '2.5 MB',
      uploadDate: '2024-01-10',
      downloads: 24,
      icon: FileText
    },
    {
      id: 2,
      title: 'Tutorial Python Dasar - Video',
      type: 'video',
      course: 'Python',
      size: '45.2 MB',
      uploadDate: '2024-01-08',
      downloads: 18,
      icon: Video
    },
    {
      id: 3,
      title: 'Contoh Project Minecraft - Gambar',
      type: 'image',
      course: 'Minecraft',
      size: '1.8 MB',
      uploadDate: '2024-01-05',
      downloads: 32,
      icon: Image
    },
    {
      id: 4,
      title: 'Worksheet UI/UX Design - PDF',
      type: 'document',
      course: 'UI/UX',
      size: '3.1 MB',
      uploadDate: '2024-01-03',
      downloads: 15,
      icon: FileText
    }
  ];

  const courses = ['all', 'Scratch', 'Python', 'Minecraft', 'UI/UX', 'AI'];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-800';
      case 'presentation': return 'bg-blue-100 text-blue-800';
      case 'image': return 'bg-green-100 text-green-800';
      case 'document': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCourseColor = (course: string) => {
    switch (course) {
      case 'Scratch': return 'bg-orange-500';
      case 'Python': return 'bg-blue-500';
      case 'Minecraft': return 'bg-green-500';
      case 'UI/UX': return 'bg-purple-500';
      case 'AI': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredMaterials = selectedCourse === 'all' 
    ? materials 
    : materials.filter(material => material.course === selectedCourse);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Materi Pembelajaran</h2>
            <p className="text-gray-600">Kelola dan upload materi untuk murid Anda</p>
          </div>
          <button
            onClick={() => setShowUploadForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <Upload className="h-4 w-4" />
            <span>Upload Materi</span>
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Filter by Course:</span>
          <div className="flex flex-wrap gap-2">
            {courses.map((course) => (
              <button
                key={course}
                onClick={() => setSelectedCourse(course)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCourse === course
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {course === 'all' ? 'Semua' : course}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Materials Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Materi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Downloads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Upload Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMaterials.map((material) => {
                const IconComponent = material.icon;
                return (
                  <tr key={material.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="bg-gray-100 p-2 rounded-lg mr-3">
                          <IconComponent className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{material.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getCourseColor(material.course)}`}>
                        {material.course}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(material.type)}`}>
                        {material.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {material.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {material.downloads}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(material.uploadDate).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Form Modal */}
      {showUploadForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Materi Baru</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>Scratch</option>
                  <option>Python</option>
                  <option>Minecraft</option>
                  <option>UI/UX</option>
                  <option>AI</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option value="document">Document</option>
                  <option value="presentation">Presentation</option>
                  <option value="video">Video</option>
                  <option value="image">Image</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialsManagement;
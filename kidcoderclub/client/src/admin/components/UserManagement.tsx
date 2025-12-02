export default null;
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, User, Mail, Phone, GraduationCap, BookOpen, Eye } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface RegisteredUser {
  id: string;
  email: string;
  name: string;
  password: string;
  role: 'student' | 'mentor';
  status: 'pending' | 'approved' | 'rejected';
  registeredAt: string;
  parentName?: string;
  parentEmail?: string;
  phone?: string;
  childName?: string;
  childAge?: number | string;
  className?: string;
  mentorName?: string;
  mentorEmail?: string;
  mentorPhone?: string;
  expertise?: string;
  experience?: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<RegisteredUser[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedUser, setSelectedUser] = useState<RegisteredUser | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      if (!supabase) {
        // Fallback to localStorage
        const storedUsers = JSON.parse(localStorage.getItem('kidcoderclub_registered_users') || '[]');
        setUsers(storedUsers);
        return;
      }

      // Load from Supabase
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          students(*),
          mentors(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to match RegisteredUser interface
      const transformedUsers = data.map((user: any) => {
        const baseUser = {
          id: user.id,
          email: user.email,
          name: user.name,
          password: '***', // Don't show password
          role: user.role,
          status: user.status,
          registeredAt: user.created_at,
          phone: user.phone,
        };

        if (user.role === 'student' && user.students && user.students.length > 0) {
          const student = user.students[0];
          return {
            ...baseUser,
            parentName: student.parent_name,
            parentEmail: student.parent_email,
            phone: student.phone,
            childName: student.child_name,
            childAge: student.child_age,
            className: student.class_name,
          };
        } else if (user.role === 'mentor' && user.mentors && user.mentors.length > 0) {
          const mentor = user.mentors[0];
          return {
            ...baseUser,
            mentorName: mentor.mentor_name,
            mentorEmail: mentor.mentor_email,
            mentorPhone: mentor.mentor_phone,
            expertise: mentor.expertise,
            experience: mentor.experience,
          };
        }

        return baseUser;
      });

      setUsers(transformedUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      // Fallback to localStorage on error
      const storedUsers = JSON.parse(localStorage.getItem('kidcoderclub_registered_users') || '[]');
      setUsers(storedUsers);
    }
  };

  const updateUserStatus = async (userId: string, newStatus: 'approved' | 'rejected') => {
    try {
      if (!supabase) {
        // Fallback to localStorage
        const updatedUsers = users.map(user => 
          user.id === userId ? { ...user, status: newStatus } : user
        );
        setUsers(updatedUsers);
        localStorage.setItem('kidcoderclub_registered_users', JSON.stringify(updatedUsers));
        setSelectedUser(null);
        return;
      }

      // Update in Supabase
      const { error } = await supabase
        .from('users')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', userId);

      if (error) throw error;

      // Reload users
      await loadUsers();
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Gagal mengupdate status user');
    }
  };

  const filteredUsers = users.filter(user => {
    if (filter === 'all') return true;
    return user.status === filter;
  });

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-300', icon: Clock, text: 'Menunggu' },
      approved: { color: 'bg-green-100 text-green-800 border-green-300', icon: CheckCircle, text: 'Disetujui' },
      rejected: { color: 'bg-red-100 text-red-800 border-red-300', icon: XCircle, text: 'Ditolak' }
    };
    const badge = badges[status as keyof typeof badges];
    const Icon = badge.icon;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${badge.color}`}>
        <Icon className="w-3 h-3" />
        {badge.text}
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    return role === 'student' ? (
      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
        👨‍🎓 Murid
      </span>
    ) : (
      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-semibold">
        👨‍🏫 Mentor
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manajemen Pendaftaran User</h1>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === f
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {f === 'all' ? 'Semua' : f === 'pending' ? 'Menunggu' : f === 'approved' ? 'Disetujui' : 'Ditolak'}
            <span className="ml-2 bg-white bg-opacity-30 px-2 py-0.5 rounded-full text-xs">
              {f === 'all' ? users.length : users.filter(u => u.status === f).length}
            </span>
          </button>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nama</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tanggal</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    Tidak ada data user
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-mono text-gray-600">{user.id}</td>
                    <td className="px-4 py-3 text-sm font-semibold">{user.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                    <td className="px-4 py-3">{getRoleBadge(user.role)}</td>
                    <td className="px-4 py-3">{getStatusBadge(user.status)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(user.registeredAt).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                          title="Lihat Detail"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {user.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateUserStatus(user.id, 'approved')}
                              className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                              title="Setujui"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateUserStatus(user.id, 'rejected')}
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                              title="Tolak"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">Detail Pendaftaran</h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {getRoleBadge(selectedUser.role)}
                  {getStatusBadge(selectedUser.status)}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">ID Pendaftaran</p>
                    <p className="font-mono font-semibold">{selectedUser.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tanggal Daftar</p>
                    <p className="font-semibold">{new Date(selectedUser.registeredAt).toLocaleString('id-ID')}</p>
                  </div>
                </div>

                <hr />

                {selectedUser.role === 'student' ? (
                  <div className="space-y-3">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <User className="w-5 h-5" /> Data Murid
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Nama Anak</p>
                        <p className="font-semibold">{selectedUser.childName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Usia</p>
                        <p className="font-semibold">{selectedUser.childAge} tahun</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Kelas</p>
                        <p className="font-semibold">{selectedUser.className}</p>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg flex items-center gap-2 mt-4">
                      <User className="w-5 h-5" /> Data Orang Tua
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Nama Orang Tua</p>
                        <p className="font-semibold">{selectedUser.parentName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Mail className="w-4 h-4" /> Email
                        </p>
                        <p className="font-semibold">{selectedUser.parentEmail}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Phone className="w-4 h-4" /> No. HP
                        </p>
                        <p className="font-semibold">{selectedUser.phone}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" /> Data Mentor
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Nama Lengkap</p>
                        <p className="font-semibold">{selectedUser.mentorName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Mail className="w-4 h-4" /> Email
                        </p>
                        <p className="font-semibold">{selectedUser.mentorEmail}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Phone className="w-4 h-4" /> No. HP
                        </p>
                        <p className="font-semibold">{selectedUser.mentorPhone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <BookOpen className="w-4 h-4" /> Keahlian
                        </p>
                        <p className="font-semibold">{selectedUser.expertise}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-600">Pengalaman Mengajar</p>
                        <p className="font-semibold">{selectedUser.experience}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedUser.status === 'pending' && (
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => updateUserStatus(selectedUser.id, 'approved')}
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Setujui Pendaftaran
                    </button>
                    <button
                      onClick={() => updateUserStatus(selectedUser.id, 'rejected')}
                      className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      Tolak Pendaftaran
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;

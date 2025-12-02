import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Search, UserCheck, Eye, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'student' | 'mentor';
  status: string;
  phone: string | null;
  created_at: string;
}

interface Student {
  id: string;
  parent_name: string;
  parent_email: string;
  phone: string;
  child_name: string;
  child_age: number;
  class_name: string;
}

interface UserWithDetails extends User {
  student?: Student;
}

const UsersPageSupabase: React.FC = () => {
  const { user, isLoading: loadingAuth } = useAuth();
  const [dbUser, setDbUser] = useState<User | null>(null);
  const [checkingDbUser, setCheckingDbUser] = useState(false);

  // Debug: log user dan metadata
  console.log('Auth user:', user);

  useEffect(() => {
    // Coba ambil user dari localStorage jika user null
    if (!user && !checkingDbUser) {
      setCheckingDbUser(true);
      const savedUser = localStorage.getItem('kidcoderclub_user');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          if (parsedUser && parsedUser.role === 'admin') {
            setDbUser(parsedUser);
            setCheckingDbUser(false);
            return;
          }
        } catch (e) {
          localStorage.removeItem('kidcoderclub_user');
        }
      }
      // Fallback: cek lastAdminEmail
      const email = localStorage.getItem('lastAdminEmail');
      if (email) {
        supabase
          .from('users')
          .select('*')
          .eq('email', email)
          .single()
          .then(({ data }) => {
            if (data && typeof data.role === 'string' && data.role.toLowerCase() === 'admin') {
              setDbUser({ ...data, role: 'admin' });
            }
            setCheckingDbUser(false);
          });
      } else {
        setCheckingDbUser(false);
      }
    } else if (user && user.role === 'admin') {
      setDbUser(user);
    }
  }, [user, checkingDbUser]);

  // Jika masih loading auth, tampilkan loading
  if (loadingAuth || checkingDbUser) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>;
  }

  // Debug log user
  console.log('Auth user:', user);
  // Jika belum login atau bukan admin, cek fallback dbUser
  const isAdmin = (user && user.role === 'admin') || (dbUser && dbUser.role === 'admin');
  if (!isAdmin || (!user && !dbUser)) {
    return <div className="p-8 text-center text-red-500">Akses ditolak: User admin tidak ditemukan atau data tidak valid. Silakan login ulang.</div>;
  }

  const [users, setUsers] = useState<UserWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<UserWithDetails | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState<UserWithDetails | null>(null);
  const [addForm, setAddForm] = useState({
    name: '',
    email: '',
    role: 'student',
    status: 'pending',
    phone: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Fetch users with their student details
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select(`*, students(*)`)
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;

      // Transform data
      const transformedUsers: UserWithDetails[] = (usersData || []).map((user: any) => ({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
        phone: user.phone,
        created_at: user.created_at,
        student: user.students?.[0] || undefined
      }));

      setUsers(transformedUsers);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      alert('Failed to fetch users: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId: string) => {
    if (!confirm('Are you sure you want to APPROVE this registration?')) return;

    try {
      const { error } = await supabase
        .from('users')
        .update({ status: 'approved' })
        .eq('id', userId);

      if (error) throw error;

      alert('User approved successfully!');
      fetchUsers(); // Refresh list
    } catch (error: any) {
      console.error('Error approving user:', error);
      alert('Failed to approve user: ' + error.message);
    }
  };

  const handleReject = async (userId: string) => {
      const handleDelete = async (userId: string) => {
        if (!confirm('Are you sure you want to DELETE this user?')) return;
        try {
          const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', userId);
          if (error) throw error;
          alert('User deleted successfully!');
          fetchUsers();
        } catch (error: any) {
          console.error('Error deleting user:', error);
          alert('Failed to delete user: ' + error.message);
        }
      };

      const handleEdit = (user: UserWithDetails) => {
        setEditForm(user);
        setShowEditModal(true);
      };

      const handleEditSubmit = async () => {
        if (!editForm) return;
        try {
          const { error } = await supabase
            .from('users')
            .update({
              name: editForm.name,
              email: editForm.email,
              role: editForm.role,
              status: editForm.status,
              phone: editForm.phone,
            })
            .eq('id', editForm.id);
          if (error) throw error;
          alert('User updated successfully!');
          setShowEditModal(false);
          fetchUsers();
        } catch (error: any) {
          alert('Failed to update user: ' + error.message);
        }
      };

      const handleAddSubmit = async () => {
        try {
          const { error } = await supabase
            .from('users')
            .insert([{ ...addForm }]);
          if (error) throw error;
          alert('User added successfully!');
          setShowAddModal(false);
          setAddForm({ name: '', email: '', role: 'student', status: 'pending', phone: '' });
          fetchUsers();
        } catch (error: any) {
          alert('Failed to add user: ' + error.message);
        }
      };
    if (!confirm('Are you sure you want to REJECT this registration?')) return;

    try {
      const { error } = await supabase
        .from('users')
        .update({ status: 'rejected' })
        .eq('id', userId);

      if (error) throw error;

      alert('User rejected successfully!');
      fetchUsers(); // Refresh list
    } catch (error: any) {
      console.error('Error rejecting user:', error);
      alert('Failed to reject user: ' + error.message);
    }
  };

  const filteredUsers: UserWithDetails[] = users.filter((user: UserWithDetails) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.student?.child_name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = users.filter(u => u.status === 'pending').length;
  const approvedCount = users.filter(u => u.status === 'approved').length;
  const rejectedCount = users.filter(u => u.status === 'rejected').length;

  return (
    {/* Pastikan user/dbUser valid sebelum render */}
    {(user || dbUser) ? (
      <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">User Registrations</h1>
        <p className="text-gray-600">Review and approve/reject user registrations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">{users.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Add User */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, email, or child name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <button
          onClick={fetchUsers}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          + Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
            Loading users...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No users found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">User Info</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Student Info</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Registered</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'mentor' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.student ? (
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">{user.student.child_name}</p>
                          <p className="text-gray-500">{user.student.child_age} years • {user.student.class_name}</p>
                          <p className="text-gray-500">{user.student.parent_name}</p>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        user.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(user.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(user)}
                          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                          title="Edit User"
                        >
                          ✎
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete User"
                        >
                          🗑️
                        </button>
                        {user.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(user.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleReject(user.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Reject"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <form onSubmit={e => { e.preventDefault(); handleAddSubmit(); }} className="space-y-4">
              <input type="text" placeholder="Name" value={addForm.name} onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))} className="w-full border px-3 py-2 rounded" required />
              <input type="email" placeholder="Email" value={addForm.email} onChange={e => setAddForm(f => ({ ...f, email: e.target.value }))} className="w-full border px-3 py-2 rounded" required />
              <input type="text" placeholder="Phone" value={addForm.phone} onChange={e => setAddForm(f => ({ ...f, phone: e.target.value }))} className="w-full border px-3 py-2 rounded" />
              <select value={addForm.role} onChange={e => setAddForm(f => ({ ...f, role: e.target.value }))} className="w-full border px-3 py-2 rounded">
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
                <option value="admin">Admin</option>
              </select>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Add User</button>
              <button type="button" onClick={() => setShowAddModal(false)} className="w-full border py-2 rounded mt-2">Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && editForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowEditModal(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form onSubmit={e => { e.preventDefault(); handleEditSubmit(); }} className="space-y-4">
              <input type="text" placeholder="Name" value={editForm.name} onChange={e => setEditForm(f => f ? { ...f, name: e.target.value } : f)} className="w-full border px-3 py-2 rounded" required />
              <input type="email" placeholder="Email" value={editForm.email} onChange={e => setEditForm(f => f ? { ...f, email: e.target.value } : f)} className="w-full border px-3 py-2 rounded" required />
              <input type="text" placeholder="Phone" value={editForm.phone || ''} onChange={e => setEditForm(f => f ? { ...f, phone: e.target.value } : f)} className="w-full border px-3 py-2 rounded" />
              <select value={editForm.role} onChange={e => setEditForm(f => f ? { ...f, role: e.target.value } : f)} className="w-full border px-3 py-2 rounded">
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
                <option value="admin">Admin</option>
              </select>
              <select value={editForm.status} onChange={e => setEditForm(f => f ? { ...f, status: e.target.value } : f)} className="w-full border px-3 py-2 rounded">
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <button type="submit" className="w-full bg-yellow-600 text-white py-2 rounded">Save Changes</button>
              <button type="button" onClick={() => setShowEditModal(false)} className="w-full border py-2 rounded mt-2">Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedUser(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">User Details</h2>
            <div className="space-y-6">
              {/* User Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">User Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{selectedUser.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{selectedUser.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Role:</span>
                    <span className="font-medium capitalize">{selectedUser.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium capitalize ${
                      selectedUser.status === 'approved' ? 'text-green-600' :
                      selectedUser.status === 'pending' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {selectedUser.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Registration Date:</span>
                    <span className="font-medium">
                      {new Date(selectedUser.created_at).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Student Info */}
              {selectedUser.student && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Student Information</h3>
                  <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Child Name:</span>
                      <span className="font-medium">{selectedUser.student.child_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Age:</span>
                      <span className="font-medium">{selectedUser.student.child_age} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Class:</span>
                      <span className="font-medium">{selectedUser.student.class_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Parent Name:</span>
                      <span className="font-medium">{selectedUser.student.parent_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Parent Email:</span>
                      <span className="font-medium">{selectedUser.student.parent_email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{selectedUser.student.phone}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              {selectedUser.status === 'pending' && (
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      handleReject(selectedUser.id);
                      setSelectedUser(null);
                    }}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      handleApprove(selectedUser.id);
                      setSelectedUser(null);
                    }}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Approve
                  </button>
                </div>
              )}

              <button
                onClick={() => setSelectedUser(null)}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    ) : (
      <div className="p-8 text-center text-red-500">Akses ditolak: Data user tidak valid. Silakan login ulang.</div>
    )}
  );
};

export default UsersPageSupabase;

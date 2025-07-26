import React, { useState, useEffect, useCallback } from 'react';
import { Users, Search, Edit3, Save, X, UserPlus } from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState('');

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/admin/users?page=${currentPage}&limit=10`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
        setTotalPages(data.pagination.pages);
        console.log('Fetched users:', data.users);
      } else {
        console.error('Failed to fetch users:', response.status, response.statusText);
        // Demo data for when API is not working
        setUsers([
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'customer', created_at: '2024-01-15', is_recent: true },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'customer', created_at: '2024-01-10', is_recent: true },
          { id: 3, name: 'Mike Wilson', email: 'mike@example.com', role: 'customer', created_at: '2024-01-05', is_recent: false }
        ]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      // Demo data for development
      setUsers([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'customer', created_at: '2024-01-15', is_recent: true },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'customer', created_at: '2024-01-10', is_recent: true },
        { id: 3, name: 'Mike Wilson', email: 'mike@example.com', role: 'customer', created_at: '2024-01-05', is_recent: false }
      ]);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const updateUserName = async (userId, newName) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/name`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newName })
      });

      if (response.ok) {
        alert('Customer name updated successfully!');
        fetchUsers(); // Refresh the list
        setEditingUser(null);
        setEditName('');
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error updating user name:', error);
      alert('Network error. Please try again.');
    }
  };

  const startEditing = (user) => {
    setEditingUser(user.id);
    setEditName(user.name);
  };

  const cancelEditing = () => {
    setEditingUser(null);
    setEditName('');
  };

  const saveEdit = (userId) => {
    if (editName.trim().length === 0) {
      alert('Name cannot be empty');
      return;
    }
    updateUserName(userId, editName.trim());
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#ECFAE5] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#B0DB9C] mx-auto mb-4"></div>
          <p className="text-[#0A400C] font-semibold">Loading Users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECFAE5] to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#0A400C] to-[#2D5A2F] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-[#B0DB9C] p-3 rounded-full">
                <Users className="h-8 w-8 text-[#0A400C]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Customer Management</h1>
                <p className="text-[#B0DB9C]">Manage customer accounts and information</p>
              </div>
            </div>
            
            <button className="bg-[#B0DB9C] text-[#0A400C] px-6 py-3 rounded-xl font-semibold hover:bg-white transition-colors flex items-center space-x-2">
              <UserPlus className="h-5 w-5" />
              <span>Add User</span>
            </button>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#B0DB9C]/20 mb-8">
            <div className="flex justify-between items-center">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B0DB9C] focus:border-transparent"
                />
              </div>

              {/* Stats */}
              <div className="text-sm text-gray-600">
                <span className="font-medium">{filteredUsers.length}</span> customers found
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Users Table */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg border-2 border-[#B0DB9C]/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#ECFAE5]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#0A400C]">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#0A400C]">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#0A400C]">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#0A400C]">Joined</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#0A400C]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="group hover:bg-[#ECFAE5]/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="bg-[#B0DB9C] p-2 rounded-full">
                            <Users className="h-5 w-5 text-[#0A400C]" />
                          </div>
                          <div>
                            {editingUser === user.id ? (
                              <div className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  className="font-semibold text-[#0A400C] border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#B0DB9C]"
                                  onKeyPress={(e) => e.key === 'Enter' && saveEdit(user.id)}
                                  autoFocus
                                />
                                <button
                                  onClick={() => saveEdit(user.id)}
                                  className="text-green-600 hover:text-green-800"
                                  title="Save"
                                >
                                  <Save className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={cancelEditing}
                                  className="text-red-600 hover:text-red-800"
                                  title="Cancel"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <p className="font-semibold text-[#0A400C]">{user.name}</p>
                                <button
                                  onClick={() => startEditing(user)}
                                  className="text-gray-400 hover:text-[#B0DB9C] opacity-0 group-hover:opacity-100 transition-opacity"
                                  title="Edit name"
                                >
                                  <Edit3 className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                            {user.is_recent && (
                              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1">
                                New Customer
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <Users className="h-4 w-4 mr-1" />
                          Customer
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500 text-sm">Active Customer</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-[#ECFAE5] px-6 py-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-[#B0DB9C] hover:text-[#0A400C] transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-[#B0DB9C] hover:text-[#0A400C] transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminUsers;

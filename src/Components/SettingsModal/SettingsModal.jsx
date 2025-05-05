import React, { useState, useEffect } from 'react';
import { IoIosClose } from "react-icons/io";
import "../SettingsModal/SettingsModal.css";

function SettingsModal({ isOpen, onClose, content }) {
  const [users, setUsers] = useState([
    { id: 1, username: 'admin1', email: 'admin1@example.com', password: '********', role: 'Admin' },
    { id: 2, username: 'user1', email: 'user1@example.com', password: '********', role: 'User' },
    { id: 3, username: 'user2', email: 'user2@example.com', password: '********', role: 'User' },
    { id: 4, username: 'manager1', email: 'manager1@example.com', password: '********', role: 'Manager' }
  ]);

  const [showPassword, setShowPassword] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'add', 'edit'
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'User'
  });

  // Toggle password visibility for a specific user
  const togglePasswordVisibility = (userId) => {
    setShowPassword(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add a new user
  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      ...formData
    };
    setUsers([...users, newUser]);
    setViewMode('list');
    setFormData({
      username: '',
      email: '',
      password: '',
      role: 'User'
    });
  };

  // Edit existing user
  const handleEditUser = () => {
    if (!selectedUser) return;
    
    const updatedUsers = users.map(user => 
      user.id === selectedUser.id ? { ...user, ...formData } : user
    );
    
    setUsers(updatedUsers);
    setViewMode('list');
    setSelectedUser(null);
    setFormData({
      username: '',
      email: '',
      password: '',
      role: 'User'
    });
  };

  // Delete a user
  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  // Set up edit mode
  const startEditUser = (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role
    });
    setViewMode('edit');
  };

  if (!isOpen) return null;

  return (
    <div className="settings-modal active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>
            {content === "user" && "Kullanıcı Ayarları"}
            {content === "system" && "Sistem Ayarları"}
            {content === "other" && "Diğer Ayarlar"}
          </h3>
          <button className="close-modal" onClick={onClose}>
            <IoIosClose />
          </button>
        </div>
        <div className="modal-body">
          <div className="settings-menu">
            {content === "user" && viewMode === 'list' && (
              <>
                <div className="user-actions">
                  <button onClick={() => setViewMode('add')}>Add User</button>
                </div>
                <div className="user-table-container">
                  <table className="user-table">
                    <thead>
                      <tr>
                        <th>Username</th>
                      
                        <th>Pasword</th>
                        <th>Role</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.id}>
                          <td>{user.username}</td>
                          
                          <td className="password-cell">
                            {showPassword[user.id] ? user.password : '********'}
                            <button 
                              className="toggle-password" 
                              onClick={() => togglePasswordVisibility(user.id)}
                            >
                              {showPassword[user.id] ? 'Gizle' : 'Göster'}
                            </button>
                          </td>
                          <td>{user.role}</td>
                          <td className="action-buttons">
                            <button onClick={() => startEditUser(user)}>Edit</button>
                            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {content === "user" && viewMode === 'add' && (
              <div className="user-form">
                <h4>Add New User</h4>
                <div className="form-group">
                  <label>Username:</label>
                  <input 
                    type="text" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="form-group">
                  <label>Password:</label>
                  <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="form-group">
                  <label>Role:</label>
                  <select 
                    name="role" 
                    value={formData.role} 
                    onChange={handleInputChange}
                  >
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
                <div className="form-buttons">
                  <button onClick={handleAddUser}>Kaydet</button>
                  <button onClick={() => setViewMode('list')}>İptal</button>
                </div>
              </div>
            )}

            {content === "user" && viewMode === 'edit' && (
              <div className="user-form">
                <h4>Edit User</h4>
                <div className="form-group">
                  <label>Username:</label>
                  <input 
                    type="text" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleInputChange} 
                  />
                </div>
               
                <div className="form-group">
                  <label>Password:</label>
                  <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="form-group">
                  <label>Role:</label>
                  <select 
                    name="role" 
                    value={formData.role} 
                    onChange={handleInputChange}
                  >
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </select>
                </div>
                <div className="form-buttons">
                  <button onClick={handleEditUser}>Update</button>
                  <button onClick={() => setViewMode('list')}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="modal-footer">
          {/* Footer content if needed */}
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
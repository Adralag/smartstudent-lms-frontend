import React, { useState } from 'react';
import './usermanagement.css'; 

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock User Data (cite: 115)
  const mockUsers = [
    { id: '22/0008', name: 'Adedoja Daniel A.', role: 'Student', status: 'Active', profile: '22/0008@babcock.edu.ng' },
    { id: '22/0087', name: 'Eze Sandra U.', role: 'Administrator', status: 'Active', profile: 'admin@babcock.edu.ng' },
    { id: '22/0266', name: 'Jackson Ihechukwu', role: 'Lecturer', status: 'Pending', profile: 'jackson@babcock.edu.ng' },
    { id: '22/1050', name: 'New Student J.', role: 'Student', status: 'Active', profile: '22/1050@babcock.edu.ng' },
  ];

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.includes(searchTerm) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (userId, action) => {
    console.log(`${action} action triggered for user: ${userId}`);
    alert(`${action} successful for user ID ${userId}. (FR009)`);
    // In Chapter 4, this would call the API to update the database (cite: 115)
  };

  return (
    <div className="admin-content-module user-management">
      <h2>👤 User Account Management (FR009)</h2>
      
      <div className="controls-bar">
        <input
          type="text"
          placeholder="Search by ID, Name, or Role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="primary-button create-user-button">
          + Add New User
        </button>
      </div>

      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role (cite: 114)</th>
              <th>Status (cite: 115)</th>
              <th>Actions (FR009)</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>
                    <span className={`role-tag tag-${user.role.toLowerCase()}`}>{user.role}</span>
                </td>
                <td>{user.status}</td>
                <td>
                  {user.status === 'Pending' && (
                    <button className="action-btn approve" onClick={() => handleAction(user.id, 'Approve')}>
                      Approve (cite: 115)
                    </button>
                  )}
                  <button className="action-btn edit" onClick={() => handleAction(user.id, 'Edit Profile')}>
                    Edit
                  </button>
                  <button className="action-btn delete" onClick={() => handleAction(user.id, 'Delete')}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
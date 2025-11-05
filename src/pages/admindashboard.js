import React, { useState } from 'react';
import UserManagement from '../components/UserManagement'; // To be created next
import '../styles/dashboard.css'; 

const AdminDashboard = () => {
  const adminName = "Sandra Uchenna"; // Example name from the project
  const [activeModule, setActiveModule] = useState('UserManagement');
  
  const renderModule = () => {
    switch (activeModule) {
      case 'UserManagement':
        return <UserManagement />; // FR009: Create, edit, or delete user accounts
      case 'SystemLogs':
        return <div className="admin-content-module"><h3>System Logs & Monitoring (NFR010)</h3><p>Log major user activities (login, file upload, assignment submission) for monitoring and debugging.</p></div>;
      case 'Security':
        return <div className="admin-content-module"><h3>Security & Access Control (NFR008)</h3><p>Manage role-based privileges and access controls.</p></div>;
      default:
        return <UserManagement />;
    }
  };
  
  return (
    <div className="dashboard-layout">
      
      {/* Sidebar - Role-based menu (cite: 114) */}
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>SmartStudent Admin</h2>
        </div>
        <ul className="sidebar-menu">
          <li className={activeModule === 'UserManagement' ? 'active' : ''} onClick={() => setActiveModule('UserManagement')}>
            👥 User Account Management (FR009)
          </li>
          <li className={activeModule === 'SystemLogs' ? 'active' : ''} onClick={() => setActiveModule('SystemLogs')}>
            📈 System Logs (NFR010)
          </li>
          <li className={activeModule === 'Security' ? 'active' : ''} onClick={() => setActiveModule('Security')}>
            🔒 Security & Access (NFR008)
          </li>
          <li>⚙️ Settings & Configuration</li>
        </ul>
        <button className="logout-button">Logout</button>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        
        <header className="main-header">
          <h1 className="welcome-message">System Administrator Console</h1>
          <div className="user-info">
            Welcome, {adminName} | [Notification Icon] 
          </div>
        </header>

        {renderModule()}
        
      </main>
    </div>
  );
};

export default AdminDashboard;
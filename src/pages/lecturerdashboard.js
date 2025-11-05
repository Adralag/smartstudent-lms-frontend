import React, { useState } from 'react';
import CourseMaterialManager from '../components/coursematerialmanager.js';
import AIAssessmentGenerator from '../components/AIassessmentgenerator.js';
import '../styles/dashboard.css';
import DashboardLayout from '../components/dashboardlayout.js';

const LecturerDashboard = () => {
  const lecturerName = "Jackson Ihechukwu"; // Example name from the project
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const sidebarContent = (
    <ul className="sidebar-menu">
      <li 
        className={activeComponent === 'dashboard' ? 'active' : ''} 
        onClick={() => setActiveComponent('dashboard')}
      >
        🏠 Dashboard
      </li>
      <li 
        className={activeComponent === 'courseManagement' ? 'active' : ''} 
        onClick={() => setActiveComponent('courseManagement')}
      >
        📚 Course Management
      </li>
      <li 
        className={activeComponent === 'assessmentEngine' ? 'active' : ''} 
        onClick={() => setActiveComponent('assessmentEngine')}
      >
        📝 Assessment Engine
      </li>
      <li 
        className={activeComponent === 'gradeAnalytics' ? 'active' : ''} 
        onClick={() => setActiveComponent('gradeAnalytics')}
      >
        📊 Grade Analytics
      </li>
      <li 
        className={activeComponent === 'collaboration' ? 'active' : ''} 
        onClick={() => setActiveComponent('collaboration')}
      >
        💬 Collaboration Tools
      </li>
      <li 
        className={activeComponent === 'profile' ? 'active' : ''} 
        onClick={() => setActiveComponent('profile')}
      >
        👤 Profile & Settings
      </li>
    </ul>
  );

  return (
    <DashboardLayout sidebarContent={sidebarContent} roleName="Lecturer">
      <header className="main-header">
        <h1 className="welcome-message">Welcome, Prof. {lecturerName}!</h1>
        <div className="user-info">[Notification Icon] [Profile Picture]</div>
      </header>

      {activeComponent === 'dashboard' && <div>Dashboard Overview</div>}
      {activeComponent === 'courseManagement' && <CourseMaterialManager />}
      {activeComponent === 'assessmentEngine' && <AIAssessmentGenerator />}
      {activeComponent === 'gradeAnalytics' && <div>Grade Analytics Component</div>}
      {activeComponent === 'collaboration' && <div>Collaboration Tools Component</div>}
      {activeComponent === 'profile' && <div>Profile & Settings Component</div>}
    </DashboardLayout>
  );
};

export default LecturerDashboard;
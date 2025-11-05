import React, { useState } from 'react';
import '../styles/dashboard.css';
import AIStudyRecommender from '../components/AIstudyrecommender.jsx';
import CollaborationHub from '../components/collaborationhub.jsx';
import DashboardLayout from '../components/dashboardlayout.jsx';

const StudentDashboard = () => {
  // Mock User Data
  const studentName = "Daniel Adedoja"; // Example name from the project
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
        className={activeComponent === 'courses' ? 'active' : ''}
        onClick={() => setActiveComponent('courses')}
      >
        📚 My Courses
      </li>
      <li
        className={activeComponent === 'goals' ? 'active' : ''}
        onClick={() => setActiveComponent('goals')}
      >
        🎯 Goal Setting
      </li>
      <li
        className={activeComponent === 'notifications' ? 'active' : ''}
        onClick={() => setActiveComponent('notifications')}
      >
        🔔 Notifications & Reminders
      </li>
      <li
        className={activeComponent === 'aiSupport' ? 'active' : ''}
        onClick={() => setActiveComponent('aiSupport')}
      >
        🤖 AI Learning Support
      </li>
      <li
        className={activeComponent === 'collaboration' ? 'active' : ''}
        onClick={() => setActiveComponent('collaboration')}
      >
        💬 Collaboration Hub
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
    <DashboardLayout sidebarContent={sidebarContent} roleName="Student">
      <header className="main-header">
        <h1 className="welcome-message">Welcome back, {studentName}!</h1>
        <div className="user-info">[Notification Icon] [Profile Picture]</div>
      </header>

      {activeComponent === 'dashboard' && (
        <>
          <section className="dashboard-cards-container">
            <div className="dashboard-card primary-navy">
              <h3>Current Courses</h3>
              <p>6 courses enrolled this semester</p>
              <button>View All</button>
            </div>

            <div className="dashboard-card accent-gold">
              <h3>Grade Progress</h3>
              <p>Current GPA: 4.5/5.0</p>
              <p>Last Quiz Score: 92%</p>
            </div>

            <div className="dashboard-card">
              <h3>AI Study Focus</h3>
              <p>Recommended Topic: Data Structures</p>
              <button onClick={() => setActiveComponent('aiSupport')}>Start Practice</button>
            </div>
          </section>
        </>
      )}

      {activeComponent === 'aiSupport' && (
        <div className="ai-support-section">
          <h2>AI Learning Support</h2>
          <AIStudyRecommender />
        </div>
      )}

      {activeComponent === 'collaboration' && (
        <div className="collaboration-section">
          <h2>Collaboration Hub</h2>
          <CollaborationHub />
        </div>
      )}
    </DashboardLayout>
  );
};

export default StudentDashboard;
import React, { useState } from 'react';
import '../styles/dashboard.css';

const DashboardLayout = ({ children, sidebarContent, roleName }) => {
  // 1. State to manage the mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <div className="dashboard-layout">
      
      {/* Mobile Menu Toggle (Visible only on small screens via CSS) */}
      <button 
        className="mobile-menu-toggle" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-expanded={isMobileMenuOpen}
        aria-label="Toggle navigation menu" // Accessibility: ARIA attribute
      >
        {isMobileMenuOpen ? '✕ Close' : '☰ Menu'}
      </button>

      {/* 2. Sidebar - Dynamically rendered based on mobile state */}
      <nav className={`sidebar ${isMobileMenuOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2>SmartStudent {roleName}</h2>
        </div>
        {sidebarContent} 
        <button className="logout-button">Logout</button>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Header content would typically be here */}
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
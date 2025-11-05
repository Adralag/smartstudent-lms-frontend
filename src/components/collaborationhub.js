import React, { useState } from 'react';
import './collaborationhub.css'; 

const CollaborationHub = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('MyGroups');

  // Mock data for collaboration groups (cite: 509)
  const mockGroups = [
    { id: 1, name: 'Group 74 Project (SmartStudent)', purpose: 'Project', members: 4, course: 'Software Engineering' },
    { id: 2, name: 'DSA Study Group', purpose: 'Study', members: 6, course: 'Data Structures' },
    { id: 3, name: 'Weekend Hangout', purpose: 'Social', members: 10, course: null },
  ];

  const handleJoinMeeting = (groupName) => {
    alert(`Joining Virtual Meeting for: ${groupName}. (Functionality: Virtual Meetings - cite: 62)`);
    // Placeholder for integrating Jitsi/Zoom/Teams links
  };

  const renderGroupList = () => (
    <div className="group-list">
      {mockGroups.map(group => (
        <div key={group.id} className="group-card dashboard-card">
          <div className="group-info">
            <h4>{group.name} ({group.members} members)</h4>
            <p><strong>Purpose:</strong> {group.purpose} | 
               {group.course ? ` Course: ${group.course}` : ' General'}
            </p>
          </div>
          <div className="group-actions">
            <button className="collab-button primary" onClick={() => handleJoinMeeting(group.name)}>
              Join Meeting 📞
            </button>
            <button className="collab-button secondary">
              Chat/Resources 💬 (Resource Sharing - cite: 62)
            </button>
          </div>
        </div>
      ))}
      <button className="create-group-button">
        + Create New Collaboration Group
      </button>
    </div>
  );

  const renderResourceSharing = () => (
    <div className="resource-sharing">
        <h3>Shared Resources (Group 74 Project)</h3>
        <p>A centralized location for integrated file-sharing[cite: 349].</p>
        <ul className="shared-files">
            <li>- Project Proposal V2.pdf</li>
            <li>- Use Case Diagram.png</li>
            <li>- Backend API Documentation.docx</li>
        </ul>
        <button className="collab-button primary">Upload File</button>
    </div>
  );

  return (
    <div className="collaboration-hub">
      <h2>🌐 Collaboration Hub (cite: 62)</h2>
      
      <div className="tab-navigation">
        <button 
          className={activeTab === 'MyGroups' ? 'active' : ''} 
          onClick={() => setActiveTab('MyGroups')}
        >
          My Groups
        </button>
        <button 
          className={activeTab === 'Resources' ? 'active' : ''} 
          onClick={() => setActiveTab('Resources')}
        >
          Resource Sharing (cite: 62)
        </button>
        <button 
          className={activeTab === 'Mentorship' ? 'active' : ''} 
          onClick={() => setActiveTab('Mentorship')}
        >
          Real-time Mentorship (cite: 274)
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'MyGroups' && renderGroupList()}
        {activeTab === 'Resources' && renderResourceSharing()}
        {activeTab === 'Mentorship' && <p>Integrated chat systems for peer-to-peer and lecturer-student mentorship (cite: 315, 274).</p>}
      </div>

    </div>
  );
};

export default CollaborationHub;
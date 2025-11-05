import React, { useState } from 'react';
import './coursematerialmanager.css';

const CourseMaterialManager = () => {
  const [selectedCourse, setSelectedCourse] = useState('Software Engineering');
  const [file, setFile] = useState(null);
  const [topic, setTopic] = useState('');
  
  // Mock data representing existing materials organized by topic
  const mockMaterials = {
    'Software Engineering': [
      { id: 1, name: 'Chapter 1: Introduction to Agile', topic: 'Agile', type: 'PDF' },
      { id: 2, name: 'Lecture Slides: Requirements Elicitation', topic: 'Requirements', type: 'PPT' },
    ],
    'Data Structures': [],
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (file && selectedCourse && topic) {
      console.log(`Uploading file ${file.name} to ${selectedCourse} under topic: ${topic}`);
      // In Chapter 4, this triggers the backend API call to upload and store (cite: 108)
      alert(`Material uploaded successfully for ${selectedCourse}!`);
      setFile(null);
      setTopic('');
    } else {
      alert('Please select a course, a file, and enter a topic.');
    }
  };

  return (
    <div className="material-manager">
      
      <h2>📚 Course Materials & Organization (FR003)</h2>
      
      {/* --- Upload Form Section --- */}
      <section className="upload-section dashboard-card">
        <h3>Upload New Course Material</h3>
        <form onSubmit={handleFileUpload} className="upload-form">
          
          <div className="form-row">
            {/* Course Selection */}
            <div className="form-group-material">
              <label htmlFor="course-select">Select Course:</label>
              <select 
                id="course-select" 
                value={selectedCourse} 
                onChange={(e) => setSelectedCourse(e.target.value)}
                required
              >
                <option value="Software Engineering">Software Engineering</option>
                <option value="Data Structures">Data Structures</option>
                {/* ... other courses managed by the lecturer (cite: 108) */}
              </select>
            </div>
            
            {/* Topic/Module Organization */}
            <div className="form-group-material">
              <label htmlFor="topic-input">Organize by Topic/Module:</label>
              <input
                id="topic-input"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Chapter 5: Testing"
                required
              />
            </div>
          </div>

          {/* File Input */}
          <div className="form-group-material full-width">
            <label htmlFor="file-upload">Choose File:</label>
            <input 
              id="file-upload"
              type="file" 
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>

          <button type="submit" className="upload-button">
            Upload Material (FR003)
          </button>
        </form>
      </section>

      {/* --- Organization/View Section --- */}
      <section className="organization-section">
        <h3>Organized Materials for {selectedCourse}</h3>
        {
          Object.entries(
            mockMaterials[selectedCourse].reduce((acc, item) => {
              (acc[item.topic] = acc[item.topic] || []).push(item);
              return acc;
            }, {})
          ).map(([topic, materials]) => (
            <div key={topic} className="topic-group">
              <h4 className="topic-header">{topic} ({materials.length} files)</h4>
              <ul className="material-list">
                {materials.map(m => (
                  <li key={m.id}>
                    <span>{m.name} ({m.type})</span>
                    <div className="material-actions">
                        <button className="action-button edit">Edit</button>
                        <button className="action-button delete">Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        }
      </section>
      
    </div>
  );
};

export default CourseMaterialManager;
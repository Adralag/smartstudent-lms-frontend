// src/components/AssignmentSubmission.js

import React, { useState } from 'react';
import './assignmentsubmission.css'; 

const AssignmentSubmission = ({ assignmentId, assignmentName, courseName, dueDate }) => {
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to submit.');
      return;
    }
    
    setIsSubmitting(true);
    console.log(`Submitting file: ${file.name} for Assignment ID: ${assignmentId}`);
    
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Assignment "${assignmentName}" submitted successfully! Thank you for meeting the deadline.`);
      setFile(null);
      // Backend action: Store Submission (Raw Text/File) (cite: 479)
    }, 2500);
  };

  return (
    <div className="submission-module dashboard-card">
      <h3>Assignment Submission: {assignmentName}</h3>
      <p className="submission-details">
        **Course:** {courseName} | **Due Date:** {dueDate}
      </p>
      
      <form onSubmit={handleSubmit} className="submission-form">
        <div className="form-group-submission">
          <label htmlFor="assignment-file">Upload Your Submission File:</label>
          <input
            id="assignment-file"
            type="file"
            onChange={handleFileChange}
            disabled={isSubmitting}
            required
          />
        </div>
        
        {file && <p className="file-info">Selected file: **{file.name}**</p>}
        
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Final Submission (FR005)'}
        </button>
      </form>
    </div>
  );
};

export default AssignmentSubmission;
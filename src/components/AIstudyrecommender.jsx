import React from 'react';
import './AIstudyrecommender.css'; 

const AIStudyRecommender = () => {
  // Mock data based on assumed predictive analytics (cite: 145) and performance data (cite: 536)
  const recommendations = [
    { 
      topic: "System Security & Cryptography", 
      reason: "Performance in practice quiz 2 was below average (62%).", 
      action: "Start AI Practice Questions", 
      priority: 'High' 
    },
    { 
      topic: "Database Normalization (3NF)", 
      reason: "Missed 3 conceptual questions in last assignment submission.", 
      action: "Review Material & Re-Quiz", 
      priority: 'Medium' 
    },
    { 
      topic: "Introduction to React Hooks", 
      reason: "High engagement score in related material; suggested advanced reading.", 
      action: "Explore Advanced Reading", 
      priority: 'Low' 
    },
  ];

  return (
    <div className="ai-recommender-section">
      <h2>🤖 Personalized AI Learning Recommendations (FR006)</h2>
      <p className="ai-intro">
        Based on your performance, grade tracking, and course material interaction, SmartStudent provides tailored suggestions to help you focus on weak topics and achieve your personal goals. [cite: 105, 133]
      </p>

      <div className="recommendation-list">
        {recommendations.map((rec, index) => (
          <div key={index} className={`recommendation-card priority-${rec.priority.toLowerCase()}`}>
            <div className="rec-header">
              <span className="rec-topic">{rec.topic}</span>
              <span className={`rec-priority-tag tag-${rec.priority.toLowerCase()}`}>{rec.priority} Priority</span>
            </div>
            <p className="rec-reason">**Reason:** {rec.reason}</p>
            <button className="rec-action-button">
              {rec.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIStudyRecommender;

import React, { useState } from 'react';
import './studentlifemanager.css'; 

const StudentLifeManager = () => {
  const [currentGoal] = useState('Achieve a 4.5 GPA this semester.');
  const [newReminder, setNewReminder] = useState('');

  // Mock Data for Calendar and Reminders (cite: 106)
  const mockEvents = [
    { id: 1, type: 'Academic', name: 'Software Engineering Assignment Due', date: '2025-11-20', priority: 'High' },
    { id: 2, type: 'Personal', name: 'Submit Scholarship Application', date: '2025-11-25', priority: 'High' },
    { id: 3, type: 'Academic', name: 'Data Structures Mid-Term Exam', date: '2025-12-05', priority: 'Critical' },
  ];

  const handleReminderSubmit = (e) => {
    e.preventDefault();
    if (newReminder.trim()) {
      console.log('Adding new reminder:', newReminder);
      alert(`Reminder added: "${newReminder}".`);
      setNewReminder('');
      // In Chapter 4, this would save the reminder to the database for notification (FR008)
    }
  };

  return (
    <div className="life-manager-module">
      <h2>🗓️ Student Life Management (cite: 106)</h2>
      
      {/* 1. Goal Setting Section (cite: 106) */}
      <section className="goal-setting dashboard-card primary-navy">
        <h3>🎯 Personal Goals Tracker</h3>
        <p className="current-goal">{currentGoal}</p>
        <button className="goal-edit-button">Edit Goal</button>
      </section>

      <div className="manager-content-flex">
          
        {/* 2. Reminders & Tasks (cite: 106) */}
        <section className="reminders-section dashboard-card">
          <h3>🔔 Reminders and Task Management</h3>
          <form onSubmit={handleReminderSubmit} className="reminder-form">
            <input
              type="text"
              placeholder="Add a new task or reminder..."
              value={newReminder}
              onChange={(e) => setNewReminder(e.target.value)}
              required
            />
            <button type="submit" className="add-reminder-button">Add</button>
          </form>
          
          <ul className="reminder-list">
            {mockEvents.map(event => (
              <li key={event.id} className={`event-item priority-${event.priority.toLowerCase()}`}>
                <div className="event-details">
                    <span className="event-date">{event.date}</span>
                    <span className="event-name">{event.name}</span>
                </div>
                <span className={`event-tag tag-${event.type.toLowerCase()}`}>{event.type}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 3. Event Calendar Preview (cite: 106) */}
        <section className="calendar-preview dashboard-card">
          <h3>Event Calendar Preview (cite: 106)</h3>
          <p>Upcoming academic and personal milestones.</p>
          <div className="calendar-visual-placeholder">
              
          </div>
          <button className="view-full-calendar-button">View Full Calendar</button>
        </section>

      </div>
    </div>
  );
};

export default StudentLifeManager;
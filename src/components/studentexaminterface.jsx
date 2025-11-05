import React, { useState, useEffect } from 'react';
import './studentexaminterface.css'; 

const StudentExamInterface = ({ assessmentName, courseName, totalTimeMinutes = 60 }) => {
  const [timeLeft, setTimeLeft] = useState(totalTimeMinutes * 60); // Time in seconds
  const [isExamActive, setIsExamActive] = useState(true);
  const [currentAnswers, setCurrentAnswers] = useState({});

  // Mock Assessment Data (Questions from ACAD AI)
  const mockExamQuestions = [
    {
      id: 1,
      text: 'Which UML diagram illustrates the sequence of messages between objects?',
      type: 'mcq',
      options: ['Class Diagram', 'Sequence Diagram', 'Component Diagram'],
      correctAnswer: 'Sequence Diagram', // For self-grading practice/feedback
    },
    {
      id: 2,
      text: 'Define the four phases of the Incremental Development Model (IDM).',
      type: 'theory',
    },
    {
      id: 3,
      text: 'What is the primary benefit of using React.js for the SmartStudent frontend?',
      type: 'mcq',
      options: ['Server-side scripting', 'Component reusability', 'Database management'],
      correctAnswer: 'Component reusability',
    },
  ];

  // Timer Countdown Logic

  const handleSubmission = React.useCallback((isTimedOut = false) => {
    setIsExamActive(false);
    
    console.log('Final Answers:', currentAnswers);
    
    // Logic for Score Computation (cite: 104) and AI Grading (cite: 77, 120)
    alert(isTimedOut ? "Time expired! Your exam has been automatically submitted." : "Exam submitted successfully! Grades pending.");
  }, [currentAnswers]);

  useEffect(() => {
    if (isExamActive && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      handleSubmission(true); // Auto-submit on time expiration
    }
  }, [isExamActive, timeLeft, handleSubmission]);

  const handleAnswerChange = (questionId, value) => {
    setCurrentAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="exam-container">
      
      {/* Fixed Header with Timer */}
      <header className="exam-header">
        <h1>{assessmentName} - {courseName}</h1>
        <div className={`timer ${timeLeft <= 300 ? 'low-time' : ''}`}>
          Time Left: **{formatTime(timeLeft)}**
        </div>
      </header>
      
      {/* Questions Area */}
      <main className="exam-questions-list">
        {!isExamActive && <div className="submission-message">Assessment has been submitted.</div>}
        
        {mockExamQuestions.map((q, index) => (
          <div key={q.id} className="question-item">
            <h4>Question {index + 1}</h4>
            <p className="question-text">{q.text}</p>
            
            {/* MCQ Input */}
            {q.type === 'mcq' && q.options.map((option, optIndex) => (
              <div key={optIndex} className="option-input">
                <input
                  type="radio"
                  id={`q${q.id}-opt${optIndex}`}
                  name={`q${q.id}`}
                  value={option}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  disabled={!isExamActive}
                />
                <label htmlFor={`q${q.id}-opt${optIndex}`}>{option}</label>
              </div>
            ))}

            {/* Theory Input */}
            {q.type === 'theory' && (
              <textarea
                placeholder="Type your answer here..."
                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                disabled={!isExamActive}
              />
            )}
          </div>
        ))}
      </main>
      
      {/* Submission Footer */}
      <footer className="exam-footer">
        <button 
          className="submit-exam-button" 
          onClick={() => handleSubmission(false)} 
          disabled={!isExamActive}
        >
          Finalize Exam Submission
        </button>
      </footer>
    </div>
  );
};

export default StudentExamInterface;
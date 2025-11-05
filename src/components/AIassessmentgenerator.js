import React, { useState } from 'react';
import './AIassessmentgenerator.css'; 

const AIAssessmentGenerator = () => {
  const [course, setCourse] = useState('Software Engineering');
  const [topic, setTopic] = useState('UML Modeling');
  const [difficulty, setDifficulty] = useState('Medium');
  const [count, setCount] = useState(10);
  const [type, setType] = useState('Objective/MCQ');
  const [assessmentName, setAssessmentName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateAssessment = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Requesting AI Question Generation:', { course, topic, difficulty, count, type });
    
    // Step 1 in Sequence Diagram: Create Assessment & Set Parameters (cite: 466)
    // In Chapter 4, this would make an API request to the Application Tier (Server)
    
    setTimeout(() => {
      setIsLoading(false);
      alert(`Request sent! ACAD AI is generating ${count} ${type} questions for ${topic}. Review panel will load shortly.`);
      // Assumed Step 5 in Sequence Diagram: Display Review Questions & Finalize (cite: 472)
    }, 2000);
  };

  return (
    <div className="ai-assessment-manager">
      <h2>🧠 AI-Driven Assessment Engine (FR061, cite: 47)</h2>
      
      <div className="dashboard-card primary-navy">
        <h3>Generate New Quiz or Exam</h3>
        <p>Utilize ACAD AI to automatically generate questions and format assessments, reducing workload. [cite: 44, 136, 162]</p>

        <form onSubmit={handleGenerateAssessment} className="generation-form">
          
          <div className="form-row">
            {/* Assessment Name */}
            <div className="form-group-ai">
              <label htmlFor="assessment-name">Assessment Title:</label>
              <input
                id="assessment-name"
                type="text"
                value={assessmentName}
                onChange={(e) => setAssessmentName(e.target.value)}
                placeholder="e.g., Mid-Term Quiz on Requirements"
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            {/* Course Selection */}
            <div className="form-group-ai">
              <label htmlFor="course-select">Course:</label>
              <select value={course} onChange={(e) => setCourse(e.target.value)}>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Data Structures">Data Structures</option>
              </select>
            </div>
            
            {/* Topic Specification (Based on Course Materials) */}
            <div className="form-group-ai">
              <label htmlFor="topic-input">Target Topic:</label>
              <input
                id="topic-input"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Specify concept, e.g., 'UML Modeling'"
                required
              />
            </div>
          </div>

          <div className="form-row">
            {/* Difficulty Level (cite: 466) */}
            <div className="form-group-ai">
              <label htmlFor="difficulty-select">Difficulty:</label>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            
            {/* Question Type (Objective vs. Theory - cite: 117) */}
            <div className="form-group-ai">
              <label htmlFor="type-select">Question Type:</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="Objective/MCQ">Objective/MCQ</option>
                <option value="Theory/Essay">Theory/Essay (AI support for grading)</option>
                <option value="Fill-in-the-Blank">Fill-in-the-Blank</option>
              </select>
            </div>
            
            {/* Number of Questions */}
            <div className="form-group-ai">
              <label htmlFor="count-input">Question Count:</label>
              <input
                id="count-input"
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                required
              />
            </div>
          </div>
          
          <button type="submit" className="generate-button" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Questions with ACAD AI'}
          </button>
        </form>
      </div>

      <section className="assessment-list">
        <h3>Existing Assessments</h3>
        <p>List of assessments to be managed, edited, or granted access to students. [cite: 109, 119]</p>
        {/* Placeholder for a list of generated assessments */}
      </section>
    </div>
  );
};

export default AIAssessmentGenerator;
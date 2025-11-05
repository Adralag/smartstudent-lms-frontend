import React, { useState } from 'react';
import './AIassessmentreview.css'; 

const AIAssessmentReview = ({ assessmentDetails }) => {
  // Mock data representing questions returned from the ACAD AI Engine (cite: 474)
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: 'Which UML diagram illustrates the sequence of messages between objects?',
      type: 'Objective/MCQ',
      points: 5,
      options: [
        { id: 'a', text: 'Class Diagram', isCorrect: false },
        { id: 'b', text: 'Sequence Diagram', isCorrect: true },
        { id: 'c', text: 'Component Diagram', isCorrect: false },
      ],
      difficulty: 'Medium',
    },
    {
      id: 2,
      text: 'Define the term "Agile Manifesto" and list its four core values.',
      type: 'Theory/Essay',
      points: 10,
      rubric: 'Must mention values: individuals/interactions, working software, customer collaboration, responding to change.',
      difficulty: 'Hard',
    },
  ]);
  
  const [isSaving, setIsSaving] = useState(false);

  // Handler for text and option changes
  const handleQuestionChange = (id, field, value) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  // Handler for MCQ options changes
  const handleOptionChange = (qId, optId, newText, isCorrect) => {
    setQuestions(questions.map(q => 
      q.id === qId ? {
        ...q,
        options: q.options.map(opt => 
          opt.id === optId 
            ? { ...opt, text: newText, isCorrect: isCorrect !== undefined ? isCorrect : opt.isCorrect }
            : (q.type === 'Objective/MCQ' && isCorrect) ? { ...opt, isCorrect: false } : opt // Ensure only one option is correct
        ),
      } : q
    ));
  };

  const handleFinalize = () => {
    setIsSaving(true);
    console.log('Finalizing and storing assessment questions:', questions);
    
    // Sequence Diagram Step 6: Store Final Assessment Questions (cite: 475)
    setTimeout(() => {
      setIsSaving(false);
      alert('Assessment finalized and saved! Ready for publishing.');
      // Logic to redirect back to the Lecturer's Assessment Management view
    }, 2000);
  };

  return (
    <div className="review-module">
      <h2>📝 Review & Edit AI-Generated Assessment</h2>
      <p className="assessment-summary">
        **Assessment:** {assessmentDetails?.name || 'New Quiz'} | **Course:** {assessmentDetails?.course || 'Software Engineering'}
      </p>

      {/* Question List */}
      <div className="question-list-review">
        {questions.map((q, index) => (
          <div key={q.id} className="question-card dashboard-card">
            <header className="question-header">
                <h4>Question {index + 1} ({q.type})</h4>
                <div className="metadata">
                    <label>Points:</label>
                    <input 
                        type="number" 
                        value={q.points} 
                        onChange={(e) => handleQuestionChange(q.id, 'points', parseInt(e.target.value))} 
                        min="1"
                    />
                </div>
            </header>

            {/* Question Text Editor */}
            <textarea
              className="question-text-editor"
              value={q.text}
              onChange={(e) => handleQuestionChange(q.id, 'text', e.target.value)}
              placeholder="Edit the AI-generated question text here."
            />

            {/* Type-Specific Fields: MCQ Options or Theory Rubric */}
            {q.type === 'Objective/MCQ' && (
              <div className="mcq-options">
                {q.options.map(opt => (
                  <div key={opt.id} className="option-row">
                    <input 
                        type="radio" 
                        name={`q-${q.id}-correct`} 
                        checked={opt.isCorrect} 
                        onChange={() => handleOptionChange(q.id, opt.id, opt.text, true)}
                    />
                    <input 
                      type="text"
                      value={opt.text}
                      onChange={(e) => handleOptionChange(q.id, opt.id, e.target.value)}
                    />
                    <span className="correct-label">{opt.isCorrect ? '✅ Correct' : ''}</span>
                  </div>
                ))}
                <button className="add-option-btn">+ Add Option</button>
              </div>
            )}
            
            {q.type === 'Theory/Essay' && (
                <div className="theory-rubric">
                    <label>AI Grading Rubric/Key:</label>
                    <textarea 
                        value={q.rubric}
                        onChange={(e) => handleQuestionChange(q.id, 'rubric', e.target.value)}
                        placeholder="Define key points the AI must look for during automated grading (cite: 76)."
                    />
                </div>
            )}
          </div>
        ))}
      </div>
      
      <button 
        className="finalize-button" 
        onClick={handleFinalize}
        disabled={isSaving}
      >
        {isSaving ? 'Storing Questions...' : 'Finalize Assessment and Publish'}
      </button>
      
    </div>
  );
};

export default AIAssessmentReview;
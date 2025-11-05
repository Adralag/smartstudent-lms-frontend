import React, { useState } from 'react';
import './assignmentgrader.css'; 

const AssignmentGrader = () => {
  // Mock data for submissions
  const [submissions, setSubmissions] = useState([
    { id: 1, studentId: '22/0008', name: 'Adedoja D.', score: null, aiGrade: null, aiComment: null, status: 'Submitted', maxScore: 50 },
    { id: 2, studentId: '22/1050', name: 'New Student J.', score: 45, aiGrade: 45, aiComment: 'Excellent structure and clarity.', status: 'Graded', maxScore: 50 },
    { id: 3, studentId: '22/0087', name: 'Eze S.', score: null, aiGrade: null, aiComment: null, status: 'Submitted', maxScore: 50 },
  ]);

  const handleAIGrade = (submissionId) => {
    const submission = submissions.find(s => s.id === submissionId);
    if (submission.status === 'Graded') return;

    console.log(`Requesting automated grading for submission ID: ${submissionId}`);
    // Sequence Diagram Step 9: Request Automated Grading (cite: 480)
    
    // Simulate AI processing
    const simulatedGrade = Math.floor(Math.random() * submission.maxScore) + 1;
    const simulatedComment = simulatedGrade > 40 ? "AI found the core logic sound; minor formatting issues." : "AI suggests reviewing the data integration section.";

    setTimeout(() => {
      setSubmissions(submissions.map(s => 
        s.id === submissionId ? { ...s, aiGrade: simulatedGrade, aiComment: simulatedComment } : s
      ));
      alert(`AI grading complete for ${submission.name}. Review and finalize score.`);
      // Sequence Diagram Step 10: Returns Automated Grade & Feedback (cite: 481)
    }, 2000);
  };

  const handleFinalizeGrade = (submissionId) => {
    const finalScore = prompt("Enter final score (0-50):");
    if (finalScore !== null) {
      const score = parseInt(finalScore);
      if (score >= 0 && score <= 50) {
        setSubmissions(submissions.map(s => 
          s.id === submissionId ? { ...s, score: score, status: 'Finalized' } : s
        ));
        alert(`Grade finalized! Student ${submissionId} will be notified. (FR008)`);
        // Sequence Diagram Step 11: Store Final Grade & AI Feedback Record (cite: 489)
        // Sequence Diagram Step 13: Notify Lecturer: Grading Complete (cite: 483)
      } else {
        alert("Invalid score entered.");
      }
    }
  };

  return (
    <div className="assignment-grader-module">
      <h2>⭐ Grade Submissions (FR005)</h2>
      [cite_start]<p>Automated marking of objective questions and support for grading theory questions provided by ACAD AI[cite: 111].</p>

      <table className="grading-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Status</th>
            <th>AI Grade ({submissions[0]?.maxScore} max)</th>
            <th>AI Feedback (FR010)</th>
            <th>Final Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td><span className={`status-tag tag-${s.status.toLowerCase()}`}>{s.status}</span></td>
              <td>{s.aiGrade !== null ? `${s.aiGrade}` : 'N/A'}</td>
              <td className="ai-comment-cell">{s.aiComment || 'Pending AI analysis.'}</td>
              <td>{s.score !== null ? s.score : '-'}</td>
              <td>
                <button 
                  className="grade-btn primary" 
                  onClick={() => handleAIGrade(s.id)}
                  disabled={s.aiGrade !== null}
                >
                  {s.aiGrade ? 'AI Done' : 'Run AI Grading'}
                </button>
                <button 
                  className="grade-btn finalize" 
                  onClick={() => handleFinalizeGrade(s.id)}
                  disabled={s.aiGrade === null || s.status === 'Finalized'}
                >
                  Finalize Grade
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentGrader;
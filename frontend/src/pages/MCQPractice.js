import React, { useState, useEffect } from 'react';
import { mcqAPI } from '../services/api';

function MCQPractice() {
  const [mcqs, setMcqs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    loadMCQs();
  }, []);

  const loadMCQs = async () => {
    setLoading(true);
    try {
      const response = await mcqAPI.getRandomMCQs(10);
      setMcqs(response.data);
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setScore({ correct: 0, total: 0 });
    } catch (error) {
      console.error('Error loading MCQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedAnswer) {
      alert('Please select an answer');
      return;
    }

    const currentMCQ = mcqs[currentIndex];
    try {
      const response = await mcqAPI.submitAnswer(currentMCQ.id, selectedAnswer);
      setResult(response.data);
      setShowResult(true);
      
      if (response.data.is_correct) {
        setScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
      } else {
        setScore(prev => ({ ...prev, total: prev.total + 1 }));
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const handleNext = () => {
    if (currentIndex < mcqs.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setResult(null);
    } else {
      alert(`Quiz completed! Score: ${score.correct + (result?.is_correct ? 1 : 0)}/${mcqs.length}`);
      loadMCQs();
    }
  };

  if (loading) return <div className="loading">Loading MCQs...</div>;

  if (mcqs.length === 0) {
    return (
      <div className="card">
        <h2>📝 MCQ Practice</h2>
        <p>No MCQs available. Please run the seed_data.py script first.</p>
      </div>
    );
  }

  const currentMCQ = mcqs[currentIndex];

  return (
    <div>
      <div className="card">
        <h2>📝 MCQ Practice</h2>
        <p>Question {currentIndex + 1} of {mcqs.length} | Score: {score.correct}/{score.total}</p>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentIndex + 1) / mcqs.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="card">
        <h3>{currentMCQ.question}</h3>
        
        <div style={{ marginTop: '1.5rem' }}>
          {['A', 'B', 'C', 'D'].map(option => {
            const optionKey = `option_${option.toLowerCase()}`;
            let className = 'mcq-option';
            
            if (showResult) {
              if (option === result.correct_answer) {
                className += ' correct';
              } else if (option === selectedAnswer) {
                className += ' incorrect';
              }
            } else if (option === selectedAnswer) {
              className += ' selected';
            }
            
            return (
              <div
                key={option}
                className={className}
                onClick={() => !showResult && setSelectedAnswer(option)}
              >
                <strong>{option}.</strong> {currentMCQ[optionKey]}
              </div>
            );
          })}
        </div>

        {showResult && result.explanation && (
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f5f5f5', borderRadius: '5px' }}>
            <strong>Explanation:</strong>
            <p style={{ marginTop: '0.5rem' }}>{result.explanation}</p>
          </div>
        )}

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
          {!showResult ? (
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit Answer
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleNext}>
              {currentIndex < mcqs.length - 1 ? 'Next Question →' : 'Finish Quiz'}
            </button>
          )}
          <button className="btn" style={{ background: '#666', color: 'white' }} onClick={loadMCQs}>
            New Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default MCQPractice;

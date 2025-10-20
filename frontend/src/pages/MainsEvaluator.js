import React, { useState } from 'react';
import { mainsAPI } from '../services/api';

function MainsEvaluator() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);

  const sampleQuestions = [
    "Discuss the significance of Fundamental Rights in Indian Constitution.",
    "Analyze the impact of Green Revolution on Indian agriculture.",
    "What are the challenges faced by India in achieving food security?",
    "Examine the role of civil services in a democracy.",
    "Discuss India's foreign policy towards its neighbors."
  ];

  const handleEvaluate = async () => {
    if (!question.trim() || !answer.trim()) {
      alert('Please enter both question and answer');
      return;
    }

    setLoading(true);
    try {
      const response = await mainsAPI.evaluateAnswer(question, answer);
      setEvaluation(response.data);
    } catch (error) {
      console.error('Error evaluating answer:', error);
      alert('Error evaluating answer. Make sure Ollama is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQuestion('');
    setAnswer('');
    setEvaluation(null);
  };

  return (
    <div>
      <div className="card">
        <h2>✍️ Mains Answer Evaluator</h2>
        <p>Write your answer and get AI-powered feedback</p>
      </div>

      {!evaluation ? (
        <>
          <div className="card">
            <h3>Question</h3>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question or select from samples below..."
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '0.75rem',
                borderRadius: '5px',
                border: '2px solid #ddd',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            />
            
            <div style={{ marginTop: '1rem' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Sample Questions:</p>
              {sampleQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setQuestion(q)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.5rem',
                    margin: '0.25rem 0',
                    background: '#f5f5f5',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <h3>Your Answer</h3>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Write your answer here (150-250 words)..."
              style={{
                width: '100%',
                minHeight: '250px',
                padding: '0.75rem',
                borderRadius: '5px',
                border: '2px solid #ddd',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            />
            <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Word count: {answer.split(/\s+/).filter(w => w.length > 0).length}
            </p>

            <button 
              className="btn btn-primary" 
              onClick={handleEvaluate}
              disabled={loading}
              style={{ marginTop: '1rem' }}
            >
              {loading ? '⏳ Evaluating...' : '🎯 Get Evaluation'}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="card">
            <h3>Evaluation Results</h3>
            
            <div style={{ marginBottom: '2rem' }}>
              <div style={{
                display: 'inline-block',
                padding: '1rem 2rem',
                background: evaluation.score >= 7 ? '#4caf50' : evaluation.score >= 5 ? '#ff9800' : '#f44336',
                color: 'white',
                borderRadius: '10px',
                fontSize: '2rem',
                fontWeight: 'bold'
              }}>
                {evaluation.score}/10
              </div>
            </div>

            <div style={{
              padding: '1.5rem',
              background: '#f5f5f5',
              borderRadius: '5px',
              whiteSpace: 'pre-wrap',
              lineHeight: '1.6'
            }}>
              {evaluation.evaluation}
            </div>

            <button 
              className="btn btn-primary" 
              onClick={handleReset}
              style={{ marginTop: '1rem' }}
            >
              ✍️ Write Another Answer
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MainsEvaluator;

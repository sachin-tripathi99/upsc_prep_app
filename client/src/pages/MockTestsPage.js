import React, { useEffect, useState } from 'react';
import { mockTestsAPI } from '../services/api';
import './MockTestsPage.css';

function MockTestsPage() {
  const [tests, setTests] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [testsRes, resultsRes] = await Promise.all([
        mockTestsAPI.getAll(),
        mockTestsAPI.getResults()
      ]);
      setTests(testsRes.data.data);
      setResults(resultsRes.data.data);
    } catch (error) {
      console.error('Error fetching mock tests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartTest = (testId) => {
    alert(`Test ${testId} would start here. In a full implementation, this would navigate to a test interface.`);
  };

  if (loading) {
    return <div className="loading">Loading mock tests...</div>;
  }

  return (
    <div className="mock-tests-page">
      <div className="page-header">
        <h1>📝 Mock Tests</h1>
        <p className="page-subtitle">Practice Tests to Assess Your Preparation</p>
      </div>

      <div className="tests-section">
        <h2>Available Tests</h2>
        <div className="tests-grid">
          {tests.map((test) => (
            <div key={test.id} className="test-card">
              <div className="test-header">
                <h3>{test.title}</h3>
                <span className={`difficulty-badge ${test.difficulty.toLowerCase()}`}>
                  {test.difficulty}
                </span>
              </div>

              <p className="test-description">{test.description}</p>

              <div className="test-info">
                <div className="info-row">
                  <span className="info-label">Duration:</span>
                  <span className="info-value">{test.duration} minutes</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Questions:</span>
                  <span className="info-value">{test.totalQuestions}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Total Marks:</span>
                  <span className="info-value">{test.totalMarks}</span>
                </div>
              </div>

              <div className="test-topics">
                <strong>Topics Covered:</strong>
                <div className="topics-tags">
                  {test.topics.map((topic, index) => (
                    <span key={index} className="topic-tag">{topic}</span>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => handleStartTest(test.id)}
                className="btn btn-primary btn-start-test"
              >
                Start Test
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="results-section">
        <h2>Your Test History</h2>
        {results.length > 0 ? (
          <div className="results-table-container">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Test</th>
                  <th>Date</th>
                  <th>Score</th>
                  <th>Percentage</th>
                  <th>Time Taken</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => {
                  const test = tests.find(t => t.id === result.testId);
                  const percentage = ((result.score / result.totalMarks) * 100).toFixed(1);
                  return (
                    <tr key={index}>
                      <td>{test?.title || `Test ${result.testId}`}</td>
                      <td>{new Date(result.submittedAt).toLocaleDateString()}</td>
                      <td>{result.score}/{result.totalMarks}</td>
                      <td>
                        <span className={`percentage-badge ${
                          percentage >= 75 ? 'high' : 
                          percentage >= 50 ? 'medium' : 'low'
                        }`}>
                          {percentage}%
                        </span>
                      </td>
                      <td>{result.timeTaken} min</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-results">
            <p>No test results yet. Start taking tests to track your progress!</p>
          </div>
        )}
      </div>

      <div className="test-tips">
        <h2>📚 Mock Test Strategy</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <h3>Before the Test</h3>
            <ul>
              <li>Complete at least 6 months of preparation</li>
              <li>Revise important topics</li>
              <li>Get proper rest the night before</li>
              <li>Keep all materials ready</li>
            </ul>
          </div>

          <div className="tip-card">
            <h3>During the Test</h3>
            <ul>
              <li>Read instructions carefully</li>
              <li>Manage time effectively</li>
              <li>Attempt easier questions first</li>
              <li>Mark doubtful questions for review</li>
              <li>Don't spend too much time on one question</li>
            </ul>
          </div>

          <div className="tip-card">
            <h3>After the Test</h3>
            <ul>
              <li>Analyze your performance</li>
              <li>Identify weak areas</li>
              <li>Review incorrect answers</li>
              <li>Make notes of important points</li>
              <li>Plan revision accordingly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockTestsPage;

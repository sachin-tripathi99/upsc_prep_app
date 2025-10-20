import React, { useEffect, useState } from 'react';
import { progressAPI } from '../services/api';
import './ProgressPage.css';

function ProgressPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const statsRes = await progressAPI.getStatistics();
      setStats(statsRes.data.data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      try {
        await progressAPI.reset();
        fetchData();
        alert('Progress reset successfully!');
      } catch (error) {
        console.error('Error resetting progress:', error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading progress...</div>;
  }

  const completionRate = stats.totalDaysActive > 0 
    ? ((stats.completedDays / stats.totalDaysActive) * 100).toFixed(1)
    : 0;

  return (
    <div className="progress-page">
      <div className="page-header">
        <h1>📊 My Progress Dashboard</h1>
        <p className="page-subtitle">Track Your UPSC Preparation Journey</p>
      </div>

      <div className="stats-overview">
        <div className="stat-card-large">
          <div className="stat-icon-large">🎯</div>
          <div className="stat-content">
            <div className="stat-value-large">{completionRate}%</div>
            <div className="stat-label-large">Overall Completion Rate</div>
          </div>
        </div>

        <div className="stat-card-large">
          <div className="stat-icon-large">🔥</div>
          <div className="stat-content">
            <div className="stat-value-large">{stats.studyStreak}</div>
            <div className="stat-label-large">Day Study Streak</div>
            <div className="stat-description">Keep it going!</div>
          </div>
        </div>
      </div>

      <div className="detailed-stats">
        <h2>📈 Detailed Statistics</h2>
        <div className="stats-grid-detailed">
          <div className="stat-item">
            <div className="stat-item-icon">📚</div>
            <div className="stat-item-content">
              <div className="stat-item-value">{stats.completedDays}</div>
              <div className="stat-item-label">Days Completed</div>
              <div className="stat-item-subtext">Out of {stats.totalDaysActive} active days</div>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-item-icon">📰</div>
            <div className="stat-item-content">
              <div className="stat-item-value">{stats.newsArticlesRead}</div>
              <div className="stat-item-label">News Articles Read</div>
              <div className="stat-item-subtext">Stay updated with current affairs</div>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-item-icon">🗂️</div>
            <div className="stat-item-content">
              <div className="stat-item-value">{stats.flashcardsReviewed}</div>
              <div className="stat-item-label">Flashcards Reviewed</div>
              <div className="stat-item-subtext">Spaced repetition working!</div>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-item-icon">📝</div>
            <div className="stat-item-content">
              <div className="stat-item-value">{stats.mockTestsTaken}</div>
              <div className="stat-item-label">Mock Tests Taken</div>
              <div className="stat-item-subtext">Practice makes perfect</div>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-item-icon">⏱️</div>
            <div className="stat-item-content">
              <div className="stat-item-value">{Math.round(stats.totalStudyTime / 60)}h</div>
              <div className="stat-item-label">Total Study Time</div>
              <div className="stat-item-subtext">{Math.round(stats.averageStudyTimePerDay / 60)}h per day average</div>
            </div>
          </div>

          <div className="stat-item">
            <div className="stat-item-icon">📅</div>
            <div className="stat-item-content">
              <div className="stat-item-value">{stats.totalDaysActive}</div>
              <div className="stat-item-label">Total Active Days</div>
              <div className="stat-item-subtext">Keep the momentum!</div>
            </div>
          </div>
        </div>
      </div>

      <div className="progress-visualization">
        <h2>🎯 Learning Progress</h2>
        <div className="progress-bars">
          <div className="progress-bar-item">
            <div className="progress-bar-header">
              <span>Roadmap Completion</span>
              <span className="progress-percentage">{completionRate}%</span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </div>

          <div className="progress-bar-item">
            <div className="progress-bar-header">
              <span>Target: 100 News Articles</span>
              <span className="progress-percentage">
                {Math.min(100, stats.newsArticlesRead)}%
              </span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill progress-bar-news"
                style={{ width: `${Math.min(100, stats.newsArticlesRead)}%` }}
              ></div>
            </div>
          </div>

          <div className="progress-bar-item">
            <div className="progress-bar-header">
              <span>Target: 500 Flashcards</span>
              <span className="progress-percentage">
                {Math.min(100, (stats.flashcardsReviewed / 500 * 100).toFixed(1))}%
              </span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill progress-bar-flashcards"
                style={{ width: `${Math.min(100, stats.flashcardsReviewed / 500 * 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="progress-bar-item">
            <div className="progress-bar-header">
              <span>Target: 20 Mock Tests</span>
              <span className="progress-percentage">
                {Math.min(100, (stats.mockTestsTaken / 20 * 100).toFixed(1))}%
              </span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill progress-bar-tests"
                style={{ width: `${Math.min(100, stats.mockTestsTaken / 20 * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="motivation-section">
        <h2>💪 Keep Going!</h2>
        <div className="motivation-message">
          {stats.studyStreak >= 30 ? (
            <p>🌟 Amazing! You've maintained a {stats.studyStreak}-day streak! You're on the path to success!</p>
          ) : stats.studyStreak >= 7 ? (
            <p>🔥 Great job! {stats.studyStreak} days of consistent study. Keep building that momentum!</p>
          ) : stats.studyStreak > 0 ? (
            <p>✨ You're off to a good start with {stats.studyStreak} day(s)! Consistency is key!</p>
          ) : (
            <p>💡 Start your study streak today! Consistent effort leads to success!</p>
          )}
        </div>

        <div className="milestones">
          <h3>🎖️ Milestones</h3>
          <div className="milestone-list">
            <div className={`milestone ${stats.studyStreak >= 7 ? 'achieved' : ''}`}>
              <span className="milestone-icon">{stats.studyStreak >= 7 ? '✅' : '⏳'}</span>
              <span className="milestone-text">7-Day Streak</span>
            </div>
            <div className={`milestone ${stats.completedDays >= 30 ? 'achieved' : ''}`}>
              <span className="milestone-icon">{stats.completedDays >= 30 ? '✅' : '⏳'}</span>
              <span className="milestone-text">30 Days Completed</span>
            </div>
            <div className={`milestone ${stats.newsArticlesRead >= 100 ? 'achieved' : ''}`}>
              <span className="milestone-icon">{stats.newsArticlesRead >= 100 ? '✅' : '⏳'}</span>
              <span className="milestone-text">100 News Articles</span>
            </div>
            <div className={`milestone ${stats.flashcardsReviewed >= 500 ? 'achieved' : ''}`}>
              <span className="milestone-icon">{stats.flashcardsReviewed >= 500 ? '✅' : '⏳'}</span>
              <span className="milestone-text">500 Flashcards</span>
            </div>
            <div className={`milestone ${stats.mockTestsTaken >= 10 ? 'achieved' : ''}`}>
              <span className="milestone-icon">{stats.mockTestsTaken >= 10 ? '✅' : '⏳'}</span>
              <span className="milestone-text">10 Mock Tests</span>
            </div>
            <div className={`milestone ${stats.studyStreak >= 30 ? 'achieved' : ''}`}>
              <span className="milestone-icon">{stats.studyStreak >= 30 ? '✅' : '⏳'}</span>
              <span className="milestone-text">30-Day Streak</span>
            </div>
          </div>
        </div>
      </div>

      <div className="actions-section">
        <button onClick={handleReset} className="btn btn-danger">
          Reset All Progress
        </button>
      </div>
    </div>
  );
}

export default ProgressPage;

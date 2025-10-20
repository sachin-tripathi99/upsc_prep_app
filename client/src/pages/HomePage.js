import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { progressAPI, roadmapAPI } from '../services/api';
import './HomePage.css';

function HomePage() {
  const [stats, setStats] = useState(null);
  const [todayTasks, setTodayTasks] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, todayRes] = await Promise.all([
        progressAPI.getStatistics(),
        roadmapAPI.getToday(localStorage.getItem('startDate') || new Date().toISOString())
      ]);
      setStats(statsRes.data.data);
      setTodayTasks(todayRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>🎓 Welcome to UPSC Prep App</h1>
        <p className="hero-subtitle">Your Complete Civil Services Examination Preparation Platform</p>
        <p className="hero-description">
          Comprehensive resources including daily news updates, intelligent flashcards,
          detailed 15-month roadmap, and mock tests - everything you need to become an IAS officer!
        </p>
      </section>

      <section className="stats-section">
        <h2>Your Progress at a Glance</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-value">{stats?.completedDays || 0}</div>
            <div className="stat-label">Days Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📰</div>
            <div className="stat-value">{stats?.newsArticlesRead || 0}</div>
            <div className="stat-label">News Articles Read</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🗂️</div>
            <div className="stat-value">{stats?.flashcardsReviewed || 0}</div>
            <div className="stat-label">Flashcards Reviewed</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-value">{stats?.studyStreak || 0}</div>
            <div className="stat-label">Day Streak</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-value">{Math.round(stats?.totalStudyTime / 60) || 0}h</div>
            <div className="stat-label">Total Study Time</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-value">{stats?.mockTestsTaken || 0}</div>
            <div className="stat-label">Mock Tests Taken</div>
          </div>
        </div>
      </section>

      {todayTasks && (
        <section className="today-tasks-section">
          <h2>📅 Today's Study Plan - Day {todayTasks.day}</h2>
          <div className="today-tasks-card">
            <h3>{todayTasks.weekFocus}</h3>
            <p className="month-theme">Month {todayTasks.month} Theme: {todayTasks.theme}</p>
            <div className="tasks-list">
              <h4>Today's Tasks:</h4>
              <ul>
                {todayTasks.tasks.map((task, index) => (
                  <li key={index}>{task}</li>
                ))}
              </ul>
            </div>
            <div className="study-hours">
              <strong>Recommended Study Hours:</strong> {todayTasks.studyHours} hours
            </div>
            <div className="topics">
              <strong>Focus Topics:</strong> {todayTasks.topics.join(', ')}
            </div>
          </div>
        </section>
      )}

      <section className="features-section">
        <h2>🌟 Key Features</h2>
        <div className="features-grid">
          <Link to="/news" className="feature-card">
            <div className="feature-icon">📰</div>
            <h3>Daily News Updates</h3>
            <p>Curated articles from The Hindu with UPSC-relevant analysis and important points</p>
          </Link>
          
          <Link to="/flashcards" className="feature-card">
            <div className="feature-icon">🗂️</div>
            <h3>Smart Flashcards</h3>
            <p>Spaced repetition system for effective revision of topics you've completed</p>
          </Link>
          
          <Link to="/roadmap" className="feature-card">
            <div className="feature-icon">🗺️</div>
            <h3>15-Month Roadmap</h3>
            <p>Detailed day-by-day study plan covering all subjects with specific tasks</p>
          </Link>
          
          <Link to="/mock-tests" className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Mock Tests</h3>
            <p>Comprehensive practice tests to assess your preparation level</p>
          </Link>
          
          <Link to="/progress" className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Progress Tracking</h3>
            <p>Monitor your daily progress, study streaks, and performance analytics</p>
          </Link>
          
          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3>Study Tips</h3>
            <p>Expert guidance and strategies for effective UPSC preparation</p>
          </div>
        </div>
      </section>

      <section className="motivation-section">
        <div className="motivation-card">
          <h2>💪 Success Mantra</h2>
          <blockquote>
            "Success in UPSC is not about being the smartest, but about being the most consistent and dedicated.
            Follow the roadmap, stay disciplined, and your dream of serving the nation will come true!"
          </blockquote>
          <div className="tips">
            <h3>Key Success Tips:</h3>
            <ul>
              <li>✅ Study consistently for 8-10 hours daily</li>
              <li>✅ Never skip current affairs - read The Hindu daily</li>
              <li>✅ Revise each topic at least 3 times</li>
              <li>✅ Practice answer writing from day 1</li>
              <li>✅ Take regular mock tests from month 6 onwards</li>
              <li>✅ Stay healthy - exercise and meditate daily</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

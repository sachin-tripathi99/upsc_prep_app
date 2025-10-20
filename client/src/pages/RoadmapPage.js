import React, { useEffect, useState } from 'react';
import { roadmapAPI, progressAPI } from '../services/api';
import './RoadmapPage.css';

function RoadmapPage() {
  const [roadmap, setRoadmap] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedDay, setSelectedDay] = useState(null);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('overview'); // overview, month, day

  useEffect(() => {
    fetchRoadmap();
    fetchProgress();
  }, []);

  const fetchRoadmap = async () => {
    try {
      const response = await roadmapAPI.getAll();
      setRoadmap(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching roadmap:', error);
      setLoading(false);
    }
  };

  const fetchProgress = async () => {
    try {
      const response = await progressAPI.get();
      setProgress(response.data.data.roadmapProgress || {});
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const markTaskComplete = async (day, completed) => {
    try {
      await progressAPI.updateRoadmap(day, { completed });
      fetchProgress();
      alert(`Day ${day} marked as ${completed ? 'complete' : 'incomplete'}!`);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const renderOverview = () => {
    if (!roadmap) return null;

    return (
      <div className="overview-section">
        <h2>📋 15-Month Preparation Roadmap</h2>
        <p className="overview-description">
          This comprehensive roadmap is designed to guide you through a systematic preparation
          journey spanning 15 months (450 days). Follow this plan diligently to maximize your
          chances of success in UPSC Civil Services Examination.
        </p>

        <div className="phases-grid">
          {roadmap.phases.map((phase, index) => (
            <div key={index} className="phase-card">
              <h3>{phase.name}</h3>
              <div className="phase-info">
                <span className="phase-months">Months: {phase.months}</span>
                <span className="phase-duration">{phase.duration}</span>
              </div>
              <p>{phase.description}</p>
            </div>
          ))}
        </div>

        <div className="recommendations-section">
          <h3>💡 Daily Routine Recommendations</h3>
          <div className="routine-grid">
            <div className="routine-card">
              <strong>Morning (6 AM - 9 AM)</strong>
              <p>{roadmap.recommendations.dailyRoutine.morning}</p>
            </div>
            <div className="routine-card">
              <strong>Mid-Morning (9 AM - 12 PM)</strong>
              <p>{roadmap.recommendations.dailyRoutine.midMorning}</p>
            </div>
            <div className="routine-card">
              <strong>Afternoon (12 PM - 2 PM)</strong>
              <p>{roadmap.recommendations.dailyRoutine.afternoon}</p>
            </div>
            <div className="routine-card">
              <strong>Evening (4 PM - 7 PM)</strong>
              <p>{roadmap.recommendations.dailyRoutine.evening}</p>
            </div>
            <div className="routine-card">
              <strong>Night (8 PM - 10 PM)</strong>
              <p>{roadmap.recommendations.dailyRoutine.night}</p>
            </div>
          </div>

          <div className="tips-section">
            <h3>🎯 Important Success Tips</h3>
            <ul className="tips-list">
              {roadmap.recommendations.importantTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="action-buttons">
          <button 
            onClick={() => setView('month')}
            className="btn btn-primary btn-large"
          >
            View Monthly Plan
          </button>
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    if (!roadmap || !roadmap.monthlyPlan) return null;

    const monthData = roadmap.monthlyPlan.find(m => m.month === selectedMonth);
    if (!monthData) return <div>Month data not found</div>;

    return (
      <div className="month-view">
        <div className="view-header">
          <button onClick={() => setView('overview')} className="btn btn-secondary">
            ← Back to Overview
          </button>
          <h2>Month {monthData.month}: {monthData.theme}</h2>
        </div>

        <div className="month-selector">
          {roadmap.monthlyPlan.slice(0, 3).map((m) => (
            <button
              key={m.month}
              onClick={() => setSelectedMonth(m.month)}
              className={`month-btn ${selectedMonth === m.month ? 'active' : ''}`}
            >
              Month {m.month}
            </button>
          ))}
        </div>

        <div className="weeks-container">
          {monthData.weeklyGoals.map((week, weekIndex) => (
            <div key={weekIndex} className="week-card">
              <h3>Week {week.week}: {week.focus}</h3>
              <div className="days-grid">
                {week.dailyTasks.map((dayTask, dayIndex) => {
                  const isCompleted = progress[dayTask.day]?.completed;
                  return (
                    <div 
                      key={dayIndex} 
                      className={`day-card ${isCompleted ? 'completed' : ''}`}
                      onClick={() => {
                        setSelectedDay(dayTask);
                        setView('day');
                      }}
                    >
                      <div className="day-header">
                        <span className="day-number">Day {dayTask.day}</span>
                        {isCompleted && <span className="check-mark">✓</span>}
                      </div>
                      <div className="day-topics">
                        {dayTask.topics.slice(0, 2).map((topic, i) => (
                          <span key={i} className="topic-tag">{topic}</span>
                        ))}
                      </div>
                      <div className="day-hours">{dayTask.studyHours}h study</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    if (!selectedDay) return null;

    const isCompleted = progress[selectedDay.day]?.completed;

    return (
      <div className="day-view">
        <div className="view-header">
          <button onClick={() => setView('month')} className="btn btn-secondary">
            ← Back to Month View
          </button>
          <h2>Day {selectedDay.day} - Detailed Plan</h2>
        </div>

        <div className="day-details-card">
          <div className="day-status">
            <button
              onClick={() => markTaskComplete(selectedDay.day, !isCompleted)}
              className={`btn ${isCompleted ? 'btn-success' : 'btn-primary'}`}
            >
              {isCompleted ? '✓ Completed' : 'Mark as Complete'}
            </button>
          </div>

          <div className="day-info">
            <div className="info-item">
              <strong>Study Hours:</strong> {selectedDay.studyHours} hours
            </div>
            <div className="info-item">
              <strong>Focus Topics:</strong> {selectedDay.topics.join(', ')}
            </div>
          </div>

          <div className="tasks-section">
            <h3>📝 Today's Tasks</h3>
            <ul className="task-list">
              {selectedDay.tasks.map((task, index) => (
                <li key={index} className="task-item">
                  <span className="task-number">{index + 1}</span>
                  <span className="task-text">{task}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="study-tips-day">
            <h4>💡 Pro Tips</h4>
            <ul>
              <li>Take short breaks every 90 minutes</li>
              <li>Make concise notes while studying</li>
              <li>Review previous day's notes before starting new topics</li>
              <li>Practice answer writing for at least 30 minutes</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="loading">Loading roadmap...</div>;
  }

  return (
    <div className="roadmap-page">
      <div className="page-header">
        <h1>🗺️ 15-Month UPSC Preparation Roadmap</h1>
        <p className="page-subtitle">Your Complete Day-by-Day Study Plan</p>
      </div>

      {view === 'overview' && renderOverview()}
      {view === 'month' && renderMonthView()}
      {view === 'day' && renderDayView()}
    </div>
  );
}

export default RoadmapPage;

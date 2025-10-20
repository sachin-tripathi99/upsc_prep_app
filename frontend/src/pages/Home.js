import React, { useState, useEffect } from 'react';
import { roadmapAPI } from '../services/api';

function Home() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await roadmapAPI.getProgress();
      setProgress(response.data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="card">
        <h2>Welcome to IAS-Prime! 🎯</h2>
        <p>
          Your comprehensive, 100% free, local-first UPSC preparation platform.
          Everything runs on your machine - no subscriptions, no cloud, just you and your journey.
        </p>
      </div>

      <div className="card">
        <h2>Your Progress Dashboard</h2>
        {progress && (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Day {progress.current_day}</h3>
                <p>of 450</p>
              </div>
              <div className="stat-card">
                <h3>{progress.total_tasks_completed}</h3>
                <p>Tasks Completed</p>
              </div>
              <div className="stat-card">
                <h3>{progress.flashcards_reviewed}</h3>
                <p>Flashcards Reviewed</p>
              </div>
              <div className="stat-card">
                <h3>{progress.mcqs_attempted}</h3>
                <p>MCQs Attempted</p>
              </div>
            </div>

            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress.completion_percentage}%` }}
              >
                {progress.completion_percentage.toFixed(1)}%
              </div>
            </div>
          </>
        )}
      </div>

      <div className="card">
        <h2>Quick Start Guide</h2>
        <ol>
          <li><strong>Daily Briefing:</strong> Click "Fetch Today's News" to get AI-processed current affairs</li>
          <li><strong>Roadmap:</strong> Follow your personalized 15-month study plan day by day</li>
          <li><strong>Flashcards:</strong> Review spaced-repetition flashcards that unlock as you progress</li>
          <li><strong>MCQ Practice:</strong> Test yourself with 20,000+ questions from various topics</li>
          <li><strong>Mains Evaluator:</strong> Get AI feedback on your answer writing skills</li>
        </ol>
      </div>

      <div className="card">
        <h2>Features</h2>
        <ul>
          <li>✅ 100% Free - No subscriptions, no hidden costs</li>
          <li>✅ Local-First - All data stored on your machine</li>
          <li>✅ AI-Powered - Uses local Ollama for summarization and evaluation</li>
          <li>✅ Comprehensive - Covers entire UPSC syllabus over 15 months</li>
          <li>✅ Privacy-Focused - Your data never leaves your computer</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;

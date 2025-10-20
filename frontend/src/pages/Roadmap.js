import React, { useState, useEffect } from 'react';
import { roadmapAPI } from '../services/api';

function Roadmap() {
  const [currentDay, setCurrentDay] = useState(1);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTasks();
  }, [currentDay]);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const response = await roadmapAPI.getDayTasks(currentDay);
      setTasks(response.data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const response = await roadmapAPI.completeTask(taskId);
      alert(`Task completed! ${response.data.flashcards_unlocked} flashcards unlocked for review.`);
      await loadTasks();
    } catch (error) {
      console.error('Error completing task:', error);
      alert('Error completing task');
    }
  };

  return (
    <div>
      <div className="card">
        <h2>📅 15-Month Roadmap</h2>
        <p>Follow your structured day-by-day study plan</p>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
          <button 
            className="btn btn-primary" 
            onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
            disabled={currentDay === 1}
          >
            ← Previous Day
          </button>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Day {currentDay}</span>
          <button 
            className="btn btn-primary" 
            onClick={() => setCurrentDay(Math.min(450, currentDay + 1))}
            disabled={currentDay === 450}
          >
            Next Day →
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="card">
          <p>No tasks defined for this day yet. Check back later or check the roadmap.json file.</p>
        </div>
      ) : (
        <div className="card">
          <h3>Today's Tasks</h3>
          {tasks.map(task => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <input 
                type="checkbox" 
                className="task-checkbox"
                checked={task.completed}
                onChange={() => !task.completed && handleCompleteTask(task.task_id)}
                disabled={task.completed}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold' }}>{task.task_text}</div>
                <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.25rem' }}>
                  Topic: {task.topic_tag}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Roadmap;

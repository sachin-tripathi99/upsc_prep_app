import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>UPSC Prep App</h1>
        <p>Your comprehensive platform for UPSC/IAS exam preparation</p>
        <div className="features">
          <div className="feature">
            <h3>📚 Study Materials</h3>
            <p>Access comprehensive study materials for all subjects</p>
          </div>
          <div className="feature">
            <h3>📝 Mock Tests</h3>
            <p>Practice with previous year papers and mock tests</p>
          </div>
          <div className="feature">
            <h3>📊 Progress Tracking</h3>
            <p>Monitor your preparation progress with detailed analytics</p>
          </div>
          <div className="feature">
            <h3>🎯 Personalized Learning</h3>
            <p>Get recommendations based on your performance</p>
          </div>
        </div>
        <div className="cta">
          <button className="btn-primary">Get Started</button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </header>
    </div>
  );
}

export default App;

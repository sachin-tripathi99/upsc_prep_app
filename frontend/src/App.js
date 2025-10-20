import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Pages
import Home from './pages/Home';
import DailyBriefing from './pages/DailyBriefing';
import Roadmap from './pages/Roadmap';
import Flashcards from './pages/Flashcards';
import MCQPractice from './pages/MCQPractice';
import MainsEvaluator from './pages/MainsEvaluator';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-brand">
            <h1>🎯 IAS-Prime</h1>
            <p className="tagline">Your 15-Month UPSC Journey</p>
          </div>
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/briefing">Daily Briefing</Link>
            <Link to="/roadmap">Roadmap</Link>
            <Link to="/flashcards">Flashcards</Link>
            <Link to="/mcq">MCQ Practice</Link>
            <Link to="/mains">Mains Evaluator</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/briefing" element={<DailyBriefing />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/mcq" element={<MCQPractice />} />
            <Route path="/mains" element={<MainsEvaluator />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>IAS-Prime v1.0 - 100% Free, Local-First UPSC Prep</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

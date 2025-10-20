import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import FlashcardsPage from './pages/FlashcardsPage';
import RoadmapPage from './pages/RoadmapPage';
import ProgressPage from './pages/ProgressPage';
import MockTestsPage from './pages/MockTestsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              🎓 UPSC Prep App
            </Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/news" className="nav-link">Daily News</Link>
              </li>
              <li className="nav-item">
                <Link to="/flashcards" className="nav-link">Flashcards</Link>
              </li>
              <li className="nav-item">
                <Link to="/roadmap" className="nav-link">15-Month Roadmap</Link>
              </li>
              <li className="nav-item">
                <Link to="/mock-tests" className="nav-link">Mock Tests</Link>
              </li>
              <li className="nav-item">
                <Link to="/progress" className="nav-link">My Progress</Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/mock-tests" element={<MockTestsPage />} />
            <Route path="/progress" element={<ProgressPage />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2024 UPSC Prep App - Your Complete Civil Services Preparation Platform</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

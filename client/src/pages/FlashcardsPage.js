import React, { useEffect, useState } from 'react';
import { flashcardsAPI, progressAPI } from '../services/api';
import './FlashcardsPage.css';

function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [mode, setMode] = useState('sequential'); // sequential or random
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlashcards();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, difficulty, mode]);

  const fetchFlashcards = async () => {
    try {
      setLoading(true);
      let response;
      
      if (mode === 'random') {
        response = await flashcardsAPI.getRandom(20);
      } else {
        const params = {};
        if (selectedCategory !== 'All') params.category = selectedCategory;
        if (difficulty !== 'All') params.difficulty = difficulty;
        response = await flashcardsAPI.getAll(params);
      }
      
      setFlashcards(response.data.data);
      setCurrentCard(0);
      setShowAnswer(false);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await flashcardsAPI.getCategories();
      setCategories(['All', ...response.data.data]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleNext = () => {
    if (currentCard < flashcards.length - 1) {
      setCurrentCard(currentCard + 1);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setShowAnswer(false);
    }
  };

  const handleReveal = () => {
    setShowAnswer(!showAnswer);
    if (!showAnswer) {
      progressAPI.updateFlashcardReview(1).catch(console.error);
    }
  };

  const handleQualityRating = async (quality) => {
    try {
      await flashcardsAPI.updateReview(currentCard, quality);
      alert('Review recorded! The flashcard will appear again based on spaced repetition.');
      handleNext();
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading flashcards...</div>;
  }

  if (flashcards.length === 0) {
    return (
      <div className="flashcards-page">
        <div className="page-header">
          <h1>🗂️ Smart Flashcards</h1>
        </div>
        <div className="no-data">
          <p>No flashcards found for the selected filters.</p>
          <button onClick={fetchFlashcards} className="btn btn-primary">Reload</button>
        </div>
      </div>
    );
  }

  const card = flashcards[currentCard];

  return (
    <div className="flashcards-page">
      <div className="page-header">
        <h1>🗂️ Smart Flashcards</h1>
        <p className="page-subtitle">Spaced Repetition System for Effective Revision</p>
      </div>

      <div className="controls-section">
        <div className="filter-group">
          <label>Category:</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Difficulty:</label>
          <select 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
            className="filter-select"
          >
            <option value="All">All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Mode:</label>
          <select 
            value={mode} 
            onChange={(e) => setMode(e.target.value)}
            className="filter-select"
          >
            <option value="sequential">Sequential</option>
            <option value="random">Random</option>
          </select>
        </div>
      </div>

      <div className="flashcard-container">
        <div className="progress-indicator">
          Card {currentCard + 1} of {flashcards.length}
        </div>

        <div className={`flashcard ${showAnswer ? 'flipped' : ''}`}>
          <div className="card-meta">
            <span className={`category-badge ${card.category.toLowerCase()}`}>
              {card.category}
            </span>
            <span className={`difficulty-badge ${card.difficulty.toLowerCase()}`}>
              {card.difficulty}
            </span>
          </div>

          <div className="card-content">
            <h3 className="card-label">Question:</h3>
            <p className="question">{card.question}</p>

            {showAnswer && (
              <div className="answer-section">
                <h3 className="card-label">Answer:</h3>
                <p className="answer">{card.answer}</p>

                {card.topic && (
                  <div className="topic-info">
                    <strong>Topic:</strong> {card.topic}
                  </div>
                )}

                {card.tags && card.tags.length > 0 && (
                  <div className="tags-section">
                    <strong>Tags:</strong>
                    {card.tags.map((tag, i) => (
                      <span key={i} className="tag">{tag}</span>
                    ))}
                  </div>
                )}

                <div className="rating-section">
                  <h4>How well did you know this?</h4>
                  <div className="rating-buttons">
                    <button 
                      onClick={() => handleQualityRating(1)} 
                      className="btn btn-rating btn-hard"
                    >
                      😫 Didn't Know
                    </button>
                    <button 
                      onClick={() => handleQualityRating(3)} 
                      className="btn btn-rating btn-medium"
                    >
                      🤔 Partially
                    </button>
                    <button 
                      onClick={() => handleQualityRating(5)} 
                      className="btn btn-rating btn-easy"
                    >
                      😄 Knew Well
                    </button>
                  </div>
                  <p className="rating-hint">
                    Your rating helps optimize when this card appears next for review
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flashcard-controls">
          <button 
            onClick={handlePrevious}
            disabled={currentCard === 0}
            className="btn btn-secondary"
          >
            ← Previous
          </button>

          <button 
            onClick={handleReveal}
            className="btn btn-primary btn-reveal"
          >
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </button>

          <button 
            onClick={handleNext}
            disabled={currentCard === flashcards.length - 1}
            className="btn btn-secondary"
          >
            Next →
          </button>
        </div>
      </div>

      <div className="study-tips">
        <h3>📚 Flashcard Study Tips</h3>
        <ul>
          <li>Review flashcards daily for best retention</li>
          <li>Be honest with your ratings - it helps the spaced repetition algorithm</li>
          <li>Cards you rate as "Didn't Know" will appear more frequently</li>
          <li>Cards you know well will appear less often</li>
          <li>Create your own flashcards for topics you find difficult</li>
        </ul>
      </div>
    </div>
  );
}

export default FlashcardsPage;

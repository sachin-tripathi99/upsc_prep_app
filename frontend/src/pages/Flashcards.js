import React, { useState, useEffect } from 'react';
import { flashcardAPI } from '../services/api';

function Flashcards() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFlashcards();
  }, []);

  const loadFlashcards = async () => {
    setLoading(true);
    try {
      const response = await flashcardAPI.getDueFlashcards();
      setFlashcards(response.data);
      setCurrentIndex(0);
      setShowAnswer(false);
    } catch (error) {
      console.error('Error loading flashcards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (difficulty) => {
    const currentCard = flashcards[currentIndex];
    try {
      await flashcardAPI.reviewFlashcard(currentCard.id, difficulty);
      
      // Move to next card or finish
      if (currentIndex < flashcards.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setShowAnswer(false);
      } else {
        alert('All flashcards reviewed for today! Great job!');
        await loadFlashcards();
      }
    } catch (error) {
      console.error('Error reviewing flashcard:', error);
    }
  };

  if (loading) return <div className="loading">Loading flashcards...</div>;

  if (flashcards.length === 0) {
    return (
      <div className="card">
        <h2>🎴 Flashcards</h2>
        <p>No flashcards due for review today!</p>
        <p>Complete more tasks from the Roadmap to unlock new flashcards.</p>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];

  return (
    <div>
      <div className="card">
        <h2>🎴 Flashcards - Spaced Repetition</h2>
        <p>Card {currentIndex + 1} of {flashcards.length}</p>
        <div className="progress-bar" style={{ marginTop: '1rem' }}>
          <div 
            className="progress-fill" 
            style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="flashcard" onClick={() => setShowAnswer(!showAnswer)}>
        <div style={{ textAlign: 'center' }}>
          {!showAnswer ? (
            <>
              <h3 style={{ marginBottom: '2rem' }}>Question</h3>
              <p style={{ fontSize: '1.2rem' }}>{currentCard.question}</p>
              <p style={{ marginTop: '2rem', color: '#667eea', fontSize: '0.9rem' }}>
                Click to reveal answer
              </p>
            </>
          ) : (
            <>
              <h3 style={{ marginBottom: '1rem' }}>Question</h3>
              <p style={{ fontSize: '1rem', color: '#666' }}>{currentCard.question}</p>
              <hr style={{ margin: '1.5rem 0', border: 'none', borderTop: '2px solid #eee' }} />
              <h3 style={{ marginBottom: '1rem' }}>Answer</h3>
              <p style={{ fontSize: '1.1rem' }}>{currentCard.answer}</p>
            </>
          )}
        </div>
      </div>

      {showAnswer && (
        <div className="flashcard-buttons" style={{ justifyContent: 'center' }}>
          <button 
            className="btn btn-danger" 
            onClick={() => handleReview('hard')}
          >
            😓 Hard
          </button>
          <button 
            className="btn btn-primary" 
            onClick={() => handleReview('good')}
          >
            👍 Good
          </button>
          <button 
            className="btn btn-success" 
            onClick={() => handleReview('easy')}
          >
            😊 Easy
          </button>
        </div>
      )}
    </div>
  );
}

export default Flashcards;

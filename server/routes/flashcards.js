const express = require('express');
const router = express.Router();
const flashcardsData = require('../data/flashcardsData');

// Get all flashcards
router.get('/', (req, res) => {
  try {
    const { category, difficulty, topic } = req.query;
    let filteredCards = [...flashcardsData];

    if (category) {
      filteredCards = filteredCards.filter(card => 
        card.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (difficulty) {
      filteredCards = filteredCards.filter(card => 
        card.difficulty.toLowerCase() === difficulty.toLowerCase()
      );
    }

    if (topic) {
      filteredCards = filteredCards.filter(card => 
        card.topic.toLowerCase().includes(topic.toLowerCase())
      );
    }

    res.json({
      success: true,
      count: filteredCards.length,
      data: filteredCards
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching flashcards',
      error: error.message
    });
  }
});

// Get flashcards by category
router.get('/category/:category', (req, res) => {
  try {
    const { category } = req.params;
    const categoryCards = flashcardsData.filter(card => 
      card.category.toLowerCase() === category.toLowerCase()
    );

    res.json({
      success: true,
      count: categoryCards.length,
      data: categoryCards
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching flashcards by category',
      error: error.message
    });
  }
});

// Get random flashcards for revision
router.get('/random/:count', (req, res) => {
  try {
    const count = parseInt(req.params.count) || 10;
    const shuffled = [...flashcardsData].sort(() => 0.5 - Math.random());
    const randomCards = shuffled.slice(0, count);

    res.json({
      success: true,
      count: randomCards.length,
      data: randomCards
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching random flashcards',
      error: error.message
    });
  }
});

// Get flashcards due for review (spaced repetition)
router.get('/due-for-review', (req, res) => {
  try {
    const today = new Date();
    const dueCards = flashcardsData.filter(card => {
      if (!card.nextReview) return true; // Not reviewed yet
      return new Date(card.nextReview) <= today;
    });

    res.json({
      success: true,
      count: dueCards.length,
      data: dueCards
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching due flashcards',
      error: error.message
    });
  }
});

// Update flashcard review
router.post('/review/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { quality } = req.body; // Quality of recall: 0-5

    // Simple spaced repetition algorithm (SM-2)
    const card = flashcardsData[id];
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Flashcard not found'
      });
    }

    // Update review count
    card.reviewCount = (card.reviewCount || 0) + 1;
    card.lastReviewed = new Date();

    // Calculate next review date based on quality
    let interval = card.interval || 0;
    let easeFactor = card.easeFactor || 2.5;

    if (quality >= 3) {
      if (interval === 0) {
        interval = 1;
      } else if (interval === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    } else {
      interval = 1;
      easeFactor = Math.max(1.3, easeFactor - 0.2);
    }

    card.interval = interval;
    card.easeFactor = Math.max(1.3, easeFactor);
    card.nextReview = new Date(Date.now() + interval * 24 * 60 * 60 * 1000);

    res.json({
      success: true,
      message: 'Flashcard review updated',
      data: card
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating flashcard review',
      error: error.message
    });
  }
});

// Get categories
router.get('/categories', (req, res) => {
  try {
    const categories = [...new Set(flashcardsData.map(card => card.category))];
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
});

module.exports = router;

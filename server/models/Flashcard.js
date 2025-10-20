const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  topic: String,
  source: String,
  tags: [String],
  reviewCount: {
    type: Number,
    default: 0
  },
  lastReviewed: Date,
  nextReview: Date,
  easeFactor: {
    type: Number,
    default: 2.5
  },
  interval: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.models.Flashcard || mongoose.model('Flashcard', flashcardSchema);

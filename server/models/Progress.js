const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
  },
  type: {
    type: String,
    enum: ['Topic Completed', 'Test Attempted'],
    required: true,
  },
  score: {
    type: Number,
  },
  totalMarks: {
    type: Number,
  },
  timeTaken: {
    type: Number, // in minutes
  },
  answers: [{
    questionId: mongoose.Schema.Types.ObjectId,
    selectedAnswer: String,
    isCorrect: Boolean,
  }],
  completedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Progress', progressSchema);

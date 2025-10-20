const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: 'default-user'
  },
  roadmapProgress: {
    type: Map,
    of: {
      completed: Boolean,
      completedDate: Date,
      notes: String
    }
  },
  flashcardsReviewed: {
    type: Number,
    default: 0
  },
  newsArticlesRead: {
    type: Number,
    default: 0
  },
  mockTestsTaken: {
    type: Number,
    default: 0
  },
  studyStreak: {
    type: Number,
    default: 0
  },
  lastActiveDate: Date,
  totalStudyTime: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.models.Progress || mongoose.model('Progress', progressSchema);

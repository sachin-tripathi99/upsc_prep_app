const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  description: {
    type: String,
  },
  examType: {
    type: String,
    enum: ['Prelims', 'Mains', 'Both'],
    default: 'Both',
  },
  isOptional: {
    type: Boolean,
    default: false,
  },
  topics: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Subject', subjectSchema);

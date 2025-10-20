const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['National', 'International', 'Economy', 'Science & Technology', 'Environment', 'Polity', 'History', 'Geography', 'Current Affairs'],
    default: 'Current Affairs'
  },
  source: {
    type: String,
    default: 'The Hindu'
  },
  date: {
    type: Date,
    default: Date.now
  },
  importance: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  tags: [String],
  relatedTopics: [String]
}, { timestamps: true });

module.exports = mongoose.models.News || mongoose.model('News', newsSchema);

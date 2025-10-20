const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Progress = require('../models/Progress');

// Get user progress
router.get('/', auth, async (req, res) => {
  try {
    const { type, subject } = req.query;
    
    let query = { user: req.user._id };
    if (type) query.type = type;
    if (subject) query.subject = subject;

    const progress = await Progress.find(query)
      .populate('subject')
      .populate('topic')
      .populate('test')
      .sort({ completedAt: -1 });

    res.json({ progress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get progress statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const testProgress = await Progress.find({
      user: req.user._id,
      type: 'Test Attempted',
    });

    const topicProgress = await Progress.find({
      user: req.user._id,
      type: 'Topic Completed',
    });

    const totalTests = testProgress.length;
    const averageScore = totalTests > 0
      ? testProgress.reduce((sum, p) => sum + (p.score / p.totalMarks * 100), 0) / totalTests
      : 0;

    const totalTopicsCompleted = topicProgress.length;

    // Get subject-wise progress
    const subjectStats = await Progress.aggregate([
      {
        $match: {
          user: req.user._id,
          type: 'Test Attempted',
        },
      },
      {
        $group: {
          _id: '$subject',
          averageScore: { $avg: { $multiply: [{ $divide: ['$score', '$totalMarks'] }, 100] } },
          testsAttempted: { $sum: 1 },
        },
      },
    ]);

    res.json({
      totalTests,
      averageScore: averageScore.toFixed(2),
      totalTopicsCompleted,
      subjectStats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark topic as completed
router.post('/topic/:topicId/complete', auth, async (req, res) => {
  try {
    const Topic = require('../models/Topic');
    const topic = await Topic.findById(req.params.topicId);

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    // Check if already completed
    const existing = await Progress.findOne({
      user: req.user._id,
      topic: topic._id,
      type: 'Topic Completed',
    });

    if (existing) {
      return res.status(400).json({ message: 'Topic already marked as completed' });
    }

    const progress = new Progress({
      user: req.user._id,
      subject: topic.subject,
      topic: topic._id,
      type: 'Topic Completed',
    });

    await progress.save();

    res.status(201).json({ progress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const Topic = require('../models/Topic');
const Subject = require('../models/Subject');

// Get all topics
router.get('/', async (req, res) => {
  try {
    const { subject, difficulty } = req.query;
    
    let query = {};
    if (subject) query.subject = subject;
    if (difficulty) query.difficulty = difficulty;

    const topics = await Topic.find(query).populate('subject');
    res.json({ topics });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get topic by ID
router.get('/:id', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id).populate('subject');
    
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    res.json({ topic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create topic (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { name, subject, description, difficulty, estimatedTime, resources } = req.body;

    const topic = new Topic({
      name,
      subject,
      description,
      difficulty,
      estimatedTime,
      resources,
    });

    await topic.save();

    // Add topic to subject
    await Subject.findByIdAndUpdate(subject, {
      $push: { topics: topic._id },
    });

    res.status(201).json({ topic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update topic (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { name, description, difficulty, estimatedTime, resources } = req.body;

    const topic = await Topic.findByIdAndUpdate(
      req.params.id,
      { name, description, difficulty, estimatedTime, resources },
      { new: true, runValidators: true }
    );

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    res.json({ topic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete topic (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.id);

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    // Remove topic from subject
    await Subject.findByIdAndUpdate(topic.subject, {
      $pull: { topics: topic._id },
    });

    res.json({ message: 'Topic deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

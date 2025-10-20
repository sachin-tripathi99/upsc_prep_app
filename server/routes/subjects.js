const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const Subject = require('../models/Subject');

// Get all subjects
router.get('/', async (req, res) => {
  try {
    const { examType, isOptional } = req.query;
    
    let query = {};
    if (examType) query.examType = examType;
    if (isOptional !== undefined) query.isOptional = isOptional === 'true';

    const subjects = await Subject.find(query).populate('topics');
    res.json({ subjects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get subject by ID
router.get('/:id', async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id).populate('topics');
    
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.json({ subject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create subject (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { name, code, description, examType, isOptional } = req.body;

    const subject = new Subject({
      name,
      code,
      description,
      examType,
      isOptional,
    });

    await subject.save();
    res.status(201).json({ subject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update subject (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { name, code, description, examType, isOptional } = req.body;

    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      { name, code, description, examType, isOptional },
      { new: true, runValidators: true }
    );

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.json({ subject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete subject (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.json({ message: 'Subject deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const Test = require('../models/Test');

// Get all tests
router.get('/', async (req, res) => {
  try {
    const { type, examType, subject } = req.query;
    
    let query = { isActive: true };
    if (type) query.type = type;
    if (examType) query.examType = examType;
    if (subject) query.subject = subject;

    const tests = await Test.find(query).populate('subject').select('-questions.correctAnswer -questions.options.isCorrect');
    res.json({ tests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get test by ID (with questions for authenticated users)
router.get('/:id', auth, async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).populate('subject');
    
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Remove correct answers from response (user should attempt first)
    const testData = test.toObject();
    testData.questions = testData.questions.map(q => ({
      _id: q._id,
      questionText: q.questionText,
      options: q.options.map(o => ({ text: o.text })),
      marks: q.marks,
      negativeMarks: q.negativeMarks,
    }));

    res.json({ test: testData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit test
router.post('/:id/submit', auth, async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    const { answers, timeTaken } = req.body;

    let score = 0;
    const results = [];

    test.questions.forEach((question, index) => {
      const userAnswer = answers[question._id.toString()];
      const correctOption = question.options.find(o => o.isCorrect);
      const isCorrect = userAnswer === correctOption?.text;

      if (isCorrect) {
        score += question.marks;
      } else if (userAnswer) {
        score -= question.negativeMarks;
      }

      results.push({
        questionId: question._id,
        selectedAnswer: userAnswer,
        correctAnswer: correctOption?.text,
        isCorrect,
        explanation: question.explanation,
      });
    });

    // Save progress
    const Progress = require('../models/Progress');
    const progress = new Progress({
      user: req.user._id,
      test: test._id,
      subject: test.subject,
      type: 'Test Attempted',
      score,
      totalMarks: test.totalMarks,
      timeTaken,
      answers: results.map(r => ({
        questionId: r.questionId,
        selectedAnswer: r.selectedAnswer,
        isCorrect: r.isCorrect,
      })),
    });

    await progress.save();

    res.json({
      score,
      totalMarks: test.totalMarks,
      percentage: (score / test.totalMarks * 100).toFixed(2),
      results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create test (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { title, description, type, examType, subject, duration, totalMarks, questions } = req.body;

    const test = new Test({
      title,
      description,
      type,
      examType,
      subject,
      duration,
      totalMarks,
      questions,
    });

    await test.save();
    res.status(201).json({ test });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update test (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { title, description, type, examType, subject, duration, totalMarks, questions, isActive } = req.body;

    const test = await Test.findByIdAndUpdate(
      req.params.id,
      { title, description, type, examType, subject, duration, totalMarks, questions, isActive },
      { new: true, runValidators: true }
    );

    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.json({ test });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete test (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);

    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.json({ message: 'Test deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

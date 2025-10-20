const express = require('express');
const router = express.Router();

// Mock test data
const mockTests = [
  {
    id: 1,
    title: "Prelims Mock Test 1 - General Studies Paper 1",
    description: "Comprehensive test covering History, Polity, Geography, Economy, and Current Affairs",
    duration: 120, // minutes
    totalQuestions: 100,
    totalMarks: 200,
    difficulty: "Medium",
    topics: ["History", "Polity", "Geography", "Economy", "Current Affairs"]
  },
  {
    id: 2,
    title: "Prelims Mock Test 2 - General Studies Paper 1",
    description: "Focus on Science & Technology, Environment, and International Relations",
    duration: 120,
    totalQuestions: 100,
    totalMarks: 200,
    difficulty: "Medium",
    topics: ["Science & Technology", "Environment", "International Relations", "Current Affairs"]
  },
  {
    id: 3,
    title: "CSAT Mock Test 1",
    description: "Comprehensive Aptitude Test - Logical Reasoning, Analytical Ability, Decision Making",
    duration: 120,
    totalQuestions: 80,
    totalMarks: 200,
    difficulty: "Hard",
    topics: ["Logical Reasoning", "Analytical Ability", "Comprehension", "Decision Making"]
  }
];

// In-memory test results storage
let testResults = [];

// Get all available mock tests
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      count: mockTests.length,
      data: mockTests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching mock tests',
      error: error.message
    });
  }
});

// Get specific mock test
router.get('/:id', (req, res) => {
  try {
    const testId = parseInt(req.params.id);
    const test = mockTests.find(t => t.id === testId);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: 'Mock test not found'
      });
    }

    res.json({
      success: true,
      data: test
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching mock test',
      error: error.message
    });
  }
});

// Submit test result
router.post('/:id/submit', (req, res) => {
  try {
    const testId = parseInt(req.params.id);
    const { answers, timeTaken, score } = req.body;

    const result = {
      testId,
      userId: 'default-user',
      submittedAt: new Date(),
      timeTaken,
      score,
      totalMarks: mockTests.find(t => t.id === testId)?.totalMarks || 200,
      answers
    };

    testResults.push(result);

    res.json({
      success: true,
      message: 'Test submitted successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting test',
      error: error.message
    });
  }
});

// Get test results
router.get('/results/all', (req, res) => {
  try {
    res.json({
      success: true,
      count: testResults.length,
      data: testResults
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching test results',
      error: error.message
    });
  }
});

// Get user's test history
router.get('/results/user/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const userResults = testResults.filter(r => r.userId === userId);

    res.json({
      success: true,
      count: userResults.length,
      data: userResults
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user test results',
      error: error.message
    });
  }
});

module.exports = router;

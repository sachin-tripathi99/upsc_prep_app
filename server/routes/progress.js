const express = require('express');
const router = express.Router();

// In-memory progress storage (in production, use database)
let progressData = {
  userId: 'default-user',
  roadmapProgress: {},
  flashcardsReviewed: 0,
  newsArticlesRead: 0,
  mockTestsTaken: 0,
  studyStreak: 0,
  lastActiveDate: new Date(),
  totalStudyTime: 0,
  completedTasks: [],
  achievements: []
};

// Get user progress
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: progressData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching progress',
      error: error.message
    });
  }
});

// Update roadmap task completion
router.post('/roadmap/:day', (req, res) => {
  try {
    const { day } = req.params;
    const { completed, notes } = req.body;

    progressData.roadmapProgress[day] = {
      completed: completed,
      completedDate: completed ? new Date() : null,
      notes: notes || ''
    };

    // Update streak
    updateStreak();

    res.json({
      success: true,
      message: 'Progress updated',
      data: progressData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating progress',
      error: error.message
    });
  }
});

// Mark news as read
router.post('/news/read', (req, res) => {
  try {
    progressData.newsArticlesRead += 1;
    progressData.lastActiveDate = new Date();
    updateStreak();

    res.json({
      success: true,
      message: 'News article marked as read',
      data: { newsArticlesRead: progressData.newsArticlesRead }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating news progress',
      error: error.message
    });
  }
});

// Update flashcard review count
router.post('/flashcards/reviewed', (req, res) => {
  try {
    const { count } = req.body;
    progressData.flashcardsReviewed += count || 1;
    progressData.lastActiveDate = new Date();
    updateStreak();

    res.json({
      success: true,
      message: 'Flashcard review recorded',
      data: { flashcardsReviewed: progressData.flashcardsReviewed }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating flashcard progress',
      error: error.message
    });
  }
});

// Update study time
router.post('/study-time', (req, res) => {
  try {
    const { minutes } = req.body;
    progressData.totalStudyTime += minutes || 0;
    progressData.lastActiveDate = new Date();

    res.json({
      success: true,
      message: 'Study time updated',
      data: { totalStudyTime: progressData.totalStudyTime }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating study time',
      error: error.message
    });
  }
});

// Get statistics
router.get('/statistics', (req, res) => {
  try {
    const stats = {
      totalDaysActive: Object.keys(progressData.roadmapProgress).length,
      completedDays: Object.values(progressData.roadmapProgress).filter(p => p.completed).length,
      newsArticlesRead: progressData.newsArticlesRead,
      flashcardsReviewed: progressData.flashcardsReviewed,
      mockTestsTaken: progressData.mockTestsTaken,
      studyStreak: progressData.studyStreak,
      totalStudyTime: progressData.totalStudyTime,
      averageStudyTimePerDay: progressData.totalStudyTime / Math.max(1, Object.keys(progressData.roadmapProgress).length)
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
});

// Helper function to update study streak
function updateStreak() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const lastActive = new Date(progressData.lastActiveDate);
  lastActive.setHours(0, 0, 0, 0);
  
  const daysDiff = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));
  
  if (daysDiff === 0) {
    // Same day, streak continues
    return;
  } else if (daysDiff === 1) {
    // Consecutive day, increment streak
    progressData.studyStreak += 1;
  } else {
    // Streak broken
    progressData.studyStreak = 1;
  }
}

// Reset progress (for testing)
router.post('/reset', (req, res) => {
  try {
    progressData = {
      userId: 'default-user',
      roadmapProgress: {},
      flashcardsReviewed: 0,
      newsArticlesRead: 0,
      mockTestsTaken: 0,
      studyStreak: 0,
      lastActiveDate: new Date(),
      totalStudyTime: 0,
      completedTasks: [],
      achievements: []
    };

    res.json({
      success: true,
      message: 'Progress reset successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error resetting progress',
      error: error.message
    });
  }
});

module.exports = router;

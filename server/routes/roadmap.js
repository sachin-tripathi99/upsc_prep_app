const express = require('express');
const router = express.Router();
const roadmapData = require('../data/roadmapData');

// Get complete roadmap
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: roadmapData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching roadmap',
      error: error.message
    });
  }
});

// Get roadmap by month
router.get('/month/:monthNumber', (req, res) => {
  try {
    const monthNumber = parseInt(req.params.monthNumber);
    const monthPlan = roadmapData.monthlyPlan.find(m => m.month === monthNumber);

    if (!monthPlan) {
      return res.status(404).json({
        success: false,
        message: 'Month not found'
      });
    }

    res.json({
      success: true,
      data: monthPlan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching month roadmap',
      error: error.message
    });
  }
});

// Get specific day's tasks
router.get('/day/:dayNumber', (req, res) => {
  try {
    const dayNumber = parseInt(req.params.dayNumber);
    let dayPlan = null;

    // Search through all months and weeks
    for (const month of roadmapData.monthlyPlan) {
      for (const week of month.weeklyGoals) {
        const day = week.dailyTasks.find(d => d.day === dayNumber);
        if (day) {
          dayPlan = {
            ...day,
            month: month.month,
            theme: month.theme,
            week: week.week,
            weekFocus: week.focus
          };
          break;
        }
      }
      if (dayPlan) break;
    }

    if (!dayPlan) {
      return res.status(404).json({
        success: false,
        message: 'Day not found'
      });
    }

    res.json({
      success: true,
      data: dayPlan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching day roadmap',
      error: error.message
    });
  }
});

// Get today's tasks (based on user's start date)
router.post('/today', (req, res) => {
  try {
    const { startDate } = req.body;
    const start = new Date(startDate || Date.now());
    const today = new Date();
    const daysDiff = Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1;

    if (daysDiff < 1 || daysDiff > 450) {
      return res.json({
        success: true,
        message: 'Outside preparation period',
        data: null
      });
    }

    // Find the day's plan
    let dayPlan = null;
    for (const month of roadmapData.monthlyPlan) {
      for (const week of month.weeklyGoals) {
        const day = week.dailyTasks.find(d => d.day === daysDiff);
        if (day) {
          dayPlan = {
            ...day,
            month: month.month,
            theme: month.theme,
            week: week.week,
            weekFocus: week.focus
          };
          break;
        }
      }
      if (dayPlan) break;
    }

    res.json({
      success: true,
      currentDay: daysDiff,
      data: dayPlan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching today\'s tasks',
      error: error.message
    });
  }
});

// Get phases overview
router.get('/phases', (req, res) => {
  try {
    res.json({
      success: true,
      data: roadmapData.phases
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching phases',
      error: error.message
    });
  }
});

// Get recommendations
router.get('/recommendations', (req, res) => {
  try {
    res.json({
      success: true,
      data: roadmapData.recommendations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching recommendations',
      error: error.message
    });
  }
});

module.exports = router;

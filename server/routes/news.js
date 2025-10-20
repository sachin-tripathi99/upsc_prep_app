const express = require('express');
const router = express.Router();
const newsData = require('../data/newsData');

// Get all news articles
router.get('/', (req, res) => {
  try {
    const { category, date, importance } = req.query;
    let filteredNews = [...newsData];

    // Filter by category
    if (category) {
      filteredNews = filteredNews.filter(news => news.category === category);
    }

    // Filter by importance
    if (importance) {
      filteredNews = filteredNews.filter(news => news.importance === importance);
    }

    // Sort by date (newest first)
    filteredNews.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({
      success: true,
      count: filteredNews.length,
      data: filteredNews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching news',
      error: error.message
    });
  }
});

// Get news by category
router.get('/category/:category', (req, res) => {
  try {
    const { category } = req.params;
    const categoryNews = newsData.filter(news => 
      news.category.toLowerCase() === category.toLowerCase()
    );

    res.json({
      success: true,
      count: categoryNews.length,
      data: categoryNews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching news by category',
      error: error.message
    });
  }
});

// Get today's news
router.get('/today', (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayNews = newsData.filter(news => {
      const newsDate = new Date(news.date);
      newsDate.setHours(0, 0, 0, 0);
      return newsDate.getTime() === today.getTime();
    });

    res.json({
      success: true,
      count: todayNews.length,
      data: todayNews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching today\'s news',
      error: error.message
    });
  }
});

// Get news categories
router.get('/categories', (req, res) => {
  try {
    const categories = [...new Set(newsData.map(news => news.category))];
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
});

module.exports = router;

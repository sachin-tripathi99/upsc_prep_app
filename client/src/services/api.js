import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// News API
export const newsAPI = {
  getAll: (params) => api.get('/news', { params }),
  getByCategory: (category) => api.get(`/news/category/${category}`),
  getToday: () => api.get('/news/today'),
  getCategories: () => api.get('/news/categories'),
};

// Flashcards API
export const flashcardsAPI = {
  getAll: (params) => api.get('/flashcards', { params }),
  getByCategory: (category) => api.get(`/flashcards/category/${category}`),
  getRandom: (count) => api.get(`/flashcards/random/${count}`),
  getDueForReview: () => api.get('/flashcards/due-for-review'),
  updateReview: (id, quality) => api.post(`/flashcards/review/${id}`, { quality }),
  getCategories: () => api.get('/flashcards/categories'),
};

// Roadmap API
export const roadmapAPI = {
  getAll: () => api.get('/roadmap'),
  getByMonth: (monthNumber) => api.get(`/roadmap/month/${monthNumber}`),
  getByDay: (dayNumber) => api.get(`/roadmap/day/${dayNumber}`),
  getToday: (startDate) => api.post('/roadmap/today', { startDate }),
  getPhases: () => api.get('/roadmap/phases'),
  getRecommendations: () => api.get('/roadmap/recommendations'),
};

// Progress API
export const progressAPI = {
  get: () => api.get('/progress'),
  updateRoadmap: (day, data) => api.post(`/progress/roadmap/${day}`, data),
  markNewsRead: () => api.post('/progress/news/read'),
  updateFlashcardReview: (count) => api.post('/progress/flashcards/reviewed', { count }),
  updateStudyTime: (minutes) => api.post('/progress/study-time', { minutes }),
  getStatistics: () => api.get('/progress/statistics'),
  reset: () => api.post('/progress/reset'),
};

// Mock Tests API
export const mockTestsAPI = {
  getAll: () => api.get('/mock-tests'),
  getById: (id) => api.get(`/mock-tests/${id}`),
  submit: (id, data) => api.post(`/mock-tests/${id}/submit`, data),
  getResults: () => api.get('/mock-tests/results/all'),
  getUserResults: (userId) => api.get(`/mock-tests/results/user/${userId}`),
};

export default api;

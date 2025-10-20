import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// News API
export const newsAPI = {
  fetchNews: () => api.post('/news/fetch'),
  getTodayNews: () => api.get('/news/today'),
  getArticle: (id) => api.get(`/news/article/${id}`),
};

// Roadmap API
export const roadmapAPI = {
  getDayTasks: (day) => api.get(`/roadmap/day/${day}`),
  completeTask: (taskId) => api.post('/roadmap/task/complete', { task_id: taskId }),
  getProgress: () => api.get('/roadmap/progress'),
};

// Flashcard API
export const flashcardAPI = {
  getDueFlashcards: () => api.get('/flashcards/due'),
  reviewFlashcard: (flashcardId, difficulty) =>
    api.post('/flashcards/review', { flashcard_id: flashcardId, difficulty }),
  generateFlashcards: (articleId) =>
    api.post('/flashcards/generate', { article_id: articleId }),
};

// MCQ API
export const mcqAPI = {
  getRandomMCQs: (count = 10) => api.get(`/mcqs/random?count=${count}`),
  submitAnswer: (mcqId, selectedAnswer) =>
    api.post('/mcqs/submit', { mcq_id: mcqId, selected_answer: selectedAnswer }),
};

// Mains API
export const mainsAPI = {
  evaluateAnswer: (question, answer) =>
    api.post('/mains/evaluate', { question, answer }),
};

export default api;

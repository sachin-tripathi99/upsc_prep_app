const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const newsRoutes = require('./routes/news');
const flashcardRoutes = require('./routes/flashcards');
const roadmapRoutes = require('./routes/roadmap');
const progressRoutes = require('./routes/progress');
const mockTestRoutes = require('./routes/mockTests');

app.use('/api/news', newsRoutes);
app.use('/api/flashcards', flashcardRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/mock-tests', mockTestRoutes);

// MongoDB Connection (optional - using local storage for now)
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));
}

app.get('/', (req, res) => {
  res.json({ message: 'UPSC Prep App API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

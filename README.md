# UPSC Prep App

A comprehensive web application for UPSC Civil Services Examination preparation, featuring daily news updates, intelligent flashcards, detailed 15-month roadmap, and mock tests.

## 🌟 Features

### 1. Daily News Updates
- Curated articles from The Hindu newspaper
- Categorized by subject (History, Polity, Economy, Geography, etc.)
- Importance tags (High, Medium, Low)
- Related topics and tags for better understanding
- Track your reading progress

### 2. Smart Flashcard System
- Spaced repetition algorithm for effective revision
- Comprehensive flashcards covering all UPSC topics
- Filter by category, difficulty, and topic
- Random and sequential study modes
- Self-rating system to optimize review schedule
- Create flashcards for completed roadmap topics

### 3. Detailed 15-Month Roadmap
- Comprehensive day-by-day study plan (450 days)
- 4 distinct phases of preparation
- Monthly themes with specific focus areas
- Daily tasks with study hour recommendations
- Topic-wise breakdown for each day
- Progress tracking for each day
- Proven strategy to crack UPSC CSE

### 4. Mock Tests
- Prelims and CSAT practice tests
- Comprehensive coverage of all subjects
- Performance tracking and analytics
- Detailed test history
- Time management practice

### 5. Progress Tracking
- Study streak monitoring
- Detailed statistics and analytics
- Progress visualization with charts
- Milestone achievements
- Total study time tracking
- Completion rate monitoring

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sachin-tripathi99/upsc_prep_app.git
cd upsc_prep_app
```

2. Install dependencies:
```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```
PORT=5000
NODE_ENV=development
```

### Running the Application

#### Development Mode (runs both server and client):
```bash
npm run dev
```

#### Production Mode:
```bash
# Build the client
npm run build

# Start the server
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
upsc_prep_app/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       ├── services/       # API service layer
│       ├── utils/          # Utility functions
│       ├── App.js
│       ├── App.css
│       └── index.js
├── server/                 # Node.js backend
│   ├── routes/            # API routes
│   │   ├── news.js
│   │   ├── flashcards.js
│   │   ├── roadmap.js
│   │   ├── progress.js
│   │   └── mockTests.js
│   ├── models/            # Data models
│   ├── controllers/       # Route controllers
│   ├── data/              # Static data
│   │   ├── newsData.js
│   │   ├── flashcardsData.js
│   │   └── roadmapData.js
│   └── index.js           # Server entry point
├── .env                   # Environment variables
├── .env.example          # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## 🎯 Study Strategy

### Daily Routine Recommendation:
- **Morning (6 AM - 9 AM)**: NCERT/Standard books reading
- **Mid-Morning (9 AM - 12 PM)**: Note making and concept building
- **Afternoon (12 PM - 2 PM)**: Current affairs (The Hindu + PIB)
- **Evening (4 PM - 7 PM)**: Revision and flashcard practice
- **Night (8 PM - 10 PM)**: Answer writing and MCQ practice

### Weekly Schedule:
- **Monday - Friday**: Core subjects study
- **Saturday**: Weekly revision and test
- **Sunday**: Current affairs compilation and rest

### Important Tips:
- Study consistently for 8-10 hours daily
- Never skip current affairs - read The Hindu daily
- Make concise notes for quick revision
- Practice answer writing regularly from day 1
- Revise each topic at least 3 times
- Solve previous year papers
- Take mock tests regularly from month 6 onwards
- Stay healthy - exercise and meditate daily

## 🛠️ Technology Stack

### Frontend:
- React.js
- React Router DOM
- Axios
- CSS3

### Backend:
- Node.js
- Express.js
- MongoDB (optional - currently using in-memory storage)
- Mongoose

## 📚 API Endpoints

### News API
- `GET /api/news` - Get all news articles
- `GET /api/news/category/:category` - Get news by category
- `GET /api/news/today` - Get today's news
- `GET /api/news/categories` - Get all categories

### Flashcards API
- `GET /api/flashcards` - Get all flashcards
- `GET /api/flashcards/category/:category` - Get flashcards by category
- `GET /api/flashcards/random/:count` - Get random flashcards
- `GET /api/flashcards/due-for-review` - Get due flashcards
- `POST /api/flashcards/review/:id` - Update flashcard review

### Roadmap API
- `GET /api/roadmap` - Get complete roadmap
- `GET /api/roadmap/month/:monthNumber` - Get monthly plan
- `GET /api/roadmap/day/:dayNumber` - Get daily tasks
- `POST /api/roadmap/today` - Get today's tasks
- `GET /api/roadmap/phases` - Get preparation phases
- `GET /api/roadmap/recommendations` - Get study recommendations

### Progress API
- `GET /api/progress` - Get user progress
- `POST /api/progress/roadmap/:day` - Update roadmap progress
- `POST /api/progress/news/read` - Mark news as read
- `POST /api/progress/flashcards/reviewed` - Update flashcard review count
- `POST /api/progress/study-time` - Update study time
- `GET /api/progress/statistics` - Get detailed statistics

### Mock Tests API
- `GET /api/mock-tests` - Get all mock tests
- `GET /api/mock-tests/:id` - Get specific mock test
- `POST /api/mock-tests/:id/submit` - Submit test
- `GET /api/mock-tests/results/all` - Get all results

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- UPSC Prep Team

## 🙏 Acknowledgments

- The Hindu newspaper for news content inspiration
- UPSC CSE syllabus and previous year papers
- All UPSC aspirants for motivation

## 📧 Contact

For any queries or suggestions, please open an issue on GitHub.

---

**Good Luck with your UPSC preparation! Remember: Consistency is the key to success!** 🎯

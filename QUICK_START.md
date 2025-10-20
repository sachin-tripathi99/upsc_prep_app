# UPSC Prep App - Quick Reference Guide

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Seed sample data
npm run seed

# Start development server
npm run dev
```

## 👤 Default Test Users

After running `npm run seed`:

### Admin User
- **Email**: admin@upscprep.com
- **Password**: admin123
- **Access**: Full system access

### Student User
- **Email**: student@upscprep.com
- **Password**: student123
- **Access**: Student features only

## 🔑 API Authentication

All API endpoints are prefixed with `/api` (e.g., `/api/auth/login`).

Get a token:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@upscprep.com","password":"student123"}'
```

Use the token:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  http://localhost:5000/api/auth/me
```

## 📚 Common API Endpoints

### Public Endpoints
```
GET  /api/health            - Check server status
GET  /api/subjects          - List all subjects
```

### Student Endpoints (Requires Auth)
```
GET  /api/subjects/:id      - Get subject details
GET  /api/topics            - List all topics
GET  /api/topics/:id        - Get topic details
GET  /api/tests             - List available tests
GET  /api/tests/:id         - Get test questions
POST /api/tests/:id/submit  - Submit test answers
GET  /api/progress          - View your progress
GET  /api/progress/stats    - View statistics
POST /api/progress/topic/:id/complete - Mark topic complete
```

### Admin Endpoints (Requires Admin Auth)
```
POST   /api/subjects        - Create subject
PUT    /api/subjects/:id    - Update subject
DELETE /api/subjects/:id    - Delete subject
POST   /api/topics          - Create topic
PUT    /api/topics/:id      - Update topic
DELETE /api/topics/:id      - Delete topic
POST   /api/tests           - Create test
PUT    /api/tests/:id       - Update test
DELETE /api/tests/:id       - Delete test
```

## 🧪 Sample API Requests

### Register New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "targetExam": "IAS",
    "targetYear": 2026
  }'
```

### List Subjects
```bash
curl http://localhost:5000/api/subjects
```

### Get Topic Details
```bash
curl http://localhost:5000/api/topics/TOPIC_ID
```

### Submit Test (with token)
```bash
curl -X POST http://localhost:5000/api/tests/TEST_ID/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "answers": {
      "QUESTION_ID_1": "Option A",
      "QUESTION_ID_2": "Option B"
    },
    "timeTaken": 60
  }'
```

### View Progress Statistics (with token)
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:5000/api/progress/stats
```

## 🎯 Exam Types

- **Prelims**: Preliminary examination (objective type)
- **Mains**: Main examination (descriptive type)
- **Both**: Relevant for both exams

## 📊 Test Types

- **Mock Test**: Practice tests
- **Previous Year Paper**: Actual past exam papers
- **Topic Test**: Tests on specific topics
- **Full Length Test**: Complete exam simulation

## 🎓 Difficulty Levels

- **Easy**: Beginner level
- **Medium**: Intermediate level
- **Hard**: Advanced level

## 🏗️ Project Structure

```
upsc_prep_app/
├── server/              # Backend code
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Auth middleware
│   └── index.js        # Server entry point
├── client/             # Frontend code (React)
│   ├── src/           # React components
│   └── public/        # Static files
├── docs/              # Documentation
│   ├── API.md         # API documentation
│   ├── SETUP.md       # Setup guide
│   └── ARCHITECTURE.md # Architecture docs
├── package.json       # Dependencies
├── seed.js           # Sample data script
└── README.md         # Main documentation
```

## 🛠️ NPM Scripts

```bash
npm start        # Start production server
npm run dev      # Start dev server with auto-reload
npm run seed     # Populate database with sample data
npm test         # Run tests
npm run lint     # Check code quality
```

## 🔧 Environment Variables

```
PORT=5000                                    # Server port
MONGO_URI=mongodb://localhost:27017/upsc_prep  # MongoDB connection
JWT_SECRET=your-secret-key                   # JWT signing key
NODE_ENV=development                         # Environment
```

## 📦 Database Collections

1. **users** - User accounts (students & admins)
2. **subjects** - Exam subjects
3. **topics** - Study topics
4. **tests** - Question banks
5. **progresses** - User progress tracking

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Start MongoDB service
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
net start MongoDB  # Windows
```

### Port Already in Use
```bash
# Change PORT in .env file
PORT=5001
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📖 Documentation Files

- **README.md** - Main project documentation
- **docs/API.md** - Complete API reference
- **docs/SETUP.md** - Installation and setup guide
- **docs/ARCHITECTURE.md** - System architecture
- **docs/PROJECT_SUMMARY.md** - Project summary
- **CONTRIBUTING.md** - Contribution guidelines
- **LICENSE** - MIT License

## 🌐 Links

- **Repository**: https://github.com/[your-username]/upsc_prep_app
- **Issues**: https://github.com/[your-username]/upsc_prep_app/issues

## 🤝 Support

For help:
1. Check the documentation in `/docs`
2. Read the troubleshooting section in SETUP.md
3. Open an issue on GitHub

---

**Happy Learning! 📚✨**

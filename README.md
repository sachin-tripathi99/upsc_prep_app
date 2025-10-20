# UPSC Prep App

A comprehensive web application for UPSC/IAS exam preparation, providing students with study materials, mock tests, progress tracking, and more.

## Features

### For Students
- **User Authentication**: Secure registration and login system
- **Subject Management**: Access to all UPSC subjects (Prelims & Mains)
- **Topic-wise Learning**: Organized study materials with difficulty levels
- **Mock Tests**: Multiple types of tests including:
  - Previous Year Papers
  - Full Length Tests
  - Topic-wise Tests
  - Subject-wise Tests
- **Progress Tracking**: Monitor your preparation journey with detailed analytics
- **Performance Analytics**: View subject-wise performance and improvement trends
- **Resource Library**: Access to curated study resources (articles, videos, PDFs)

### For Administrators
- **Content Management**: Create and manage subjects, topics, and tests
- **Question Bank**: Build comprehensive question banks with explanations
- **User Management**: Monitor student registrations and activity

## Technology Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** for database
- **JWT** for authentication
- **Bcrypt** for password hashing

### Key Dependencies
- express
- mongoose
- jsonwebtoken
- bcryptjs
- cors
- express-validator

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/[your-username]/upsc_prep_app.git
cd upsc_prep_app
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and update the following:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/upsc_prep
JWT_SECRET=your-secure-secret-key
NODE_ENV=development
```

4. Start MongoDB:
```bash
# On Linux/Mac
sudo systemctl start mongod

# On Windows
net start MongoDB
```

5. Run the application:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "targetExam": "IAS",
  "targetYear": 2026
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Subject Endpoints

#### Get All Subjects
```http
GET /api/subjects
GET /api/subjects?examType=Prelims
GET /api/subjects?isOptional=true
```

#### Get Subject by ID
```http
GET /api/subjects/:id
```

#### Create Subject (Admin only)
```http
POST /api/subjects
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "History",
  "code": "HIST",
  "description": "Ancient, Medieval and Modern Indian History",
  "examType": "Both",
  "isOptional": false
}
```

### Topic Endpoints

#### Get All Topics
```http
GET /api/topics
GET /api/topics?subject=<subjectId>
GET /api/topics?difficulty=Medium
```

#### Get Topic by ID
```http
GET /api/topics/:id
```

#### Create Topic (Admin only)
```http
POST /api/topics
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Mughal Empire",
  "subject": "<subjectId>",
  "description": "Rise and fall of Mughal Empire in India",
  "difficulty": "Medium",
  "estimatedTime": 5,
  "resources": [
    {
      "title": "NCERT Class 12 History",
      "type": "Book",
      "url": "https://example.com/ncert"
    }
  ]
}
```

### Test Endpoints

#### Get All Tests
```http
GET /api/tests
GET /api/tests?type=Mock Test
GET /api/tests?examType=Prelims
GET /api/tests?subject=<subjectId>
```

#### Get Test by ID
```http
GET /api/tests/:id
Authorization: Bearer <token>
```

#### Submit Test
```http
POST /api/tests/:id/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "answers": {
    "<questionId1>": "Option A",
    "<questionId2>": "Option B"
  },
  "timeTaken": 120
}
```

#### Create Test (Admin only)
```http
POST /api/tests
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "UPSC Prelims 2023",
  "description": "Previous year question paper",
  "type": "Previous Year Paper",
  "examType": "Prelims",
  "duration": 120,
  "totalMarks": 200,
  "questions": [
    {
      "questionText": "Which of the following is correct?",
      "options": [
        { "text": "Option A", "isCorrect": false },
        { "text": "Option B", "isCorrect": true }
      ],
      "explanation": "Detailed explanation here",
      "marks": 2,
      "negativeMarks": 0.66
    }
  ]
}
```

### Progress Endpoints

#### Get User Progress
```http
GET /api/progress
Authorization: Bearer <token>
GET /api/progress?type=Test Attempted
GET /api/progress?subject=<subjectId>
```

#### Get Progress Statistics
```http
GET /api/progress/stats
Authorization: Bearer <token>
```

#### Mark Topic as Completed
```http
POST /api/progress/topic/:topicId/complete
Authorization: Bearer <token>
```

## Database Schema

### User
- name: String
- email: String (unique)
- password: String (hashed)
- role: String (student/admin)
- targetExam: String (IAS/IPS/IFS/IRS/Other)
- targetYear: Number
- createdAt: Date
- lastLoginAt: Date

### Subject
- name: String
- code: String (unique)
- description: String
- examType: String (Prelims/Mains/Both)
- isOptional: Boolean
- topics: Array of Topic IDs

### Topic
- name: String
- subject: Subject ID
- description: String
- difficulty: String (Easy/Medium/Hard)
- estimatedTime: Number (hours)
- resources: Array of Resource objects

### Test
- title: String
- description: String
- type: String (Mock Test/Previous Year Paper/Topic Test/Full Length Test)
- examType: String (Prelims/Mains)
- subject: Subject ID
- duration: Number (minutes)
- totalMarks: Number
- questions: Array of Question objects
- isActive: Boolean

### Progress
- user: User ID
- subject: Subject ID
- topic: Topic ID
- test: Test ID
- type: String (Topic Completed/Test Attempted)
- score: Number
- totalMarks: Number
- timeTaken: Number (minutes)
- answers: Array of Answer objects
- completedAt: Date

## Project Structure

```
upsc_prep_app/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Subject.js
│   │   ├── Topic.js
│   │   ├── Test.js
│   │   └── Progress.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── subjects.js
│   │   ├── topics.js
│   │   ├── tests.js
│   │   └── progress.js
│   ├── middleware/
│   │   └── auth.js
│   └── index.js
├── docs/
│   └── API.md
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Testing

Run tests:
```bash
npm test
```

## Development

For development with auto-reload:
```bash
npm run dev
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.

## Roadmap

### Phase 1 (Current)
- [x] Basic authentication system
- [x] Subject and topic management
- [x] Mock test system
- [x] Progress tracking

### Phase 2 (Planned)
- [ ] Frontend web application (React)
- [ ] Mobile app (React Native)
- [ ] Current affairs module
- [ ] Daily quiz feature
- [ ] Discussion forums
- [ ] Live classes integration

### Phase 3 (Future)
- [ ] AI-powered personalized study plans
- [ ] Answer writing practice for Mains
- [ ] Interview preparation module
- [ ] Peer learning features
- [ ] Gamification and rewards system
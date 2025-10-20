# UPSC Prep App - Architecture Documentation

## Overview

The UPSC Prep App is a full-stack web application designed to help students prepare for UPSC/IAS civil services examinations. It provides study materials, mock tests, progress tracking, and analytics.

## Technology Stack

### Backend
- **Runtime**: Node.js (v14+)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Bcrypt.js
- **Validation**: Express-validator

### Frontend (Planned)
- **Framework**: React.js
- **Routing**: React Router
- **HTTP Client**: Axios
- **State Management**: React Context API / Redux (future)

### DevOps & Tools
- **Version Control**: Git
- **Testing**: Jest
- **Linting**: ESLint
- **Package Manager**: npm

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  (Web Browser - React Application)                          │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTP/HTTPS
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway Layer                       │
│  (Express.js Server with CORS & Middleware)                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Authentication Layer                      │
│  (JWT Token Validation & Role-based Access Control)         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      Business Logic Layer                    │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐  │
│  │  Auth    │ Subjects │  Topics  │  Tests   │ Progress │  │
│  │ Routes   │  Routes  │  Routes  │  Routes  │  Routes  │  │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      Data Access Layer                       │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐  │
│  │   User   │ Subject  │  Topic   │   Test   │ Progress │  │
│  │  Model   │  Model   │  Model   │  Model   │  Model   │  │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                       Database Layer                         │
│  (MongoDB - Collections & Documents)                        │
└─────────────────────────────────────────────────────────────┘
```

## Database Schema

### Collections

#### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: 'student', 'admin'),
  targetExam: String (enum: 'IAS', 'IPS', 'IFS', 'IRS', 'Other'),
  targetYear: Number,
  createdAt: Date,
  lastLoginAt: Date
}
```

#### Subjects Collection
```javascript
{
  _id: ObjectId,
  name: String,
  code: String (unique),
  description: String,
  examType: String (enum: 'Prelims', 'Mains', 'Both'),
  isOptional: Boolean,
  topics: [ObjectId] (ref: Topic),
  createdAt: Date
}
```

#### Topics Collection
```javascript
{
  _id: ObjectId,
  name: String,
  subject: ObjectId (ref: Subject),
  description: String,
  difficulty: String (enum: 'Easy', 'Medium', 'Hard'),
  estimatedTime: Number (hours),
  resources: [{
    title: String,
    type: String (enum: 'Article', 'Video', 'PDF', 'Book', 'Website'),
    url: String
  }],
  createdAt: Date
}
```

#### Tests Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  type: String (enum: 'Mock Test', 'Previous Year Paper', 'Topic Test', 'Full Length Test'),
  examType: String (enum: 'Prelims', 'Mains'),
  subject: ObjectId (ref: Subject),
  duration: Number (minutes),
  totalMarks: Number,
  questions: [{
    questionText: String,
    options: [{
      text: String,
      isCorrect: Boolean
    }],
    correctAnswer: String,
    explanation: String,
    marks: Number,
    negativeMarks: Number
  }],
  isActive: Boolean,
  createdAt: Date
}
```

#### Progress Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  subject: ObjectId (ref: Subject),
  topic: ObjectId (ref: Topic),
  test: ObjectId (ref: Test),
  type: String (enum: 'Topic Completed', 'Test Attempted'),
  score: Number,
  totalMarks: Number,
  timeTaken: Number (minutes),
  answers: [{
    questionId: ObjectId,
    selectedAnswer: String,
    isCorrect: Boolean
  }],
  completedAt: Date
}
```

## API Architecture

### RESTful Endpoints Structure

```
/api
├── /auth
│   ├── POST   /register      - Register new user
│   ├── POST   /login         - Authenticate user
│   └── GET    /me            - Get current user (protected)
├── /subjects
│   ├── GET    /              - List all subjects
│   ├── GET    /:id           - Get subject by ID
│   ├── POST   /              - Create subject (admin)
│   ├── PUT    /:id           - Update subject (admin)
│   └── DELETE /:id           - Delete subject (admin)
├── /topics
│   ├── GET    /              - List all topics
│   ├── GET    /:id           - Get topic by ID
│   ├── POST   /              - Create topic (admin)
│   ├── PUT    /:id           - Update topic (admin)
│   └── DELETE /:id           - Delete topic (admin)
├── /tests
│   ├── GET    /              - List all tests
│   ├── GET    /:id           - Get test by ID (protected)
│   ├── POST   /:id/submit    - Submit test (protected)
│   ├── POST   /              - Create test (admin)
│   ├── PUT    /:id           - Update test (admin)
│   └── DELETE /:id           - Delete test (admin)
└── /progress
    ├── GET    /              - Get user progress (protected)
    ├── GET    /stats         - Get progress stats (protected)
    └── POST   /topic/:id/complete - Mark topic complete (protected)
```

## Security Architecture

### Authentication Flow

1. **User Registration**:
   - User submits registration data
   - Password is hashed using bcrypt
   - User document created in database
   - JWT token generated and returned

2. **User Login**:
   - User submits credentials
   - Password verified against hashed password
   - JWT token generated with user ID
   - Token returned to client

3. **Protected Route Access**:
   - Client sends JWT token in Authorization header
   - Middleware validates token
   - User information attached to request
   - Route handler processes request

### Authorization Levels

- **Public**: Accessible without authentication
  - Health check
  - List subjects (read-only)

- **Student**: Requires authentication
  - View topics and resources
  - Attempt tests
  - View progress
  - Mark topics as completed

- **Admin**: Requires authentication + admin role
  - All student permissions
  - Create/update/delete subjects
  - Create/update/delete topics
  - Create/update/delete tests
  - View all users' progress (future)

### Security Measures

1. **Password Security**:
   - Bcrypt with salt rounds
   - Passwords never stored in plain text
   - Password complexity requirements (future)

2. **Token Security**:
   - JWT with expiration (7 days)
   - Secret key from environment variable
   - Token refresh mechanism (future)

3. **Input Validation**:
   - Express-validator for all inputs
   - Mongoose schema validation
   - Sanitization of user inputs

4. **API Security**:
   - CORS configuration
   - Rate limiting (future)
   - Request size limits
   - SQL injection prevention (N/A - NoSQL)

## Data Flow

### Test Submission Flow

```
1. Student requests test → GET /api/tests/:id
2. Server returns test questions (without answers)
3. Student submits answers → POST /api/tests/:id/submit
4. Server evaluates answers:
   - Calculate score
   - Apply negative marking
   - Generate detailed results
5. Server saves progress to database
6. Server returns results to student
```

### Progress Tracking Flow

```
1. Student completes topic → POST /api/progress/topic/:id/complete
2. Server creates progress record
3. Progress linked to user and topic
4. Student views stats → GET /api/progress/stats
5. Server aggregates data:
   - Total tests attempted
   - Average score
   - Subject-wise performance
6. Server returns analytics
```

## Scalability Considerations

### Current Implementation
- Single server instance
- Direct MongoDB connection
- Synchronous request processing

### Future Improvements

1. **Horizontal Scaling**:
   - Load balancer for multiple server instances
   - Session management with Redis
   - Stateless API design

2. **Database Optimization**:
   - MongoDB indexes on frequently queried fields
   - Database connection pooling
   - Read replicas for read-heavy operations

3. **Caching**:
   - Redis for frequently accessed data
   - CDN for static assets
   - API response caching

4. **Performance**:
   - Pagination for large datasets
   - Lazy loading for frontend
   - Database query optimization

5. **Monitoring**:
   - Application performance monitoring (APM)
   - Error tracking (Sentry)
   - Logging (Winston, Morgan)
   - Health checks and alerts

## Development Workflow

### Local Development
1. Clone repository
2. Install dependencies
3. Configure environment variables
4. Start MongoDB
5. Run seed script (optional)
6. Start development server
7. Make changes with hot-reload

### Testing Strategy
1. **Unit Tests**: Individual functions and utilities
2. **Integration Tests**: API endpoints
3. **End-to-End Tests**: Complete user workflows (future)

### Deployment Pipeline (Future)
1. Push code to GitHub
2. CI/CD pipeline triggers (GitHub Actions)
3. Run tests and linting
4. Build application
5. Deploy to staging environment
6. Manual approval
7. Deploy to production

## Module Breakdown

### Server Modules

#### `/server/index.js`
- Entry point
- Express server setup
- Middleware configuration
- Route registration
- Database connection

#### `/server/models/`
- Mongoose schemas
- Data validation
- Virtual properties
- Model methods

#### `/server/routes/`
- Route definitions
- Request validation
- Business logic delegation
- Response formatting

#### `/server/middleware/`
- Authentication middleware
- Error handling middleware
- Logging middleware (future)
- Rate limiting (future)

#### `/server/controllers/` (Future)
- Business logic separation
- Service layer integration
- Complex operations

## Error Handling

### Current Approach
- Try-catch blocks in async handlers
- Mongoose validation errors
- Express-validator errors
- Custom error messages

### Future Improvements
- Centralized error handling middleware
- Error logging service
- User-friendly error messages
- Error codes and internationalization

## Monitoring & Logging (Future)

### Metrics to Track
- API response times
- Error rates
- User registrations
- Test attempts
- Database query performance

### Logging Strategy
- Request/response logging
- Error logging
- Audit logging for admin actions
- Performance logging

## Backup & Recovery (Future)

### Database Backups
- Automated daily backups
- Point-in-time recovery
- Backup retention policy
- Disaster recovery plan

## Compliance & Privacy

### Data Protection
- User password hashing
- Secure token storage
- HTTPS enforcement (production)
- Data encryption at rest (future)

### User Privacy
- Minimal data collection
- User consent for data usage
- Data export capability (future)
- Account deletion (future)

## Future Enhancements

### Phase 2
- React frontend application
- Real-time progress updates
- Current affairs module
- Discussion forums

### Phase 3
- Mobile application (React Native)
- AI-powered study recommendations
- Answer writing practice
- Interview preparation module
- Live classes integration

### Phase 4
- Peer learning features
- Gamification
- Social features
- Premium subscription model

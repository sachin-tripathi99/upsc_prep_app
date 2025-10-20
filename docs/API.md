# UPSC Prep App - API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Response Format

### Success Response
```json
{
  "data": { ... },
  "message": "Success message"
}
```

### Error Response
```json
{
  "message": "Error message",
  "errors": [ ... ]
}
```

## Endpoints

### Authentication

#### 1. Register User
Creates a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "targetExam": "IAS",
  "targetYear": 2026
}
```

**Response:** `201 Created`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60f7b3b3e6b3a0001f9c8e3a",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

#### 2. Login
Authenticates a user and returns a JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60f7b3b3e6b3a0001f9c8e3a",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

#### 3. Get Current User
Returns the authenticated user's information.

**Endpoint:** `GET /auth/me`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "user": {
    "id": "60f7b3b3e6b3a0001f9c8e3a",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "targetExam": "IAS",
    "targetYear": 2026
  }
}
```

### Subjects

#### 1. Get All Subjects
Retrieves all subjects with optional filters.

**Endpoint:** `GET /subjects`

**Query Parameters:**
- `examType` (optional): Filter by exam type (Prelims, Mains, Both)
- `isOptional` (optional): Filter by optional status (true, false)

**Example:** `GET /subjects?examType=Prelims&isOptional=false`

**Response:** `200 OK`
```json
{
  "subjects": [
    {
      "_id": "60f7b3b3e6b3a0001f9c8e3b",
      "name": "History",
      "code": "HIST",
      "description": "Ancient, Medieval and Modern Indian History",
      "examType": "Both",
      "isOptional": false,
      "topics": [...],
      "createdAt": "2024-07-21T10:00:00.000Z"
    }
  ]
}
```

#### 2. Get Subject by ID
Retrieves a specific subject with its topics.

**Endpoint:** `GET /subjects/:id`

**Response:** `200 OK`
```json
{
  "subject": {
    "_id": "60f7b3b3e6b3a0001f9c8e3b",
    "name": "History",
    "code": "HIST",
    "description": "Ancient, Medieval and Modern Indian History",
    "examType": "Both",
    "isOptional": false,
    "topics": [...]
  }
}
```

#### 3. Create Subject (Admin Only)
Creates a new subject.

**Endpoint:** `POST /subjects`

**Headers:** `Authorization: Bearer <admin-token>`

**Request Body:**
```json
{
  "name": "Geography",
  "code": "GEO",
  "description": "Physical and Human Geography",
  "examType": "Both",
  "isOptional": false
}
```

**Response:** `201 Created`

#### 4. Update Subject (Admin Only)
Updates an existing subject.

**Endpoint:** `PUT /subjects/:id`

**Headers:** `Authorization: Bearer <admin-token>`

#### 5. Delete Subject (Admin Only)
Deletes a subject.

**Endpoint:** `DELETE /subjects/:id`

**Headers:** `Authorization: Bearer <admin-token>`

### Topics

#### 1. Get All Topics
Retrieves all topics with optional filters.

**Endpoint:** `GET /topics`

**Query Parameters:**
- `subject` (optional): Filter by subject ID
- `difficulty` (optional): Filter by difficulty (Easy, Medium, Hard)

**Response:** `200 OK`
```json
{
  "topics": [
    {
      "_id": "60f7b3b3e6b3a0001f9c8e3c",
      "name": "Mughal Empire",
      "subject": {...},
      "description": "Rise and fall of Mughal Empire",
      "difficulty": "Medium",
      "estimatedTime": 5,
      "resources": [
        {
          "title": "NCERT Class 12",
          "type": "Book",
          "url": "https://example.com"
        }
      ]
    }
  ]
}
```

#### 2. Get Topic by ID
Retrieves a specific topic.

**Endpoint:** `GET /topics/:id`

#### 3. Create Topic (Admin Only)
Creates a new topic.

**Endpoint:** `POST /topics`

**Headers:** `Authorization: Bearer <admin-token>`

**Request Body:**
```json
{
  "name": "Mughal Empire",
  "subject": "60f7b3b3e6b3a0001f9c8e3b",
  "description": "Detailed study of Mughal Empire",
  "difficulty": "Medium",
  "estimatedTime": 5,
  "resources": [
    {
      "title": "NCERT Class 12 History",
      "type": "Book",
      "url": "https://example.com/resource"
    }
  ]
}
```

#### 4. Update Topic (Admin Only)
Updates an existing topic.

**Endpoint:** `PUT /topics/:id`

#### 5. Delete Topic (Admin Only)
Deletes a topic.

**Endpoint:** `DELETE /topics/:id`

### Tests

#### 1. Get All Tests
Retrieves all active tests with optional filters.

**Endpoint:** `GET /tests`

**Query Parameters:**
- `type` (optional): Filter by test type
- `examType` (optional): Filter by exam type
- `subject` (optional): Filter by subject ID

**Response:** `200 OK`
```json
{
  "tests": [
    {
      "_id": "60f7b3b3e6b3a0001f9c8e3d",
      "title": "UPSC Prelims 2023",
      "description": "Previous year paper",
      "type": "Previous Year Paper",
      "examType": "Prelims",
      "subject": {...},
      "duration": 120,
      "totalMarks": 200
    }
  ]
}
```

#### 2. Get Test by ID (Authenticated)
Retrieves a specific test with questions (without answers).

**Endpoint:** `GET /tests/:id`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "test": {
    "_id": "60f7b3b3e6b3a0001f9c8e3d",
    "title": "UPSC Prelims 2023",
    "questions": [
      {
        "_id": "60f7b3b3e6b3a0001f9c8e3e",
        "questionText": "Which is correct?",
        "options": [
          { "text": "Option A" },
          { "text": "Option B" }
        ],
        "marks": 2,
        "negativeMarks": 0.66
      }
    ]
  }
}
```

#### 3. Submit Test (Authenticated)
Submits test answers and returns results.

**Endpoint:** `POST /tests/:id/submit`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "answers": {
    "60f7b3b3e6b3a0001f9c8e3e": "Option B",
    "60f7b3b3e6b3a0001f9c8e3f": "Option A"
  },
  "timeTaken": 110
}
```

**Response:** `200 OK`
```json
{
  "score": 150,
  "totalMarks": 200,
  "percentage": "75.00",
  "results": [
    {
      "questionId": "60f7b3b3e6b3a0001f9c8e3e",
      "selectedAnswer": "Option B",
      "correctAnswer": "Option B",
      "isCorrect": true,
      "explanation": "Detailed explanation..."
    }
  ]
}
```

#### 4. Create Test (Admin Only)
Creates a new test.

**Endpoint:** `POST /tests`

**Headers:** `Authorization: Bearer <admin-token>`

**Request Body:**
```json
{
  "title": "Geography Mock Test 1",
  "description": "Comprehensive test on physical geography",
  "type": "Mock Test",
  "examType": "Prelims",
  "subject": "60f7b3b3e6b3a0001f9c8e3b",
  "duration": 120,
  "totalMarks": 200,
  "questions": [
    {
      "questionText": "Which is the longest river?",
      "options": [
        { "text": "Nile", "isCorrect": true },
        { "text": "Amazon", "isCorrect": false },
        { "text": "Ganges", "isCorrect": false },
        { "text": "Yangtze", "isCorrect": false }
      ],
      "explanation": "The Nile is traditionally considered...",
      "marks": 2,
      "negativeMarks": 0.66
    }
  ]
}
```

#### 5. Update Test (Admin Only)
Updates an existing test.

**Endpoint:** `PUT /tests/:id`

#### 6. Delete Test (Admin Only)
Deletes a test.

**Endpoint:** `DELETE /tests/:id`

### Progress

#### 1. Get User Progress (Authenticated)
Retrieves the authenticated user's progress.

**Endpoint:** `GET /progress`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `type` (optional): Filter by progress type
- `subject` (optional): Filter by subject ID

**Response:** `200 OK`
```json
{
  "progress": [
    {
      "_id": "60f7b3b3e6b3a0001f9c8e40",
      "user": "60f7b3b3e6b3a0001f9c8e3a",
      "test": {...},
      "type": "Test Attempted",
      "score": 150,
      "totalMarks": 200,
      "timeTaken": 110,
      "completedAt": "2024-07-21T14:30:00.000Z"
    }
  ]
}
```

#### 2. Get Progress Statistics (Authenticated)
Retrieves statistical summary of user's progress.

**Endpoint:** `GET /progress/stats`

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "totalTests": 25,
  "averageScore": "72.50",
  "totalTopicsCompleted": 45,
  "subjectStats": [
    {
      "_id": "60f7b3b3e6b3a0001f9c8e3b",
      "averageScore": 75.5,
      "testsAttempted": 10
    }
  ]
}
```

#### 3. Mark Topic as Completed (Authenticated)
Marks a topic as completed.

**Endpoint:** `POST /progress/topic/:topicId/complete`

**Headers:** `Authorization: Bearer <token>`

**Response:** `201 Created`
```json
{
  "progress": {
    "_id": "60f7b3b3e6b3a0001f9c8e41",
    "user": "60f7b3b3e6b3a0001f9c8e3a",
    "topic": "60f7b3b3e6b3a0001f9c8e3c",
    "type": "Topic Completed",
    "completedAt": "2024-07-21T15:00:00.000Z"
  }
}
```

## Error Codes

- `400 Bad Request`: Invalid input or validation error
- `401 Unauthorized`: Missing or invalid authentication token
- `403 Forbidden`: Insufficient permissions (e.g., admin-only endpoint)
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Rate Limiting

Currently, there is no rate limiting implemented. This may be added in future versions.

## Pagination

For endpoints that return lists, pagination will be added in future versions.

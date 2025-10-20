# Architecture Documentation

## System Architecture

IAS-Prime follows a three-tier local-first architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                    User's Local Machine                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Frontend (React)                         │  │
│  │  Port: 3000                                          │  │
│  │  - Home Dashboard                                    │  │
│  │  - Daily Briefing UI                                 │  │
│  │  - Roadmap Tracker                                   │  │
│  │  - Flashcard System                                  │  │
│  │  - MCQ Practice                                      │  │
│  │  - Mains Evaluator                                   │  │
│  └──────────────┬───────────────────────────────────────┘  │
│                 │ HTTP/REST API                             │
│                 ▼                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Backend (Python FastAPI)                      │  │
│  │  Port: 8000                                          │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │  API Endpoints                               │   │  │
│  │  │  - /api/news/*                              │   │  │
│  │  │  - /api/roadmap/*                           │   │  │
│  │  │  - /api/flashcards/*                        │   │  │
│  │  │  - /api/mcqs/*                              │   │  │
│  │  │  - /api/mains/*                             │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │  Services                                    │   │  │
│  │  │  - News Scraper                             │   │  │
│  │  │  - AI Service (Ollama Integration)          │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  └──────────────┬───────────────────────────────────────┘  │
│                 │                                             │
│                 ▼                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         SQLite Database                               │  │
│  │  File: ias_prime.db                                  │  │
│  │  - articles                                          │  │
│  │  - tasks                                             │  │
│  │  - flashcards                                        │  │
│  │  - mcqs                                              │  │
│  │  - progress                                          │  │
│  │  - mains_answers                                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Ollama (Local AI)                             │  │
│  │  Port: 11434                                         │  │
│  │  Model: llama3:8b or mistral:7b                     │  │
│  │  - Summarization                                     │  │
│  │  - Topic Tagging                                     │  │
│  │  - Flashcard Generation                             │  │
│  │  - Answer Evaluation                                │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                          │
                          │ HTTP (Only for data fetching)
                          ▼
              ┌───────────────────────┐
              │   External Sources    │
              │   - PIB RSS           │
              │   - The Hindu RSS     │
              │   - Indian Express RSS │
              │   - Free UPSC Sites   │
              └───────────────────────┘
```

## Data Flow

### 1. News Fetching Flow

```
User clicks "Fetch News"
    │
    ▼
Frontend → POST /api/news/fetch → Backend
                                     │
                                     ▼
                            News Scraper Service
                                     │
                                     ├─→ Fetch RSS Feeds
                                     ├─→ Scrape Articles
                                     └─→ Return raw articles
                                     │
                                     ▼
                            AI Service (Ollama)
                                     │
                                     ├─→ Generate summaries
                                     ├─→ Tag with topics
                                     └─→ Return processed data
                                     │
                                     ▼
                            Save to SQLite DB
                                     │
                                     ▼
                            Return success ← Frontend displays articles
```

### 2. Task Completion Flow

```
User checks task as done
    │
    ▼
Frontend → POST /api/roadmap/task/complete → Backend
                                                │
                                                ▼
                                        Update task status
                                                │
                                                ▼
                                        Unlock flashcards
                                        with matching topic_tag
                                                │
                                                ▼
                                        Update progress stats
                                                │
                                                ▼
                                        Return success ← Frontend refreshes
```

### 3. Flashcard Review Flow

```
User reviews flashcard
    │
    ▼
Frontend → POST /api/flashcards/review → Backend
                                           │
                                           ▼
                                    SM-2 Algorithm
                                    (Spaced Repetition)
                                           │
                                           ▼
                                    Calculate next review date
                                           │
                                           ▼
                                    Update flashcard
                                           │
                                           ▼
                                    Update progress stats
                                           │
                                           ▼
                                    Return next date ← Frontend shows next card
```

### 4. Mains Evaluation Flow

```
User writes answer
    │
    ▼
Frontend → POST /api/mains/evaluate → Backend
                                        │
                                        ▼
                                AI Service (Ollama)
                                        │
                                        ├─→ Analyze structure
                                        ├─→ Check keywords
                                        ├─→ Grade out of 10
                                        └─→ Generate feedback
                                        │
                                        ▼
                                Save to database
                                        │
                                        ▼
                                Return evaluation ← Frontend displays score
```

## Database Schema

### Articles Table
```sql
CREATE TABLE articles (
    id INTEGER PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content TEXT,
    summary_short TEXT,
    summary_long TEXT,
    source VARCHAR(100),
    date DATE,
    topic_tags VARCHAR(500),
    url VARCHAR(1000),
    created_at DATETIME
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY,
    task_id VARCHAR(50) UNIQUE NOT NULL,
    day_number INTEGER NOT NULL,
    task_text VARCHAR(500),
    topic_tag VARCHAR(100),
    completed BOOLEAN DEFAULT 0,
    completion_date DATETIME
);
```

### Flashcards Table
```sql
CREATE TABLE flashcards (
    id INTEGER PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    topic_tag VARCHAR(100),
    difficulty VARCHAR(20) DEFAULT 'medium',
    next_review_date DATE,
    ease_factor FLOAT DEFAULT 2.5,
    interval INTEGER DEFAULT 0,
    repetitions INTEGER DEFAULT 0,
    is_unlocked BOOLEAN DEFAULT 0,
    created_at DATETIME
);
```

### MCQs Table
```sql
CREATE TABLE mcqs (
    id INTEGER PRIMARY KEY,
    question TEXT NOT NULL,
    option_a VARCHAR(500),
    option_b VARCHAR(500),
    option_c VARCHAR(500),
    option_d VARCHAR(500),
    correct_answer VARCHAR(1),
    explanation TEXT,
    topic VARCHAR(100),
    source VARCHAR(100),
    difficulty VARCHAR(20) DEFAULT 'medium',
    created_at DATETIME
);
```

### Progress Table
```sql
CREATE TABLE progress (
    id INTEGER PRIMARY KEY,
    user_id VARCHAR(50) DEFAULT 'default_user',
    current_day INTEGER DEFAULT 1,
    start_date DATE,
    notes TEXT,
    total_tasks_completed INTEGER DEFAULT 0,
    flashcards_reviewed INTEGER DEFAULT 0,
    mcqs_attempted INTEGER DEFAULT 0,
    last_activity DATETIME
);
```

## API Endpoints

### News Module
- `POST /api/news/fetch` - Trigger news fetching and processing
- `GET /api/news/today` - Get today's processed articles
- `GET /api/news/article/{id}` - Get specific article details

### Roadmap Module
- `GET /api/roadmap/day/{day_number}` - Get tasks for a specific day
- `POST /api/roadmap/task/complete` - Mark task as complete
- `GET /api/roadmap/progress` - Get overall progress statistics

### Flashcard Module
- `GET /api/flashcards/due` - Get flashcards due for review
- `POST /api/flashcards/review` - Record review and update schedule
- `POST /api/flashcards/generate` - Generate flashcards from article

### MCQ Module
- `GET /api/mcqs/random?count=10` - Get random MCQs
- `POST /api/mcqs/submit` - Submit answer and get result

### Mains Module
- `POST /api/mains/evaluate` - Evaluate written answer

## Technology Stack

### Backend
- **Framework:** FastAPI 0.109.0
- **Database:** SQLite (via SQLAlchemy 2.0.25)
- **AI Integration:** Ollama (via httpx)
- **Web Scraping:** BeautifulSoup4, feedparser
- **Server:** Uvicorn with auto-reload

### Frontend
- **Framework:** React 18.2.0
- **Routing:** React Router DOM 6.21.0
- **HTTP Client:** Axios 1.6.5
- **Build Tool:** React Scripts 5.0.1

### AI
- **Runtime:** Ollama
- **Models:** Llama 3 8B or Mistral 7B
- **Tasks:** Summarization, tagging, generation, evaluation

## Security Considerations

### Local-First Design
- All data stored locally
- No user authentication needed (single-user app)
- No cloud services or external APIs

### Web Scraping
- Respects robots.txt
- Implements rate limiting
- Only public information
- User responsible for compliance

### Database
- SQLite file-based (ias_prime.db)
- No network exposure
- Regular backups recommended

## Performance Characteristics

### Backend
- **Startup Time:** < 2 seconds
- **API Response:** 10-100ms (without AI)
- **AI Processing:** 5-30 seconds (depends on model and hardware)

### Frontend
- **Initial Load:** < 3 seconds
- **Page Navigation:** < 100ms
- **Hot Reload:** < 1 second

### Database
- **Query Time:** < 10ms for most queries
- **Maximum Size:** Unlimited (SQLite supports TB-scale)
- **Concurrent Access:** Single writer, multiple readers

## Scalability

### Data Volumes
- **Articles:** Thousands per year
- **Flashcards:** 10,000+ cards
- **MCQs:** 20,000+ questions
- **User Progress:** Tracked for 450+ days

### Hardware Requirements
- **Minimum:** 4GB RAM, Dual-core CPU
- **Recommended:** 8GB+ RAM, Quad-core CPU
- **Storage:** 5-10GB for data and models

## Future Enhancements

### Planned Features
1. Multi-user support (family/study group)
2. Cloud sync (optional)
3. Mobile app (React Native)
4. Advanced analytics dashboard
5. Custom roadmap creator
6. Export/import functionality
7. Offline AI models (smaller)
8. Voice note integration

### Performance Improvements
1. Database indexing optimization
2. Caching layer for frequent queries
3. Lazy loading for large datasets
4. Background task processing
5. Model quantization for faster AI

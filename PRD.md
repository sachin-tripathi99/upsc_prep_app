# Product Requirement Document: "IAS-Prime" (Local-First Edition)

## 1. Project Vision

To create a 100% free, local-first, all-in-one desktop application that guides a UPSC aspirant through a fixed 15-month plan, using locally-run AI and web scraping to provide all necessary tools and content without any subscriptions.

## 2. Core Architecture (Local-First Model)

  * **Deployment:** This is a **local-only application** (e.g., a Python backend server and a web-based frontend) that runs entirely on the user's computer. It will not be deployed to the cloud.
  * **Data Storage:** All user data (progress, notes, to-do lists, flashcards) will be stored in a local **`SQLite`** database file (`ias_prime.db`). This is free, serverless, and perfect for this use case.
  * **Data Ingestion:** The app requires an internet connection *only* to run its data-fetching scripts (for news, etc.).
  * **Cost Model:** **Zero-Cost.** This is achieved by:
    1.  Using open-source software (Python, React/Svelte, SQLite).
    2.  Using a **local AI model** via `Ollama` (e.g., `Mistral 7B` or `Llama 3 8B`) for all AI tasks (summarization, tagging, evaluation). This runs on the user's machine and costs nothing.
    3.  Using **RSS Feeds** and **Web Scraping** for data, not paid APIs.

## 3. Detailed Feature Modules (Local-First Strategy)

### Module 1: The "Daily Briefing" (Scraper & Local-AI Engine)

This module runs a script *on the user's machine* to fetch and process news.

#### 1.1. Data Source (The "Loophole")
  * We will **not** use paid APIs. The app will have a "Fetch Today's News" button that triggers a Python script.
  * **Strategy:**
    * **`PIB` / `PRS`:** These are government sites. We can legally and easily use their **public RSS Feeds** to get 100% of their content. (Easy win).
    * **`The Hindu` / `Indian Express`:** These have paywalls. Direct scraping is brittle.
    * **Solution:** We will use their **public RSS Feeds** to get headlines and short snippets. For full-article text, the app will *attempt* to scrape the article link. If blocked by a paywall, it will fall back to scraping **free UPSC news aggregator sites** (e.g., *IASBaba, InsightsIAS, GKToday*) that have already summarized the same article. This is our primary "loophole" for curated news.

#### 1.2. Local AI Processing
  * Once the raw text is fetched, it is piped to the **local `Ollama` model** running on the user's machine.
  * The AI will be prompted to:
    1.  **Summarize** the article (50-word and 250-word versions).
    2.  **Tag** the article with relevant UPSC Syllabus topics (e.g., `GS-II > Polity`).
    3.  **Deconstruct** editorials (Pros, Cons, Keywords).

#### 1.3. Storage
  * All processed articles and summaries are saved directly into the local `SQLite` database.

### Module 2: The "15-Month Static Roadmap" (Fixed Plan)

This module is the core tracker, based on a "fixed" (pre-built) plan.

#### 2.1. The "Master Blueprint" (Fixed)
  * The entire 15-month, day-by-day plan will be stored in a **local `JSON` or `YAML` file** (e.g., `roadmap.json`). This file is **the core of the app** and must be meticulously crafted by an expert.
  * This file will contain the daily checklist for all 450+ days.
  * **Example `roadmap.json` entry:**
    ```json
    "day_1": {
      "theme": "Understanding the Foundation",
      "tasks": [
        { "id": "d1t1", "text": "Read 'Laxmikanth - Chapter 1: Historical Background'", "topic_tag": "polity_ch_1" },
        { "id": "d1t2", "text": "Read 'NCERT Class 11 History - Chapter 1'", "topic_tag": "history_ncert_1" },
        { "id": "d1t3", "text": "Read today's 'Daily Briefing' (Module 1)", "topic_tag": "current_affairs" }
      ]
    }
    ```

#### 2.2. The Progress Tracker
  * The app UI reads this `JSON` file and displays the tasks for the *current* day.
  * When a user clicks "Done" on a task (e.g., `id: "d1t1"`), the app:
    1.  Records `d1t1: done` in the local `SQLite` database.
    2.  **Crucially:** It signals Module 3 to add the flashcards associated with `topic_tag: "polity_ch_1"` to the revision queue.

### Module 3: "Synapse" (Local Flashcard System)

#### 3.1. Core Database
  * The app will be bundled with a large, pre-made `flashcards.db` (SQLite) file containing thousands of high-yield static flashcards.
  * Each card will be linked to a `topic_tag` (e.g., `polity_ch_1`).

#### 3.2. Spaced Repetition Engine
  * This is a standard, locally-run algorithm (like Anki's SM-2). When a user reviews a card, their "Hard/Good/Easy" input is saved locally to schedule the next review.

#### 3.3. Automatic Queue Population
  * As described in 2.2, when a user finishes a to-do item, the associated flashcard deck is "unlocked" and added to their daily review queue.

#### 3.4. AI Generation (Live News)
  * When reading a news article in Module 1, a "Make Flashcard" button will send the article text to the **local `Ollama` AI** with a prompt: "Generate 5 Q&A flashcards from this text." The new cards are then saved to the user's local database.

### Module 4: "The Crucible" (Practice Suite)

#### 4.1. Prelims MCQ Simulator (The "Seeding" Loophole)
  * The app cannot magically *have* 20,000 MCQs.
  * **Solution:** The `SETUP.md` file will include a one-time setup script (e.g., `seed_data.py`).
  * This script will **web-scrape** several *free* online UPSC quiz websites and coaching centers (e.g., *GKToday, Insights*, etc.) and parse their "Daily Quiz" sections.
  * It will pull the Question, Options, and Answer Explanation and load them all into the local `mcqs.db` (SQLite) database. This builds the 20,000-question bank for free.

#### 4.2. Mains Answer "Local-AI" Evaluator
  * A user writes an answer. The text is sent to the **local `Ollama` AI** with a detailed prompt:
    * *"You are a strict UPSC Mains evaluator. Grade this answer out of 10. Critique its Structure (Intro/Body/Conclusion), Keyword Usage, and how well it addresses all parts of the question. Provide a 'Model Answer' for comparison."*
  * The quality is dependent on the local model, but it's a 100% free and private evaluation.

## 4. Technical Implementation Details

### Database Schema (SQLite)

**Articles Table:**
- id, title, content, summary_short, summary_long, source, date, topic_tags, url

**Tasks Table:**
- id, task_id, day_number, completed, completion_date, topic_tag

**Flashcards Table:**
- id, question, answer, topic_tag, difficulty, next_review_date, ease_factor, interval

**MCQs Table:**
- id, question, option_a, option_b, option_c, option_d, correct_answer, explanation, topic, source

**Progress Table:**
- id, user_id, current_day, start_date, notes

### API Endpoints (FastAPI)

**News Module:**
- POST /api/news/fetch - Trigger news scraping
- GET /api/news/today - Get today's processed articles
- GET /api/news/article/{id} - Get specific article

**Roadmap Module:**
- GET /api/roadmap/day/{day_number} - Get tasks for a day
- POST /api/roadmap/task/complete - Mark task as complete
- GET /api/roadmap/progress - Get overall progress

**Flashcard Module:**
- GET /api/flashcards/due - Get cards due for review
- POST /api/flashcards/review - Record review result
- POST /api/flashcards/generate - Generate cards from article

**MCQ Module:**
- GET /api/mcqs/random - Get random MCQs
- POST /api/mcqs/submit - Submit answers
- GET /api/mcqs/statistics - Get performance stats

**Mains Module:**
- POST /api/mains/evaluate - Evaluate written answer

## 5. Development Roadmap

### Phase 1: Core Infrastructure (Week 1-2)
- Set up project structure
- Implement database schema
- Create basic API endpoints
- Set up Ollama integration

### Phase 2: Module 1 - Daily Briefing (Week 3-4)
- Implement RSS feed parsers
- Create web scrapers with fallbacks
- Integrate AI summarization
- Build news viewing UI

### Phase 3: Module 2 - Roadmap (Week 5-6)
- Create roadmap.json structure
- Implement progress tracking
- Build daily task UI
- Connect to flashcard unlocking

### Phase 4: Module 3 - Flashcards (Week 7-8)
- Implement spaced repetition algorithm
- Create flashcard review UI
- Build AI flashcard generation
- Seed initial flashcard database

### Phase 5: Module 4 - Practice (Week 9-10)
- Implement MCQ scraping
- Create MCQ practice UI
- Build mains answer evaluator
- Create analytics dashboard

### Phase 6: Polish & Testing (Week 11-12)
- UI/UX improvements
- Performance optimization
- Bug fixes
- Documentation

## 6. Success Metrics

- **Zero Cost**: No subscription fees or API costs
- **Offline-First**: Works without internet (except for data fetching)
- **Complete Coverage**: All UPSC topics covered in roadmap
- **Large Question Bank**: 20,000+ MCQs, 10,000+ flashcards
- **User Progress**: Track 15-month journey with analytics

## 7. Legal & Ethical Considerations

- All web scraping must respect robots.txt
- Only scrape publicly available information
- Implement rate limiting to avoid server overload
- Provide proper attribution for scraped content
- Users are responsible for compliance with terms of service

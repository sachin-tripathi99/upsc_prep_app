from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime, date, timedelta
import json
import os

from models import (
    init_db, get_db, Article, Task, Flashcard, MCQ, Progress, MainsAnswer
)
from ai_service import ollama_service
from scrapers.news_scraper import news_scraper

# Initialize FastAPI app
app = FastAPI(title="IAS-Prime API", version="1.0.0")

# CORS middleware for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    init_db()
    print("Database initialized successfully")


# Pydantic models for request/response
class ArticleResponse(BaseModel):
    id: int
    title: str
    summary_short: Optional[str]
    summary_long: Optional[str]
    source: str
    date: date
    topic_tags: Optional[str]
    url: str
    
    class Config:
        from_attributes = True


class TaskResponse(BaseModel):
    id: int
    task_id: str
    day_number: int
    task_text: str
    topic_tag: str
    completed: bool
    
    class Config:
        from_attributes = True


class TaskCompleteRequest(BaseModel):
    task_id: str


class FlashcardResponse(BaseModel):
    id: int
    question: str
    answer: str
    topic_tag: Optional[str]
    next_review_date: Optional[date]
    
    class Config:
        from_attributes = True


class FlashcardReviewRequest(BaseModel):
    flashcard_id: int
    difficulty: str  # "easy", "good", "hard"


class GenerateFlashcardsRequest(BaseModel):
    article_id: int


class MCQResponse(BaseModel):
    id: int
    question: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    correct_answer: Optional[str] = None  # Only shown after submission
    explanation: Optional[str] = None
    
    class Config:
        from_attributes = True


class MCQSubmitRequest(BaseModel):
    mcq_id: int
    selected_answer: str


class MainsEvaluateRequest(BaseModel):
    question: str
    answer: str


# ===== NEWS ENDPOINTS =====

@app.post("/api/news/fetch")
async def fetch_todays_news(db: Session = Depends(get_db)):
    """Trigger news fetching and processing"""
    try:
        # Fetch news from all sources
        articles = news_scraper.fetch_all_news()
        
        saved_articles = []
        for article_data in articles:
            # Check if article already exists
            existing = db.query(Article).filter(Article.url == article_data['url']).first()
            if existing:
                continue
            
            # Generate summaries and tags using AI
            if article_data.get('content'):
                summaries = await ollama_service.summarize_article(article_data['content'])
                tags = await ollama_service.tag_article(article_data['content'], article_data['title'])
                
                article_data['summary_short'] = summaries['short']
                article_data['summary_long'] = summaries['long']
                article_data['topic_tags'] = ','.join(tags)
            
            # Save to database
            article = Article(**article_data)
            db.add(article)
            saved_articles.append(article)
        
        db.commit()
        
        return {
            "status": "success",
            "articles_fetched": len(articles),
            "articles_saved": len(saved_articles)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/news/today", response_model=List[ArticleResponse])
async def get_todays_news(db: Session = Depends(get_db)):
    """Get today's processed articles"""
    today = date.today()
    articles = db.query(Article).filter(Article.date == today).all()
    return articles


@app.get("/api/news/article/{article_id}", response_model=ArticleResponse)
async def get_article(article_id: int, db: Session = Depends(get_db)):
    """Get specific article"""
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article


# ===== ROADMAP ENDPOINTS =====

@app.get("/api/roadmap/day/{day_number}", response_model=List[TaskResponse])
async def get_day_tasks(day_number: int, db: Session = Depends(get_db)):
    """Get tasks for a specific day"""
    tasks = db.query(Task).filter(Task.day_number == day_number).all()
    
    # If no tasks exist, try to load from roadmap.json
    if not tasks:
        roadmap_path = "../data/roadmap.json"
        if os.path.exists(roadmap_path):
            with open(roadmap_path, 'r') as f:
                roadmap = json.load(f)
                day_key = f"day_{day_number}"
                if day_key in roadmap:
                    day_data = roadmap[day_key]
                    for task_data in day_data.get('tasks', []):
                        task = Task(
                            task_id=task_data['id'],
                            day_number=day_number,
                            task_text=task_data['text'],
                            topic_tag=task_data.get('topic_tag', '')
                        )
                        db.add(task)
                        tasks.append(task)
                    db.commit()
    
    return tasks


@app.post("/api/roadmap/task/complete")
async def complete_task(request: TaskCompleteRequest, db: Session = Depends(get_db)):
    """Mark a task as complete and unlock associated flashcards"""
    task = db.query(Task).filter(Task.task_id == request.task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task.completed = True
    task.completion_date = datetime.utcnow()
    
    # Unlock flashcards with the same topic_tag
    flashcards = db.query(Flashcard).filter(
        Flashcard.topic_tag == task.topic_tag,
        Flashcard.is_unlocked == False
    ).all()
    
    for flashcard in flashcards:
        flashcard.is_unlocked = True
        flashcard.next_review_date = date.today()
    
    # Update progress
    progress = db.query(Progress).first()
    if progress:
        progress.total_tasks_completed += 1
        progress.last_activity = datetime.utcnow()
    
    db.commit()
    
    return {
        "status": "success",
        "flashcards_unlocked": len(flashcards)
    }


@app.get("/api/roadmap/progress")
async def get_progress(db: Session = Depends(get_db)):
    """Get overall progress"""
    progress = db.query(Progress).first()
    if not progress:
        # Create initial progress entry
        progress = Progress(
            user_id="default_user",
            current_day=1,
            start_date=date.today()
        )
        db.add(progress)
        db.commit()
    
    total_tasks = db.query(Task).count()
    completed_tasks = db.query(Task).filter(Task.completed == True).count()
    
    return {
        "current_day": progress.current_day,
        "start_date": progress.start_date,
        "total_tasks_completed": completed_tasks,
        "total_tasks": total_tasks,
        "completion_percentage": (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0,
        "flashcards_reviewed": progress.flashcards_reviewed,
        "mcqs_attempted": progress.mcqs_attempted
    }


# ===== FLASHCARD ENDPOINTS =====

@app.get("/api/flashcards/due", response_model=List[FlashcardResponse])
async def get_due_flashcards(db: Session = Depends(get_db)):
    """Get flashcards due for review today"""
    today = date.today()
    flashcards = db.query(Flashcard).filter(
        Flashcard.is_unlocked == True,
        Flashcard.next_review_date <= today
    ).limit(20).all()
    
    return flashcards


@app.post("/api/flashcards/review")
async def review_flashcard(request: FlashcardReviewRequest, db: Session = Depends(get_db)):
    """Record flashcard review and update spaced repetition"""
    flashcard = db.query(Flashcard).filter(Flashcard.id == request.flashcard_id).first()
    if not flashcard:
        raise HTTPException(status_code=404, detail="Flashcard not found")
    
    # SM-2 Algorithm implementation
    if request.difficulty == "easy":
        flashcard.ease_factor = min(flashcard.ease_factor + 0.15, 2.5)
        flashcard.interval = max(flashcard.interval * 2, 1)
    elif request.difficulty == "good":
        flashcard.interval = max(flashcard.interval * flashcard.ease_factor, 1)
    else:  # hard
        flashcard.ease_factor = max(flashcard.ease_factor - 0.2, 1.3)
        flashcard.interval = 1
    
    flashcard.repetitions += 1
    flashcard.next_review_date = date.today() + timedelta(days=int(flashcard.interval))
    
    # Update progress
    progress = db.query(Progress).first()
    if progress:
        progress.flashcards_reviewed += 1
        progress.last_activity = datetime.utcnow()
    
    db.commit()
    
    return {
        "status": "success",
        "next_review_date": flashcard.next_review_date
    }


@app.post("/api/flashcards/generate")
async def generate_flashcards(request: GenerateFlashcardsRequest, db: Session = Depends(get_db)):
    """Generate flashcards from an article using AI"""
    article = db.query(Article).filter(Article.id == request.article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    # Generate flashcards
    flashcards_data = await ollama_service.generate_flashcards(article.content, count=5)
    
    saved_flashcards = []
    for fc_data in flashcards_data:
        flashcard = Flashcard(
            question=fc_data['question'],
            answer=fc_data['answer'],
            topic_tag='current_affairs',
            is_unlocked=True,
            next_review_date=date.today()
        )
        db.add(flashcard)
        saved_flashcards.append(flashcard)
    
    db.commit()
    
    return {
        "status": "success",
        "flashcards_created": len(saved_flashcards)
    }


# ===== MCQ ENDPOINTS =====

@app.get("/api/mcqs/random", response_model=List[MCQResponse])
async def get_random_mcqs(count: int = 10, db: Session = Depends(get_db)):
    """Get random MCQs for practice"""
    import random
    
    all_mcqs = db.query(MCQ).all()
    if len(all_mcqs) < count:
        count = len(all_mcqs)
    
    selected_mcqs = random.sample(all_mcqs, count)
    
    # Don't include answers in initial response
    for mcq in selected_mcqs:
        mcq.correct_answer = None
        mcq.explanation = None
    
    return selected_mcqs


@app.post("/api/mcqs/submit")
async def submit_mcq_answer(request: MCQSubmitRequest, db: Session = Depends(get_db)):
    """Submit MCQ answer and get result"""
    mcq = db.query(MCQ).filter(MCQ.id == request.mcq_id).first()
    if not mcq:
        raise HTTPException(status_code=404, detail="MCQ not found")
    
    is_correct = request.selected_answer.upper() == mcq.correct_answer.upper()
    
    # Update progress
    progress = db.query(Progress).first()
    if progress:
        progress.mcqs_attempted += 1
        progress.last_activity = datetime.utcnow()
        db.commit()
    
    return {
        "is_correct": is_correct,
        "correct_answer": mcq.correct_answer,
        "explanation": mcq.explanation
    }


# ===== MAINS ENDPOINTS =====

@app.post("/api/mains/evaluate")
async def evaluate_mains_answer(request: MainsEvaluateRequest, db: Session = Depends(get_db)):
    """Evaluate a mains answer using AI"""
    evaluation_result = await ollama_service.evaluate_mains_answer(
        request.question,
        request.answer
    )
    
    # Save to database
    mains_answer = MainsAnswer(
        question=request.question,
        answer=request.answer,
        evaluation=evaluation_result['evaluation'],
        score=evaluation_result['score']
    )
    db.add(mains_answer)
    db.commit()
    
    return evaluation_result


# ===== UTILITY ENDPOINTS =====

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "IAS-Prime API",
        "version": "1.0.0",
        "status": "running"
    }


@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

from sqlalchemy import create_engine, Column, Integer, String, Text, Date, DateTime, Float, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

DATABASE_URL = "sqlite:///./ias_prime.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class Article(Base):
    """Stores news articles with AI-generated summaries and tags"""
    __tablename__ = "articles"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(500), nullable=False)
    content = Column(Text)
    summary_short = Column(Text)  # 50-word summary
    summary_long = Column(Text)   # 250-word summary
    source = Column(String(100))
    date = Column(Date, default=datetime.utcnow)
    topic_tags = Column(String(500))  # Comma-separated tags
    url = Column(String(1000))
    created_at = Column(DateTime, default=datetime.utcnow)


class Task(Base):
    """Tracks daily tasks from the roadmap"""
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(String(50), unique=True, nullable=False)  # e.g., "d1t1"
    day_number = Column(Integer, nullable=False)
    task_text = Column(String(500))
    topic_tag = Column(String(100))
    completed = Column(Boolean, default=False)
    completion_date = Column(DateTime)


class Flashcard(Base):
    """Flashcard with spaced repetition data"""
    __tablename__ = "flashcards"
    
    id = Column(Integer, primary_key=True, index=True)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    topic_tag = Column(String(100))
    difficulty = Column(String(20), default="medium")  # easy, medium, hard
    next_review_date = Column(Date)
    ease_factor = Column(Float, default=2.5)  # SM-2 algorithm
    interval = Column(Integer, default=0)  # Days until next review
    repetitions = Column(Integer, default=0)
    is_unlocked = Column(Boolean, default=False)  # Unlocked by completing tasks
    created_at = Column(DateTime, default=datetime.utcnow)


class MCQ(Base):
    """Multiple choice questions"""
    __tablename__ = "mcqs"
    
    id = Column(Integer, primary_key=True, index=True)
    question = Column(Text, nullable=False)
    option_a = Column(String(500))
    option_b = Column(String(500))
    option_c = Column(String(500))
    option_d = Column(String(500))
    correct_answer = Column(String(1))  # A, B, C, or D
    explanation = Column(Text)
    topic = Column(String(100))
    source = Column(String(100))
    difficulty = Column(String(20), default="medium")
    created_at = Column(DateTime, default=datetime.utcnow)


class Progress(Base):
    """Overall user progress tracker"""
    __tablename__ = "progress"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(50), default="default_user")
    current_day = Column(Integer, default=1)
    start_date = Column(Date)
    notes = Column(Text)
    total_tasks_completed = Column(Integer, default=0)
    flashcards_reviewed = Column(Integer, default=0)
    mcqs_attempted = Column(Integer, default=0)
    last_activity = Column(DateTime, default=datetime.utcnow)


class MainsAnswer(Base):
    """Stores mains answers with AI evaluation"""
    __tablename__ = "mains_answers"
    
    id = Column(Integer, primary_key=True, index=True)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    evaluation = Column(Text)  # AI feedback
    score = Column(Float)
    date = Column(DateTime, default=datetime.utcnow)


def init_db():
    """Initialize the database"""
    Base.metadata.create_all(bind=engine)


def get_db():
    """Dependency for getting database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

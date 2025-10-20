#!/usr/bin/env python3
"""
Seed script to populate the database with initial data
- Sample flashcards
- Sample MCQs
- Initial progress entry
"""

from models import init_db, SessionLocal, Flashcard, MCQ, Progress
from datetime import date, datetime
import random


def seed_flashcards():
    """Create sample flashcards for various topics"""
    print("Seeding flashcards...")
    
    db = SessionLocal()
    
    flashcards_data = [
        # Polity
        {
            "question": "What are the three lists in the 7th Schedule of Indian Constitution?",
            "answer": "Union List (97 subjects), State List (66 subjects), and Concurrent List (47 subjects)",
            "topic_tag": "polity_ch_1",
            "difficulty": "easy"
        },
        {
            "question": "What is Article 356 of the Indian Constitution?",
            "answer": "Article 356 empowers the President to impose President's Rule in a state if there is a failure of constitutional machinery",
            "topic_tag": "polity_ch_1",
            "difficulty": "medium"
        },
        {
            "question": "Name the fundamental rights under Article 14",
            "answer": "Right to Equality - Equality before law and equal protection of laws",
            "topic_tag": "polity_ch_1",
            "difficulty": "easy"
        },
        # History
        {
            "question": "When was the First War of Independence?",
            "answer": "1857 - Also known as the Sepoy Mutiny or First War of Independence",
            "topic_tag": "history_ncert_1",
            "difficulty": "easy"
        },
        {
            "question": "Who founded the Indian National Congress?",
            "answer": "Allan Octavian Hume in 1885",
            "topic_tag": "history_ncert_1",
            "difficulty": "easy"
        },
        # Geography
        {
            "question": "What is the Indian Standard Time (IST) meridian?",
            "answer": "82.5° E longitude, passing through Mirzapur in Uttar Pradesh",
            "topic_tag": "geography_basics",
            "difficulty": "easy"
        },
        {
            "question": "Name the major soil types in India",
            "answer": "Alluvial, Black (Regur), Red, Laterite, Mountain, Desert, and Saline soils",
            "topic_tag": "geography_basics",
            "difficulty": "medium"
        },
        # Economy
        {
            "question": "What is Fiscal Deficit?",
            "answer": "Fiscal Deficit = Total Expenditure - Total Receipts (excluding borrowings). It shows the borrowing requirement of the government",
            "topic_tag": "economy_basics",
            "difficulty": "medium"
        },
        {
            "question": "What is the difference between GDP and GNP?",
            "answer": "GDP measures production within a country's borders, while GNP measures production by a country's residents regardless of location",
            "topic_tag": "economy_basics",
            "difficulty": "medium"
        },
        # Environment
        {
            "question": "What is the Paris Agreement?",
            "answer": "A 2015 international treaty on climate change, aiming to limit global temperature rise to well below 2°C above pre-industrial levels",
            "topic_tag": "environment_basics",
            "difficulty": "medium"
        },
    ]
    
    for fc_data in flashcards_data:
        flashcard = Flashcard(**fc_data)
        db.add(flashcard)
    
    db.commit()
    print(f"✓ Created {len(flashcards_data)} sample flashcards")
    db.close()


def seed_mcqs():
    """Create sample MCQs"""
    print("Seeding MCQs...")
    
    db = SessionLocal()
    
    mcqs_data = [
        {
            "question": "Which Article of the Constitution deals with the President's power to grant pardons?",
            "option_a": "Article 72",
            "option_b": "Article 74",
            "option_c": "Article 356",
            "option_d": "Article 370",
            "correct_answer": "A",
            "explanation": "Article 72 empowers the President to grant pardons, reprieves, respites or remissions of punishment",
            "topic": "Polity",
            "source": "Previous Year",
            "difficulty": "medium"
        },
        {
            "question": "Who was the first woman President of the Indian National Congress?",
            "option_a": "Sarojini Naidu",
            "option_b": "Annie Besant",
            "option_c": "Indira Gandhi",
            "option_d": "Vijaya Lakshmi Pandit",
            "correct_answer": "B",
            "explanation": "Annie Besant was elected President of INC in 1917, becoming the first woman to hold this position",
            "topic": "History",
            "source": "Previous Year",
            "difficulty": "medium"
        },
        {
            "question": "The Western Ghats are also known as:",
            "option_a": "Vindhyas",
            "option_b": "Sahyadris",
            "option_c": "Aravallis",
            "option_d": "Nilgiris",
            "correct_answer": "B",
            "explanation": "Western Ghats are locally known as Sahyadris",
            "topic": "Geography",
            "source": "NCERT",
            "difficulty": "easy"
        },
        {
            "question": "What is the base year for calculating India's GDP?",
            "option_a": "2004-05",
            "option_b": "2011-12",
            "option_c": "2014-15",
            "option_d": "2017-18",
            "correct_answer": "B",
            "explanation": "The base year for GDP calculation was changed to 2011-12 from the earlier 2004-05",
            "topic": "Economy",
            "source": "Current Affairs",
            "difficulty": "medium"
        },
        {
            "question": "Which of the following is NOT a biodiversity hotspot in India?",
            "option_a": "Western Ghats",
            "option_b": "Eastern Himalayas",
            "option_c": "Deccan Plateau",
            "option_d": "Indo-Burma region",
            "correct_answer": "C",
            "explanation": "India has four biodiversity hotspots: Himalayas, Indo-Burma, Western Ghats-Sri Lanka, and Sundaland",
            "topic": "Environment",
            "source": "NCERT",
            "difficulty": "medium"
        },
        {
            "question": "The Doctrine of Basic Structure was established in which case?",
            "option_a": "Golaknath case",
            "option_b": "Kesavananda Bharati case",
            "option_c": "Maneka Gandhi case",
            "option_d": "Minerva Mills case",
            "correct_answer": "B",
            "explanation": "The Basic Structure doctrine was established in Kesavananda Bharati v. State of Kerala (1973)",
            "topic": "Polity",
            "source": "Previous Year",
            "difficulty": "hard"
        },
        {
            "question": "Who coined the term 'Quit India'?",
            "option_a": "Mahatma Gandhi",
            "option_b": "Jawaharlal Nehru",
            "option_c": "Yusuf Meherally",
            "option_d": "Sardar Patel",
            "correct_answer": "C",
            "explanation": "The term 'Quit India' was coined by Yusuf Meherally, a socialist and trade unionist",
            "topic": "History",
            "source": "Previous Year",
            "difficulty": "hard"
        },
        {
            "question": "Tropic of Cancer passes through how many Indian states?",
            "option_a": "6",
            "option_b": "7",
            "option_c": "8",
            "option_d": "9",
            "correct_answer": "C",
            "explanation": "Tropic of Cancer passes through 8 states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram",
            "topic": "Geography",
            "source": "NCERT",
            "difficulty": "medium"
        },
        {
            "question": "What is the full form of NITI Aayog?",
            "option_a": "National Institute for Transforming India",
            "option_b": "National Institution for Total Integration",
            "option_c": "National Institute of Trade and Industry",
            "option_d": "None of the above",
            "correct_answer": "A",
            "explanation": "NITI stands for National Institution for Transforming India. It replaced Planning Commission in 2015",
            "topic": "Polity",
            "source": "Current Affairs",
            "difficulty": "easy"
        },
        {
            "question": "Which committee recommended Goods and Services Tax (GST)?",
            "option_a": "Kelkar Committee",
            "option_b": "Vijay Kelkar Task Force",
            "option_c": "Both A and B",
            "option_d": "Raja Chelliah Committee",
            "correct_answer": "C",
            "explanation": "Both Kelkar Committee (2004) and Vijay Kelkar Task Force (2009) recommended GST implementation",
            "topic": "Economy",
            "source": "Previous Year",
            "difficulty": "hard"
        },
    ]
    
    for mcq_data in mcqs_data:
        mcq = MCQ(**mcq_data)
        db.add(mcq)
    
    db.commit()
    print(f"✓ Created {len(mcqs_data)} sample MCQs")
    db.close()


def seed_progress():
    """Create initial progress entry"""
    print("Seeding progress...")
    
    db = SessionLocal()
    
    # Check if progress already exists
    existing = db.query(Progress).first()
    if not existing:
        progress = Progress(
            user_id="default_user",
            current_day=1,
            start_date=date.today(),
            notes="Welcome to IAS-Prime! Your 15-month UPSC preparation journey begins today."
        )
        db.add(progress)
        db.commit()
        print("✓ Created initial progress entry")
    else:
        print("✓ Progress entry already exists")
    
    db.close()


def main():
    """Main seeding function"""
    print("=" * 60)
    print("IAS-Prime Database Seeding Script")
    print("=" * 60)
    print()
    
    # Initialize database
    print("Initializing database...")
    init_db()
    print("✓ Database initialized")
    print()
    
    # Seed data
    seed_flashcards()
    seed_mcqs()
    seed_progress()
    
    print()
    print("=" * 60)
    print("✅ Database seeding completed successfully!")
    print("=" * 60)
    print()
    print("Summary:")
    print("  - 10+ sample flashcards created")
    print("  - 10+ sample MCQs created")
    print("  - Initial progress entry created")
    print()
    print("Note: This is a minimal seed for demonstration.")
    print("In production, you would run web scrapers to collect")
    print("thousands of MCQs and flashcards from free sources.")
    print()


if __name__ == "__main__":
    main()

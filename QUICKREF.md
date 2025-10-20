# Quick Reference Guide

Quick reference for common tasks in IAS-Prime.

## Daily Workflow

### Morning Routine (30-45 minutes)
1. **Start the application** (if not already running)
2. **Check Daily Briefing** → Click "Fetch Today's News"
3. **Review unlocked flashcards** → Go to Flashcards section
4. **Check today's roadmap** → Complete scheduled tasks

### Study Session (2-3 hours)
1. **Follow Roadmap tasks** for the day
2. **Mark tasks complete** as you finish them
3. **Review newly unlocked flashcards**
4. **Attempt 20-30 MCQs** on topics studied

### Evening Review (30 minutes)
1. **Review due flashcards**
2. **Attempt practice MCQs**
3. **Write one mains answer** and get AI evaluation

## Keyboard Shortcuts

Currently not implemented, but planned for future versions.

## Common Tasks

### Starting the Application

**Every time you want to use the app:**

```bash
# Terminal 1: Start Ollama (if not already running)
ollama serve

# Terminal 2: Start Backend
cd backend
source venv/bin/activate  # Windows: .\venv\Scripts\Activate.ps1
uvicorn main:app --reload

# Terminal 3: Start Frontend
cd frontend
npm start
```

### Fetching News

1. Go to **Daily Briefing** page
2. Click **"Fetch Today's News"** button
3. Wait 2-5 minutes for scraping and AI processing
4. Refresh page if articles don't appear immediately

### Completing Tasks

1. Go to **Roadmap** page
2. Select your current day
3. Read task description
4. When done, **check the checkbox**
5. Associated flashcards are automatically unlocked

### Reviewing Flashcards

1. Go to **Flashcards** page
2. Read the question
3. Think of your answer
4. Click card to **reveal answer**
5. Rate difficulty:
   - 😓 **Hard** - See again tomorrow
   - 👍 **Good** - See in a few days
   - 😊 **Easy** - See in a week+

### Taking MCQ Quiz

1. Go to **MCQ Practice** page
2. Quiz starts automatically with 10 random questions
3. Select your answer
4. Click **"Submit Answer"**
5. Read explanation
6. Click **"Next Question"**

### Getting Mains Evaluation

1. Go to **Mains Evaluator** page
2. Enter or select a question
3. Write your answer (150-250 words recommended)
4. Click **"Get Evaluation"**
5. Review score and detailed feedback
6. Save feedback for future reference

## Tips and Best Practices

### For Best Results

1. **Be Consistent**
   - Study same time every day
   - Complete tasks in order
   - Don't skip flashcard reviews

2. **Use AI Wisely**
   - Verify AI-generated summaries with original articles
   - Use evaluations as guidance, not absolute truth
   - Generate flashcards for difficult concepts

3. **Track Progress**
   - Check progress dashboard regularly
   - Adjust study time based on completion rate
   - Take weekly rest days

4. **Manage Resources**
   - Close Ollama when not using AI features
   - Backup database weekly (copy ias_prime.db)
   - Clear old news articles periodically

### Optimizing Performance

1. **Use Appropriate AI Model**
   - `mistral:7b` - Faster, less accurate
   - `llama3:8b` - Balanced (recommended)
   - `llama3:70b` - Slower, more accurate (if you have powerful PC)

2. **Reduce AI Load**
   - Don't fetch news multiple times per day
   - Generate flashcards only when needed
   - Use mains evaluator for practice answers only

3. **Database Maintenance**
   ```bash
   # Vacuum database monthly
   sqlite3 backend/ias_prime.db "VACUUM;"
   ```

## Study Schedule Template

### Weekday (Monday-Friday)

| Time | Activity | Duration |
|------|----------|----------|
| 6:00 AM | Fetch & Read Daily Briefing | 30 min |
| 6:30 AM | Review Flashcards | 20 min |
| 7:00 AM | Roadmap Task 1 (Reading) | 60 min |
| 10:00 AM | Roadmap Task 2 (Reading) | 60 min |
| 2:00 PM | Roadmap Task 3 (Practice) | 45 min |
| 4:00 PM | MCQ Practice | 30 min |
| 8:00 PM | Mains Answer Writing | 30 min |
| 9:00 PM | Review & Flashcards | 20 min |

**Total:** ~5 hours

### Weekend (Saturday-Sunday)

| Time | Activity | Duration |
|------|----------|----------|
| 8:00 AM | Weekly News Review | 45 min |
| 9:00 AM | Complete pending tasks | 90 min |
| 11:00 AM | MCQ Mock Test | 60 min |
| 3:00 PM | Mains Practice (2-3 answers) | 90 min |
| 7:00 PM | Flashcard Revision | 30 min |
| 8:00 PM | Weekly Planning | 15 min |

**Saturday Total:** ~5 hours
**Sunday:** Light revision or rest

## Data Management

### Backing Up Your Data

```bash
# Manual backup
cp backend/ias_prime.db backend/ias_prime_backup_$(date +%Y%m%d).db

# Automated weekly backup (add to cron/Task Scheduler)
# Linux/Mac crontab:
0 0 * * 0 cp /path/to/backend/ias_prime.db /path/to/backups/ias_prime_$(date +\%Y\%m\%d).db
```

### Exporting Data

Currently not implemented through UI. Manual export:

```bash
# Export flashcards to CSV
sqlite3 -header -csv backend/ias_prime.db "SELECT * FROM flashcards;" > flashcards.csv

# Export MCQs to CSV
sqlite3 -header -csv backend/ias_prime.db "SELECT * FROM mcqs;" > mcqs.csv

# Export progress
sqlite3 -header -csv backend/ias_prime.db "SELECT * FROM progress;" > progress.csv
```

### Resetting Progress

```bash
# Reset only progress (keep flashcards and MCQs)
sqlite3 backend/ias_prime.db "DELETE FROM progress; DELETE FROM tasks WHERE completed=1;"

# Complete reset
cd backend
rm ias_prime.db
python seed_data.py
```

## Troubleshooting Quick Fixes

### Backend won't start
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

### Frontend won't start
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### AI not responding
```bash
# Restart Ollama
# Linux/Mac:
killall ollama
ollama serve

# Windows:
# Close Ollama from system tray and restart
```

### Database corrupted
```bash
cd backend
mv ias_prime.db ias_prime_old.db
python seed_data.py
# Restore what you can from backup
```

## Getting Help

1. **Check TROUBLESHOOTING.md** for detailed solutions
2. **Read SETUP.md** if installation issues
3. **Check ARCHITECTURE.md** for technical details
4. **Open GitHub Issue** for bugs or questions

## Useful Links

- **Repository:** https://github.com/sachin-tripathi99/upsc_prep_app
- **Ollama Docs:** https://ollama.com/docs
- **FastAPI Docs:** https://fastapi.tiangolo.com
- **React Docs:** https://react.dev

## Version History

### v1.0.0 (Current)
- Initial release
- All 5 modules implemented
- Sample data included
- Basic UI with all features

### Planned Updates
- v1.1.0: Mobile responsive design
- v1.2.0: Advanced analytics
- v1.3.0: Export/Import features
- v2.0.0: Multi-user support

---

*Last Updated: 2024*
*For detailed documentation, see other .md files in the repository*

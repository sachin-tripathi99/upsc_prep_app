# Contributing to IAS-Prime

Thank you for your interest in contributing to IAS-Prime! This document provides guidelines for contributing to the project.

## Project Structure

```
upsc_prep_app/
├── backend/              # Python FastAPI backend
│   ├── main.py          # Main API application
│   ├── models.py        # SQLAlchemy database models
│   ├── ai_service.py    # Ollama AI integration
│   ├── scrapers/        # News and data scrapers
│   │   ├── __init__.py
│   │   └── news_scraper.py
│   ├── seed_data.py     # Database seeding script
│   └── requirements.txt # Python dependencies
├── frontend/            # React frontend
│   ├── src/
│   │   ├── App.js       # Main React app
│   │   ├── pages/       # Page components
│   │   └── services/    # API service layer
│   └── package.json     # Node.js dependencies
├── data/                # Static data files
│   └── roadmap.json     # 15-month study plan
└── SETUP.md            # Installation guide
```

## Development Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- Ollama (for AI features)

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python seed_data.py
uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## How to Contribute

### 1. Reporting Issues

- Check if the issue already exists
- Provide detailed description
- Include steps to reproduce
- Mention your environment (OS, Python version, Node version)

### 2. Suggesting Features

- Open an issue with the "Feature Request" label
- Explain the use case
- Describe the expected behavior

### 3. Code Contributions

#### Backend (Python)

- Follow PEP 8 style guide
- Add docstrings to functions
- Update requirements.txt if adding dependencies
- Test your changes locally

#### Frontend (React)

- Follow existing code style
- Keep components modular and reusable
- Test UI changes in different screen sizes
- Update package.json if adding dependencies

### 4. Documentation

- Update SETUP.md if changing installation steps
- Update README.md for major features
- Add comments for complex logic

## Areas for Contribution

### High Priority

1. **Expand Roadmap**: Add more days to roadmap.json (currently only 7 days, need 450)
2. **Flashcard Database**: Add more pre-made flashcards for various topics
3. **MCQ Database**: Implement scrapers to gather more MCQs from free sources
4. **UI/UX Improvements**: Enhance the frontend design
5. **Mobile Responsiveness**: Make the app work well on tablets and phones

### Medium Priority

1. **Advanced Scrapers**: Add more news sources
2. **Analytics Dashboard**: Show detailed progress analytics
3. **Export Features**: Export notes, flashcards, etc.
4. **Themes**: Add dark mode and other themes
5. **Keyboard Shortcuts**: Add productivity shortcuts

### Low Priority

1. **Testing**: Add unit and integration tests
2. **Docker Support**: Create Dockerfile for easy deployment
3. **Backup/Restore**: Database backup and restore features

## Code Review Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages: `git commit -m "Add feature: description"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Create a Pull Request

## Ethical Guidelines

### Web Scraping
- Respect robots.txt
- Implement rate limiting
- Only scrape publicly available information
- Provide proper attribution
- Users are responsible for compliance with terms of service

### Data Privacy
- Never send user data to external services
- All processing must be local
- Document any external connections

### AI Usage
- Use local AI only (Ollama)
- No paid API services
- Document AI prompts for transparency

## Testing

Before submitting a PR:

1. Test backend endpoints:
```bash
cd backend
python -m pytest  # If tests exist
```

2. Test frontend:
```bash
cd frontend
npm test  # If tests exist
```

3. Manual testing checklist:
   - [ ] Backend starts without errors
   - [ ] Frontend starts and renders
   - [ ] Can fetch news
   - [ ] Can complete tasks
   - [ ] Can review flashcards
   - [ ] Can attempt MCQs
   - [ ] Can evaluate mains answers

## Community

- Be respectful and inclusive
- Help others learn
- Share knowledge
- Focus on the educational mission

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Open an issue with the "Question" label, and the community will help!

---

Thank you for helping make quality UPSC preparation accessible to everyone! 🎯

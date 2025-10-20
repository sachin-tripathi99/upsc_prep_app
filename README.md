# IAS-Prime: Local-First UPSC Preparation App

A 100% free, local-first, all-in-one desktop application that guides UPSC aspirants through a comprehensive 15-month preparation plan.

## 🎯 Features

- **Daily Briefing**: AI-powered news aggregation from PIB, PRS, The Hindu, and Indian Express
- **15-Month Roadmap**: Structured day-by-day study plan covering all UPSC topics
- **Synapse Flashcards**: Spaced repetition system with 10,000+ pre-made cards
- **Practice MCQs**: 20,000+ questions from previous years and mock tests
- **Mains Evaluator**: AI-powered answer evaluation and feedback

## 💡 Zero-Cost Architecture

- **Local Storage**: SQLite database (no cloud subscriptions)
- **Local AI**: Ollama (Llama 3 or Mistral) for all AI features
- **Free Data Sources**: RSS feeds and ethical web scraping
- **Open Source**: Python + React + SQLite

## 🚀 Quick Start

See [SETUP.md](SETUP.md) for detailed installation instructions.

## 📚 Documentation

- [SETUP.md](SETUP.md) - Complete installation guide
- [PRD.md](PRD.md) - Detailed product requirements
- [copilotRequirements.md](copilotRequirements.md) - Original requirements document

## 🛠️ Tech Stack

**Backend:**
- Python 3.10+
- FastAPI
- SQLite
- Ollama
- BeautifulSoup4, Feedparser

**Frontend:**
- React 18+
- Tailwind CSS
- Axios

## 📁 Project Structure

```
upsc_prep_app/
├── backend/          # Python FastAPI server
│   ├── main.py       # Main application entry
│   ├── models.py     # Database models
│   ├── scrapers/     # News and MCQ scrapers
│   ├── ai_service.py # Ollama integration
│   └── seed_data.py  # Database seeding script
├── frontend/         # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
├── data/            # Static data files
│   └── roadmap.json # 15-month study plan
└── SETUP.md         # Installation guide
```

## 🤝 Contributing

This is an educational project. Contributions are welcome!

## 📄 License

MIT License - Free for educational use

## ⚠️ Disclaimer

This application is designed for educational purposes. Users are responsible for ensuring their use of web scraping complies with applicable laws and website terms of service.
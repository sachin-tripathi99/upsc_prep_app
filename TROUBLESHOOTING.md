# Troubleshooting Guide

Common issues and their solutions for IAS-Prime.

## Installation Issues

### Python Virtual Environment Not Activating

**Problem:** Cannot activate venv

**Windows Solution:**
```powershell
# If you get execution policy error
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\venv\Scripts\Activate.ps1
```

**Linux/Mac Solution:**
```bash
source venv/bin/activate
```

### Pip Install Fails

**Problem:** `pip install -r requirements.txt` fails

**Solution:**
```bash
# Upgrade pip first
python -m pip install --upgrade pip

# Then try again
pip install -r requirements.txt

# If specific package fails, install it separately
pip install package-name
```

### Node Modules Installation Fails

**Problem:** `npm install` fails in frontend

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Try again
npm install

# If still fails, try with --legacy-peer-deps
npm install --legacy-peer-deps
```

## Runtime Issues

### Backend Won't Start

**Problem:** `uvicorn main:app --reload` fails

**Check:**
1. Is virtual environment activated? (Should see `(venv)` in terminal)
2. Are you in the `backend` directory?
3. Is port 8000 already in use?

**Solution:**
```bash
# Check if port is in use
# Linux/Mac:
lsof -i :8000
# Windows:
netstat -ano | findstr :8000

# Use different port if needed
uvicorn main:app --reload --port 8001
```

### Frontend Won't Start

**Problem:** `npm start` fails

**Check:**
1. Is Node.js 18+ installed? `node --version`
2. Are you in the `frontend` directory?
3. Is port 3000 already in use?

**Solution:**
```bash
# Use different port
PORT=3001 npm start  # Linux/Mac
# Windows: Set PORT=3001 && npm start
```

### CORS Errors

**Problem:** Frontend can't connect to backend

**Solution:**
1. Make sure backend is running on port 8000
2. Check backend logs for CORS errors
3. Verify frontend is trying to connect to `http://localhost:8000`

## Ollama Issues

### Ollama Not Found

**Problem:** "Ollama not found" or AI features not working

**Solution:**
```bash
# Check if Ollama is installed
ollama --version

# If not installed, download from ollama.com

# Check if Ollama is running
ollama serve

# Pull the model
ollama pull llama3:8b
```

### Ollama Connection Timeout

**Problem:** AI requests timeout

**Solution:**
1. Make sure Ollama is running: `ollama serve`
2. Check if model is downloaded: `ollama list`
3. Try with a smaller model if your computer is slow:
   ```bash
   ollama pull mistral:7b
   # Update backend/ai_service.py to use mistral:7b
   ```

### AI Responses Too Slow

**Problem:** AI takes too long to respond

**Solutions:**
- Use a smaller model (mistral:7b instead of llama3:8b)
- Reduce text length sent to AI
- Close other applications to free up RAM
- Consider using GPU if available

## Database Issues

### Database Locked Error

**Problem:** "Database is locked"

**Solution:**
```bash
# Close all connections to the database
# Restart the backend server
# If persists, delete and recreate:
cd backend
rm ias_prime.db
python seed_data.py
```

### No Data After Seeding

**Problem:** seed_data.py runs but database is empty

**Solution:**
```bash
# Check for errors in seed_data.py output
python seed_data.py

# Manually check database
python
>>> from models import SessionLocal, Flashcard
>>> db = SessionLocal()
>>> print(db.query(Flashcard).count())
```

## News Scraping Issues

### No Articles Fetched

**Problem:** "Fetch Today's News" returns 0 articles

**Possible Causes & Solutions:**

1. **Internet Connection:**
   - Check your internet connection
   - Try accessing the news websites directly

2. **Website Structure Changed:**
   - News websites frequently change their structure
   - Check backend logs for errors
   - RSS feeds might have moved

3. **Rate Limiting:**
   - Websites might be blocking requests
   - Wait a few minutes and try again
   - Implement longer delays in scraper

4. **Firewall/Proxy:**
   - Check if firewall is blocking requests
   - If behind corporate proxy, configure proxy settings

### RSS Feed Errors

**Problem:** Specific RSS feeds not working

**Solution:**
```python
# Test RSS feed manually
import feedparser
feed = feedparser.parse("RSS_URL_HERE")
print(feed.entries)
```

## Frontend Issues

### Blank Page

**Problem:** Frontend shows blank white page

**Check:**
1. Open browser console (F12) for JavaScript errors
2. Check if API is running and accessible
3. Clear browser cache

**Solution:**
```bash
# Rebuild frontend
cd frontend
rm -rf build node_modules
npm install
npm start
```

### Components Not Updating

**Problem:** Changes not reflected in UI

**Solution:**
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache
- Check browser console for errors
- Restart frontend dev server

## Performance Issues

### Application Running Slowly

**Solutions:**
1. **Close unnecessary applications**
2. **Use lighter AI model:**
   ```bash
   ollama pull mistral:7b
   # Update ai_service.py model parameter
   ```
3. **Reduce batch sizes:**
   - Fetch fewer articles at once
   - Review fewer flashcards per session

4. **Database optimization:**
   ```bash
   # Vacuum database to reclaim space
   sqlite3 backend/ias_prime.db "VACUUM;"
   ```

## Still Having Issues?

1. **Check logs:**
   - Backend: Look at terminal running uvicorn
   - Frontend: Check browser console (F12)

2. **Search existing issues:**
   - Look for similar issues on GitHub

3. **Ask for help:**
   - Open a GitHub issue with:
     - Detailed description of problem
     - Steps to reproduce
     - Error messages (full text)
     - Your environment (OS, Python version, Node version)
     - Screenshots if relevant

## Debugging Tips

### Enable Verbose Logging

Backend:
```python
# In main.py, add:
import logging
logging.basicConfig(level=logging.DEBUG)
```

### Test Individual Components

Test backend API directly:
```bash
# Test health endpoint
curl http://localhost:8000/api/health

# Test news endpoint
curl -X POST http://localhost:8000/api/news/fetch
```

Test Ollama separately:
```bash
ollama run llama3:8b "Summarize: Test content here"
```

## Clean Reinstall

If all else fails, start fresh:

```bash
# Backend
cd backend
rm -rf venv ias_prime.db __pycache__
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python seed_data.py

# Frontend
cd frontend
rm -rf node_modules build package-lock.json
npm install

# Start fresh
# Terminal 1: ollama serve
# Terminal 2: cd backend && source venv/bin/activate && uvicorn main:app --reload
# Terminal 3: cd frontend && npm start
```

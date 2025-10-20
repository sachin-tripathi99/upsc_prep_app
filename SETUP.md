# SETUP.md: How to Install and Run "IAS-Prime" Locally

Welcome! This guide provides the extremely detailed steps to set up and run the "IAS-Prime" application on your local computer. This app is 100% free and runs entirely on your machine.

No advanced technical knowledge is needed, just follow the commands exactly.

## 1. Prerequisites (Software You MUST Install First)

You must install these four tools before you begin.

1.  **Git:** This is used to copy the project files.
    * *Download:* [git-scm.com/downloads](https://git-scm.com/downloads)
2.  **Python (Version 3.10+):** This runs the backend (data fetching, AI).
    * *Download:* [python.org/downloads](https://python.org/downloads)
    * **IMPORTANT:** During installation, make sure to check the box that says **"Add Python to PATH"**.
3.  **Node.js (Version 18+):** This runs the frontend (the user interface you see).
    * *Download:* [nodejs.org](https://nodejs.org/) (Download the "LTS" version).
4.  **Ollama (The Local AI):** This is the "magic" that provides all AI features for free.
    * *Download:* [ollama.com](https://ollama.com/)
    * Install it just like any other desktop app.

## 2. Step-by-Step Installation

Follow these steps in order. Open your computer's "Terminal" (on Mac/Linux) or "PowerShell" (on Windows) to type these commands.

### Step 1: Get the Project Code

This command copies the entire project to your computer.

```bash
git clone https://github.com/sachin-tripathi99/upsc_prep_app.git
```

Now, go into the new folder:

```bash
cd upsc_prep_app
```

### Step 2: Set Up the Backend (Python)

This sets up the "engine" of the app.

```bash
# Navigate to the backend folder
cd backend

# Create a 'virtual environment' (a private sandbox for this project)
python -m venv venv

# Activate the virtual environment
# On Mac/Linux:
source venv/bin/activate
# On Windows PowerShell:
.\venv\Scripts\Activate.ps1

# Install all the required Python libraries
pip install -r requirements.txt
```

### Step 3: Set Up the Local AI (Ollama)

This downloads the "brain" for the AI.

1.  Make sure the Ollama application you downloaded in Prerequisites is **running**.
2.  Open a **new** terminal window.
3.  Type the following command to download the AI model. This is a one-time download and may be several gigabytes, so be patient. We recommend `llama3:8b` as a powerful, small model.

```bash
ollama pull llama3:8b
```

(You can leave this terminal open or just ensure the Ollama desktop app is running in your system tray/menu bar).

### Step 4: Set Up the Frontend (The User Interface)

This sets up the website part of the app.

1.  Open a **new, separate** terminal window.
2.  Navigate back to the main project folder and then into the frontend folder.

```bash
# Make sure you are in the main 'upsc_prep_app' folder
cd upsc_prep_app/frontend

# Install all the required libraries
npm install
```

### Step 5: CRITICAL - Populate Your Local Database

This is the most important setup step. You will run a script that scrapes the internet for all the free MCQs and flashcards to fill your database.

1.  Go back to your **Backend terminal** (the one from Step 2, where `(venv)` is active).
2.  You should still be in the `backend` folder.
3.  Run the seeding script:

```bash
python seed_data.py
```

  * **WHAT THIS DOES:** This script will run for **15-30 minutes**. It is visiting dozens of free UPSC quiz websites and scraping thousands of questions, answers, and explanations.
  * It is also populating your database with the pre-made static flashcards.
  * **Do not interrupt this process.** Let it finish. You only need to do this once.

## 3. How to Run the App (Daily Use)

You must have **THREE** terminal windows open to run the full application.

### Terminal 1: Run the AI

Make sure the **Ollama** application is running (or in a terminal, type `ollama serve`).

### Terminal 2: Run the Backend

(This is your Python "engine")

```bash
# Navigate to the backend folder (if not already there)
cd /path/to/upsc_prep_app/backend

# Activate the virtual environment (if not already active)
source venv/bin/activate  # (or .\venv\Scripts\Activate.ps1 on Windows)

# Start the backend server
uvicorn main:app --reload
```

You should see a message like `Application startup complete.`

### Terminal 3: Run the Frontend

(This is your "website" UI)

```bash
# Navigate to the frontend folder (if not already there)
cd /path/to/upsc_prep_app/frontend

# Start the frontend app
npm run start
```

This will automatically open a new tab in your web browser.

**You are done!** The app is now running at `http://localhost:3000`.

## 4. How It Works

  * **To get new news:** Click the "Fetch Today's News" button in the app. This runs the Python scraper for new articles.
  * **Your Data:** All your progress is saved automatically in the `ias_prime.db` file in the `backend` folder. **Do not delete this file!**

## 5. Troubleshooting

### Backend won't start
- Make sure Python 3.10+ is installed: `python --version`
- Ensure virtual environment is activated (you should see `(venv)` in your terminal)
- Try reinstalling dependencies: `pip install -r requirements.txt`

### Frontend won't start
- Make sure Node.js 18+ is installed: `node --version`
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### Ollama not working
- Verify Ollama is running: Check system tray or run `ollama serve`
- Verify model is downloaded: `ollama list`
- Re-download model if needed: `ollama pull llama3:8b`

### Database errors
- If you see database errors, delete the database file and re-run seed_data.py
- Location: `backend/ias_prime.db`

Here is a revised, highly detailed Product Requirement Document (PRD) and a complete `SETUP.md` file, built specifically for your requirements of a **local-only, zero-cost (student-focused) application**.

This document outlines the "loopholes" and free strategies to get the necessary data.

-----

### **Project Requirement Document: "IAS-Prime" (Local-First Edition)**

#### **1. Project Vision**

To create a 100% free, local-first, all-in-one desktop application that guides a UPSC aspirant through a fixed 15-month plan, using locally-run AI and web scraping to provide all necessary tools and content without any subscriptions.

#### **2. Core Architecture (Local-First Model)**

  * **Deployment:** This is a **local-only application** (e.g., a Python backend server and a web-based frontend) that runs entirely on the user's computer. It will not be deployed to the cloud.
  * **Data Storage:** All user data (progress, notes, to-do lists, flashcards) will be stored in a local **`SQLite`** database file (`ias_prime.db`). This is free, serverless, and perfect for this use case.
  * **Data Ingestion:** The app requires an internet connection *only* to run its data-fetching scripts (for news, etc.).
  * **Cost Model:** **Zero-Cost.** This is achieved by:
    1.  Using open-source software (Python, React/Svelte, SQLite).
    2.  Using a **local AI model** via `Ollama` (e.g., `Mistral 7B` or `Llama 3 8B`) for all AI tasks (summarization, tagging, evaluation). This runs on the user's machine and costs nothing.
    3.  Using **RSS Feeds** and **Web Scraping** for data, not paid APIs.

-----

#### **3. Detailed Feature Modules (Local-First Strategy)**

##### **Module 1: The "Daily Briefing" (Scraper & Local-AI Engine)**

This module runs a script *on the user's machine* to fetch and process news.

  * **1.1. Data Source (The "Loophole"):**
      * We will **not** use paid APIs. The app will have a "Fetch Today's News" button that triggers a Python script.
      * **Strategy:**
          * **`PIB` / `PRS`:** These are government sites. We can legally and easily use their **public RSS Feeds** to get 100% of their content. (Easy win).
          * **`The Hindu` / `Indian Express`:** These have paywalls. Direct scraping is brittle.
          * **Solution:** We will use their **public RSS Feeds** to get headlines and short snippets. For full-article text, the app will *attempt* to scrape the article link. If blocked by a paywall, it will fall back to scraping **free UPSC news aggregator sites** (e.g., *IASBaba, InsightsIAS, GKToday*) that have already summarized the same article. This is our primary "loophole" for curated news.
  * **1.2. Local AI Processing:**
      * Once the raw text is fetched, it is piped to the **local `Ollama` model** running on the user's machine.
      * The AI will be prompted to:
        1.  **Summarize** the article (50-word and 250-word versions).
        2.  **Tag** the article with relevant UPSC Syllabus topics (e.g., `GS-II > Polity`).
        3.  **Deconstruct** editorials (Pros, Cons, Keywords).
  * **1.3. Storage:** All processed articles and summaries are saved directly into the local `SQLite` database.

##### **Module 2: The "15-Month Static Roadmap" (Fixed Plan)**

This module is the core tracker, based on a "fixed" (pre-built) plan.

  * **2.1. The "Master Blueprint" (Fixed):**
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
  * **2.2. The Progress Tracker:**
      * The app UI reads this `JSON` file and displays the tasks for the *current* day.
      * When a user clicks "Done" on a task (e.g., `id: "d1t1"`), the app:
        1.  Records `d1t1: done` in the local `SQLite` database.
        2.  **Crucially:** It signals Module 3 to add the flashcards associated with `topic_tag: "polity_ch_1"` to the revision queue.

##### **Module 3: "Synapse" (Local Flashcard System)**

  * **3.1. Core Database:**
      * The app will be bundled with a large, pre-made `flashcards.db` (SQLite) file containing thousands of high-yield static flashcards.
      * Each card will be linked to a `topic_tag` (e.g., `polity_ch_1`).
  * **3.2. Spaced Repetition Engine:**
      * This is a standard, locally-run algorithm (like Anki's SM-2). When a user reviews a card, their "Hard/Good/Easy" input is saved locally to schedule the next review.
  * **3.3. Automatic Queue Population:**
      * As described in 2.2, when a user finishes a to-do item, the associated flashcard deck is "unlocked" and added to their daily review queue.
  * **3.4. AI Generation (Live News):**
      * When reading a news article in Module 1, a "Make Flashcard" button will send the article text to the **local `Ollama` AI** with a prompt: "Generate 5 Q\&A flashcards from this text." The new cards are then saved to the user's local database.

##### **Module 4: "The Crucible" (Practice Suite)**

  * **4.1. Prelims MCQ Simulator (The "Seeding" Loophole):**
      * The app cannot magically *have* 20,000 MCQs.
      * **Solution:** The `SETUP.md` file will include a one-time setup script (e.g., `seed_data.py`).
      * This script will **web-scrape** several *free* online UPSC quiz websites and coaching centers (e.g., *GKToday, Insights*, etc.) and parse their "Daily Quiz" sections.
      * It will pull the Question, Options, and Answer Explanation and load them all into the local `mcqs.db` (SQLite) database. This builds the 20,000-question bank for free.
  * **4.2. Mains Answer "Local-AI" Evaluator:**
      * A user writes an answer. The text is sent to the **local `Ollama` AI** with a detailed prompt:
          * *"You are a strict UPSC Mains evaluator. Grade this answer out of 10. Critique its Structure (Intro/Body/Conclusion), Keyword Usage, and how well it addresses all parts of the question. Provide a 'Model Answer' for comparison."*
      * The quality is dependent on the local model, but it's a 100% free and private evaluation.

-----

-----

### **`SETUP.md`**

(This is the file you would include in the project's code repository.)

````markdown
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
git clone [https://github.com/project-url/ias-prime.git](https://github.com/project-url/ias-prime.git)
````

(Note: Replace `https://github.com/project-url/ias-prime.git` with the actual project URL).

Now, go into the new folder:

```bash
cd ias-prime
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

<!-- end list -->

```bash
ollama pull llama3:8b
```

(You can leave this terminal open or just ensure the Ollama desktop app is running in your system tray/menu bar).

### Step 4: Set Up the Frontend (The User Interface)

This sets up the website part of the app.

1.  Open a **new, separate** terminal window.
2.  Navigate back to the main project folder and then into the frontend folder.

<!-- end list -->

```bash
# Make sure you are in the main 'ias-prime' folder
cd ias-prime/frontend

# Install all the required libraries
npm install
```

### Step 5: CRITICAL - Populate Your Local Database

This is the most important setup step. You will run a script that scrapes the internet for all the free MCQs and flashcards to fill your database.

1.  Go back to your **Backend terminal** (the one from Step 2, where `(venv)` is active).
2.  You should still be in the `backend` folder.
3.  Run the seeding script:

<!-- end list -->

```bash
python seed_data.py
```

  * **WHAT THIS DOES:** This script will run for **15-30 minutes**. It is visiting dozens of free UPSC quiz websites and scraping thousands of questions, answers, and explanations.
  * It is also populating your database with the pre-made static flashcards.
  * **Do not interrupt this process.** Let it finish. You only need to do this once.

## 3\. How to Run the App (Daily Use)

You must have **THREE** terminal windows open to run the full application.

### Terminal 1: Run the AI

Make sure the **Ollama** application is running (or in a terminal, type `ollama serve`).

### Terminal 2: Run the Backend

(This is your Python "engine")

```bash
# Navigate to the backend folder (if not already there)
cd /path/to/ias-prime/backend

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
cd /path/to/ias-prime/frontend

# Start the frontend app
npm run start
```

This will automatically open a new tab in your web browser.

**You are done\!** The app is now running at `http://localhost:3000`.

## 4\. How It Works

  * **To get new news:** Click the "Fetch Today's News" button in the app. This runs the Python scraper for new articles.
  * **Your Data:** All your progress is saved automatically in the `ias_prime.db` file in the `backend` folder. **Do not delete this file\!**

<!-- end list -->

```
```

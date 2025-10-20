# IAS-Prime Quick Start Script for Windows PowerShell

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  IAS-Prime - Quick Start Checker" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Check Python
Write-Host "Checking Python installation..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✓ $pythonVersion found" -ForegroundColor Green
} catch {
    Write-Host "✗ Python not found. Please install Python 3.10+ from python.org" -ForegroundColor Red
    exit 1
}

# Check Node.js
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    Write-Host "✓ Node.js $nodeVersion found" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found. Please install Node.js 18+ from nodejs.org" -ForegroundColor Red
    exit 1
}

# Check npm
Write-Host "Checking npm installation..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version 2>&1
    Write-Host "✓ npm $npmVersion found" -ForegroundColor Green
} catch {
    Write-Host "✗ npm not found. It should come with Node.js" -ForegroundColor Red
    exit 1
}

# Check Ollama
Write-Host "Checking Ollama installation..." -ForegroundColor Yellow
try {
    $ollamaVersion = ollama --version 2>&1
    Write-Host "✓ Ollama found" -ForegroundColor Green
} catch {
    Write-Host "✗ Ollama not found. Please install from ollama.com" -ForegroundColor Red
    Write-Host "  After installing, run: ollama pull llama3:8b" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  All prerequisites are installed!" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Setup backend:"
Write-Host "   cd backend"
Write-Host "   python -m venv venv"
Write-Host "   .\venv\Scripts\Activate.ps1"
Write-Host "   pip install -r requirements.txt"
Write-Host "   python seed_data.py"
Write-Host ""
Write-Host "2. Setup frontend:"
Write-Host "   cd frontend"
Write-Host "   npm install"
Write-Host ""
Write-Host "3. Start the application (3 separate terminals):"
Write-Host "   Terminal 1: ollama serve"
Write-Host "   Terminal 2: cd backend; .\venv\Scripts\Activate.ps1; uvicorn main:app --reload"
Write-Host "   Terminal 3: cd frontend; npm start"
Write-Host ""
Write-Host "See SETUP.md for detailed instructions!" -ForegroundColor Cyan

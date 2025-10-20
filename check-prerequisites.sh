#!/bin/bash

# IAS-Prime Quick Start Script for Linux/Mac
# This script checks prerequisites and provides guidance

echo "=================================================="
echo "  IAS-Prime - Quick Start Checker"
echo "=================================================="
echo ""

# Check Python
echo "Checking Python installation..."
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo "✓ $PYTHON_VERSION found"
else
    echo "✗ Python 3 not found. Please install Python 3.10+ from python.org"
    exit 1
fi

# Check Node.js
echo "Checking Node.js installation..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✓ Node.js $NODE_VERSION found"
else
    echo "✗ Node.js not found. Please install Node.js 18+ from nodejs.org"
    exit 1
fi

# Check npm
echo "Checking npm installation..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✓ npm $NPM_VERSION found"
else
    echo "✗ npm not found. It should come with Node.js"
    exit 1
fi

# Check Ollama
echo "Checking Ollama installation..."
if command -v ollama &> /dev/null; then
    echo "✓ Ollama found"
else
    echo "✗ Ollama not found. Please install from ollama.com"
    echo "  After installing, run: ollama pull llama3:8b"
    exit 1
fi

echo ""
echo "=================================================="
echo "  All prerequisites are installed!"
echo "=================================================="
echo ""
echo "Next steps:"
echo "1. Setup backend:"
echo "   cd backend"
echo "   python3 -m venv venv"
echo "   source venv/bin/activate  # On Windows: .\\venv\\Scripts\\Activate.ps1"
echo "   pip install -r requirements.txt"
echo "   python seed_data.py"
echo ""
echo "2. Setup frontend:"
echo "   cd frontend"
echo "   npm install"
echo ""
echo "3. Start the application (3 separate terminals):"
echo "   Terminal 1: ollama serve"
echo "   Terminal 2: cd backend && source venv/bin/activate && uvicorn main:app --reload"
echo "   Terminal 3: cd frontend && npm start"
echo ""
echo "See SETUP.md for detailed instructions!"

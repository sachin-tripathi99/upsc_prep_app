import httpx
import json
from typing import Optional, Dict, List


class OllamaService:
    """Service for interacting with local Ollama AI"""
    
    def __init__(self, base_url: str = "http://localhost:11434", model: str = "llama3:8b"):
        self.base_url = base_url
        self.model = model
    
    async def generate(self, prompt: str, system_prompt: Optional[str] = None) -> str:
        """Generate text using Ollama"""
        try:
            async with httpx.AsyncClient(timeout=120.0) as client:
                payload = {
                    "model": self.model,
                    "prompt": prompt,
                    "stream": False
                }
                
                if system_prompt:
                    payload["system"] = system_prompt
                
                response = await client.post(
                    f"{self.base_url}/api/generate",
                    json=payload
                )
                response.raise_for_status()
                
                result = response.json()
                return result.get("response", "")
        except Exception as e:
            print(f"Error generating with Ollama: {e}")
            return f"Error: Unable to connect to Ollama. Make sure it's running. ({str(e)})"
    
    async def summarize_article(self, article_text: str) -> Dict[str, str]:
        """Generate short and long summaries of an article"""
        
        # Short summary (50 words)
        short_prompt = f"""Summarize the following article in exactly 50 words or less, focusing on the key UPSC-relevant points:

{article_text}

Summary:"""
        
        short_summary = await self.generate(
            short_prompt,
            system_prompt="You are a UPSC preparation expert. Provide concise, exam-focused summaries."
        )
        
        # Long summary (250 words)
        long_prompt = f"""Provide a detailed summary of the following article in about 250 words, highlighting all important facts, figures, and UPSC-relevant insights:

{article_text}

Detailed Summary:"""
        
        long_summary = await self.generate(
            long_prompt,
            system_prompt="You are a UPSC preparation expert. Provide comprehensive, exam-focused analysis."
        )
        
        return {
            "short": short_summary.strip(),
            "long": long_summary.strip()
        }
    
    async def tag_article(self, article_text: str, title: str) -> List[str]:
        """Tag article with relevant UPSC syllabus topics"""
        
        prompt = f"""Analyze this article and identify relevant UPSC General Studies topics. 
Return ONLY a comma-separated list of tags from this list:
GS-I-History, GS-I-Geography, GS-I-Culture, GS-I-Society
GS-II-Polity, GS-II-Governance, GS-II-International-Relations, GS-II-Social-Justice
GS-III-Economy, GS-III-Environment, GS-III-Science-Tech, GS-III-Security, GS-III-Disaster
GS-IV-Ethics

Title: {title}
Article: {article_text[:500]}...

Tags (comma-separated only):"""
        
        tags = await self.generate(
            prompt,
            system_prompt="You are a UPSC syllabus expert. Return only comma-separated tags, no explanation."
        )
        
        # Parse and clean tags
        tag_list = [tag.strip() for tag in tags.split(",") if tag.strip()]
        return tag_list[:5]  # Limit to 5 tags
    
    async def deconstruct_editorial(self, article_text: str) -> Dict[str, str]:
        """Deconstruct an editorial into pros, cons, and keywords"""
        
        prompt = f"""Analyze this editorial for UPSC Mains preparation. Provide:

1. PROS (Arguments in favor):
2. CONS (Arguments against):
3. KEY TERMS (Important vocabulary/concepts):

Editorial:
{article_text}

Analysis:"""
        
        analysis = await self.generate(
            prompt,
            system_prompt="You are a UPSC Mains expert. Provide structured analysis for essay/answer writing."
        )
        
        # Parse the response
        sections = {
            "pros": "",
            "cons": "",
            "keywords": ""
        }
        
        # Simple parsing (can be improved)
        lines = analysis.split("\n")
        current_section = None
        
        for line in lines:
            line_lower = line.lower()
            if "pros" in line_lower or "favor" in line_lower:
                current_section = "pros"
            elif "cons" in line_lower or "against" in line_lower:
                current_section = "cons"
            elif "key" in line_lower or "term" in line_lower:
                current_section = "keywords"
            elif current_section and line.strip():
                sections[current_section] += line.strip() + "\n"
        
        return sections
    
    async def generate_flashcards(self, text: str, count: int = 5) -> List[Dict[str, str]]:
        """Generate flashcards from text"""
        
        prompt = f"""Create {count} question-answer flashcards from this text for UPSC preparation.
Format each as:
Q: [Question]
A: [Answer]

Separate each flashcard with "---"

Text:
{text}

Flashcards:"""
        
        response = await self.generate(
            prompt,
            system_prompt="You are a UPSC flashcard creator. Make clear, exam-focused Q&A pairs."
        )
        
        # Parse flashcards
        flashcards = []
        cards = response.split("---")
        
        for card in cards:
            lines = card.strip().split("\n")
            question = ""
            answer = ""
            
            for line in lines:
                if line.startswith("Q:"):
                    question = line[2:].strip()
                elif line.startswith("A:"):
                    answer = line[2:].strip()
            
            if question and answer:
                flashcards.append({"question": question, "answer": answer})
        
        return flashcards[:count]
    
    async def evaluate_mains_answer(self, question: str, answer: str) -> Dict[str, any]:
        """Evaluate a mains answer"""
        
        prompt = f"""You are a strict UPSC Mains evaluator. Evaluate this answer out of 10 marks.

Question: {question}

Candidate's Answer:
{answer}

Provide:
1. Score (out of 10):
2. Structure Analysis (Intro/Body/Conclusion):
3. Keyword Usage:
4. Coverage of question:
5. Model Answer:

Evaluation:"""
        
        evaluation = await self.generate(
            prompt,
            system_prompt="You are a UPSC Mains examiner with 20 years of experience. Be constructive but strict."
        )
        
        # Try to extract score
        score = 0.0
        lines = evaluation.split("\n")
        for line in lines:
            if "score" in line.lower() and ":" in line:
                try:
                    score_text = line.split(":")[1].strip().split()[0]
                    score = float(score_text)
                    break
                except:
                    pass
        
        return {
            "score": score,
            "evaluation": evaluation,
            "feedback_short": lines[0] if lines else "See full evaluation"
        }


# Singleton instance
ollama_service = OllamaService()

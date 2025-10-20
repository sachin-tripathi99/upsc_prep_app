import feedparser
import requests
from bs4 import BeautifulSoup
from datetime import datetime, date
from typing import List, Dict, Optional
import time


class NewsScraperService:
    """Service for scraping news from various sources"""
    
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
    
    def fetch_pib_news(self) -> List[Dict]:
        """Fetch news from PIB RSS feed"""
        articles = []
        try:
            # PIB Press Releases RSS
            feed_url = "https://pib.gov.in/RssMain.aspx"
            feed = feedparser.parse(feed_url)
            
            for entry in feed.entries[:10]:  # Limit to 10 articles
                articles.append({
                    'title': entry.get('title', ''),
                    'content': entry.get('summary', ''),
                    'url': entry.get('link', ''),
                    'source': 'PIB',
                    'date': datetime.now().date()
                })
        except Exception as e:
            print(f"Error fetching PIB news: {e}")
        
        return articles
    
    def fetch_the_hindu_rss(self) -> List[Dict]:
        """Fetch headlines from The Hindu RSS"""
        articles = []
        try:
            # The Hindu has multiple RSS feeds
            feeds = [
                "https://www.thehindu.com/news/national/feeder/default.rss",
                "https://www.thehindu.com/opinion/feeder/default.rss"
            ]
            
            for feed_url in feeds:
                feed = feedparser.parse(feed_url)
                
                for entry in feed.entries[:5]:
                    articles.append({
                        'title': entry.get('title', ''),
                        'content': entry.get('summary', ''),
                        'url': entry.get('link', ''),
                        'source': 'The Hindu',
                        'date': datetime.now().date()
                    })
                
                time.sleep(1)  # Be respectful to servers
        except Exception as e:
            print(f"Error fetching The Hindu RSS: {e}")
        
        return articles
    
    def fetch_indian_express_rss(self) -> List[Dict]:
        """Fetch headlines from Indian Express RSS"""
        articles = []
        try:
            feed_url = "https://indianexpress.com/feed/"
            feed = feedparser.parse(feed_url)
            
            for entry in feed.entries[:10]:
                articles.append({
                    'title': entry.get('title', ''),
                    'content': entry.get('summary', ''),
                    'url': entry.get('link', ''),
                    'source': 'Indian Express',
                    'date': datetime.now().date()
                })
        except Exception as e:
            print(f"Error fetching Indian Express RSS: {e}")
        
        return articles
    
    def scrape_full_article(self, url: str) -> Optional[str]:
        """Attempt to scrape full article text from URL"""
        try:
            response = requests.get(url, headers=self.headers, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Remove script and style elements
            for script in soup(["script", "style"]):
                script.decompose()
            
            # Try to find article content (common patterns)
            article_content = None
            
            # Try various common article container classes
            for selector in ['article', '.article-content', '.story-content', 
                           'div[itemprop="articleBody"]', '.content']:
                content = soup.select_one(selector)
                if content:
                    article_content = content.get_text(strip=True, separator='\n')
                    break
            
            if not article_content:
                # Fallback: get all paragraph text
                paragraphs = soup.find_all('p')
                article_content = '\n'.join([p.get_text(strip=True) for p in paragraphs if p.get_text(strip=True)])
            
            return article_content if article_content else None
            
        except Exception as e:
            print(f"Error scraping article {url}: {e}")
            return None
    
    def fetch_all_news(self) -> List[Dict]:
        """Fetch news from all sources"""
        all_articles = []
        
        print("Fetching PIB news...")
        all_articles.extend(self.fetch_pib_news())
        
        print("Fetching The Hindu news...")
        all_articles.extend(self.fetch_the_hindu_rss())
        
        print("Fetching Indian Express news...")
        all_articles.extend(self.fetch_indian_express_rss())
        
        # Try to fetch full content for each article
        for article in all_articles:
            if len(article.get('content', '')) < 200:  # If summary is too short
                print(f"Attempting to fetch full article: {article['title'][:50]}...")
                full_content = self.scrape_full_article(article['url'])
                if full_content and len(full_content) > len(article.get('content', '')):
                    article['content'] = full_content
                time.sleep(1)  # Rate limiting
        
        print(f"Total articles fetched: {len(all_articles)}")
        return all_articles


# Singleton instance
news_scraper = NewsScraperService()

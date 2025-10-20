import React, { useState, useEffect } from 'react';
import { newsAPI } from '../services/api';

function DailyBriefing() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    loadTodayNews();
  }, []);

  const loadTodayNews = async () => {
    setLoading(true);
    try {
      const response = await newsAPI.getTodayNews();
      setArticles(response.data);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchNews = async () => {
    setFetching(true);
    try {
      await newsAPI.fetchNews();
      alert('News fetched and processed successfully! This may take a few minutes for AI processing.');
      await loadTodayNews();
    } catch (error) {
      console.error('Error fetching news:', error);
      alert('Error fetching news. Make sure the backend and Ollama are running.');
    } finally {
      setFetching(false);
    }
  };

  const viewArticle = (article) => {
    setSelectedArticle(article);
  };

  if (selectedArticle) {
    return (
      <div>
        <button className="btn btn-primary" onClick={() => setSelectedArticle(null)}>
          ← Back to List
        </button>
        <div className="card" style={{ marginTop: '1rem' }}>
          <h2>{selectedArticle.title}</h2>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            Source: {selectedArticle.source} | {new Date(selectedArticle.date).toLocaleDateString()}
          </p>
          
          <div style={{ marginTop: '2rem' }}>
            <h3>Quick Summary (50 words)</h3>
            <p>{selectedArticle.summary_short || 'Processing...'}</p>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h3>Detailed Summary (250 words)</h3>
            <p>{selectedArticle.summary_long || 'Processing...'}</p>
          </div>

          {selectedArticle.topic_tags && (
            <div style={{ marginTop: '2rem' }}>
              <h3>UPSC Topics</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {selectedArticle.topic_tags.split(',').map((tag, i) => (
                  <span key={i} style={{
                    background: '#667eea',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '15px',
                    fontSize: '0.9rem'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: '2rem' }}>
            <a href={selectedArticle.url} target="_blank" rel="noopener noreferrer">
              Read Original Article →
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <h2>📰 Daily Briefing</h2>
        <p>AI-processed current affairs from PIB, The Hindu, and Indian Express</p>
        <button 
          className="btn btn-primary" 
          onClick={handleFetchNews}
          disabled={fetching}
        >
          {fetching ? '⏳ Fetching News...' : '📥 Fetch Today\'s News'}
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading today's news...</div>
      ) : articles.length === 0 ? (
        <div className="card">
          <p>No articles for today. Click "Fetch Today's News" to get started!</p>
        </div>
      ) : (
        <div>
          <h3>Today's Articles ({articles.length})</h3>
          {articles.map(article => (
            <div key={article.id} className="card" style={{ cursor: 'pointer' }} onClick={() => viewArticle(article)}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{article.title}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>
                {article.source} | {new Date(article.date).toLocaleDateString()}
              </p>
              {article.summary_short && (
                <p>{article.summary_short.substring(0, 150)}...</p>
              )}
              {article.topic_tags && (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  {article.topic_tags.split(',').slice(0, 3).map((tag, i) => (
                    <span key={i} style={{
                      background: '#eee',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '5px',
                      fontSize: '0.8rem'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DailyBriefing;

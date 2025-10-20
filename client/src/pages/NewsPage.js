import React, { useEffect, useState } from 'react';
import { newsAPI, progressAPI } from '../services/api';
import './NewsPage.css';

function NewsPage() {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImportance, setSelectedImportance] = useState('All');
  const [loading, setLoading] = useState(true);
  const [expandedArticle, setExpandedArticle] = useState(null);

  useEffect(() => {
    fetchNews();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedImportance]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedCategory !== 'All') params.category = selectedCategory;
      if (selectedImportance !== 'All') params.importance = selectedImportance;
      
      const response = await newsAPI.getAll(params);
      setNews(response.data.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await newsAPI.getCategories();
      setCategories(['All', ...response.data.data]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const markAsRead = async (articleId) => {
    try {
      await progressAPI.markNewsRead();
      alert('Article marked as read! Progress updated.');
    } catch (error) {
      console.error('Error marking news as read:', error);
    }
  };

  const toggleArticle = (index) => {
    setExpandedArticle(expandedArticle === index ? null : index);
  };

  return (
    <div className="news-page">
      <div className="page-header">
        <h1>📰 Daily News Updates</h1>
        <p className="page-subtitle">The Hindu - UPSC Relevant Articles</p>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Category:</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Importance:</label>
          <select 
            value={selectedImportance} 
            onChange={(e) => setSelectedImportance(e.target.value)}
            className="filter-select"
          >
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading news articles...</div>
      ) : (
        <div className="news-grid">
          {news.map((article, index) => (
            <div key={index} className={`news-card ${expandedArticle === index ? 'expanded' : ''}`}>
              <div className="news-header">
                <div className="news-meta">
                  <span className={`category-badge ${article.category.toLowerCase().replace(/\s+/g, '-')}`}>
                    {article.category}
                  </span>
                  <span className={`importance-badge ${article.importance.toLowerCase()}`}>
                    {article.importance}
                  </span>
                </div>
                <span className="news-date">
                  {new Date(article.date).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              <h2 className="news-title">{article.title}</h2>
              
              <div className={`news-content ${expandedArticle === index ? 'show' : ''}`}>
                <p>{article.content}</p>
                
                {article.tags && article.tags.length > 0 && (
                  <div className="tags-section">
                    <strong>Tags:</strong>
                    <div className="tags">
                      {article.tags.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}

                {article.relatedTopics && article.relatedTopics.length > 0 && (
                  <div className="related-topics">
                    <strong>Related Topics:</strong>
                    <div className="topics">
                      {article.relatedTopics.map((topic, i) => (
                        <span key={i} className="topic">{topic}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="news-actions">
                <button 
                  onClick={() => toggleArticle(index)}
                  className="btn btn-primary"
                >
                  {expandedArticle === index ? 'Read Less' : 'Read More'}
                </button>
                <button 
                  onClick={() => markAsRead(index)}
                  className="btn btn-secondary"
                >
                  Mark as Read ✓
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && news.length === 0 && (
        <div className="no-data">
          <p>No news articles found for the selected filters.</p>
        </div>
      )}
    </div>
  );
}

export default NewsPage;

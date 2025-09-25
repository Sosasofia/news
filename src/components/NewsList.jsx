import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import newsService from '../services/newsService';
import './NewsList.css';

function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const newsData = await newsService.getAllNews();
      setNews(Array.isArray(newsData) ? newsData : []);
    } catch (error) {
      setError('Failed to load news. Please check if the API server is running.');
      setNews([]);
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortedNews = [...news].sort((a, b) => {
    const dateA = new Date(a.createdAt || a.date || Date.now());
    const dateB = new Date(b.createdAt || b.date || Date.now());
    
    if (sortOrder === 'desc') {
      return dateB - dateA; 
    } else {
      return dateA - dateB;
    }
  });

  if (loading) {
    return (
      <div className="news-list">
        <div className="loading">Loading news...</div>
      </div>
    );
  }

  return (
    <div className="news-list">
      <div className="news-header">
        <h1>News Dashboard</h1>
        <div className="news-actions">
          <Link to="/create" className="btn btn-primary">Create New Article</Link>
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort-select"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={loadNews} className="retry-btn">Retry</button>
        </div>
      )}

      {sortedNews.length === 0 ? (
        <div className="no-news">
          <p>No news articles found.</p>
          <Link to="/create" className="btn btn-primary">Create your first article</Link>
        </div>
      ) : (
        <div className="news-grid">
          {sortedNews.map((item) => (
            <div key={item._id} className="news-card">
              <div className="news-content">
                <h2 className="news-title">{item.title}</h2>
                <p className="news-excerpt">
                  {item.content && item.content.length > 150 
                    ? `${item.content.substring(0, 150)}...` 
                    : item.content || 'No content available'}
                </p>
                <Link to={`/view/${item._id}`} className="read-more-btn" state={item}>Read More</Link>
                <div className="news-meta">
                  <span className="news-date">
                    {item.createdAt || item.date 
                      ? new Date(item.createdAt || item.date).toLocaleDateString() 
                      : 'Unknown date'}
                  </span>
                  {item.author && <span className="news-author">By {item.author}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewsList;
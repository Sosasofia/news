import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import newsService from '../services/newsService';
import './NewsForm.css';

function NewsForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingData, setLoadingData] = useState(isEdit);

  useEffect(() => {
    const loadNewsItem = async () => {
      try {
        setLoadingData(true);
        setError(null);
        const newsItem = await newsService.getNewsById(id);
        setFormData({
          title: newsItem.title || '',
          content: newsItem.content || '',
          author: newsItem.author || ''
        });
      } catch (error) {
        setError('Failed to load news item. Please check if the API server is running.');
        console.error('Error loading news item:', error);
      } finally {
        setLoadingData(false);
      }
    };

    if (isEdit) {
      loadNewsItem();
    }
  }, [id, isEdit]);

  // This function is no longer needed outside useEffect
  // const loadNewsItem = async () => { ... }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const newsData = {
        ...formData,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };

      if (isEdit) {
        await newsService.updateNews(id, newsData);
        navigate(`/view/${id}`);
      } else {
        await newsService.createNews(newsData);
        navigate('/');
      }
    } catch (error) {
      setError(`Failed to ${isEdit ? 'update' : 'create'} news item. Please check if the API server is running.`);
      console.error('Error saving news item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (isEdit) {
      navigate(`/view/${id}`);
    } else {
      navigate('/');
    }
  };

  if (loadingData) {
    return (
      <div className="news-form">
        <div className="loading">Loading news item...</div>
      </div>
    );
  }

  return (
    <div className="news-form">
      <h1>{isEdit ? 'Edit News Article' : 'Create New Article'}</h1>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="Enter article title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter author name (optional)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            disabled={loading}
            placeholder="Enter article content"
            rows={10}
          />
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={handleCancel}
            className="btn btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : (isEdit ? 'Update Article' : 'Create Article')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewsForm;
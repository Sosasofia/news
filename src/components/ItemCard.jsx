import { Link, useNavigate, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import newsService from '../services/newsService';
import './ItemCard.css';

function ItemCard() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [item, setItem] = useState(location.state);
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadNewsItem = async () => {
            if (!item && id) {
                try {
                    setLoadingData(true);
                    setError(null);
                    const newsItem = await newsService.getNewsById(id);
                    setItem(newsItem);
                } catch (error) {
                    setError('Failed to load news item. Please check if the API server is running.');
                    console.error('Error loading news item:', error);
                } finally {
                    setLoadingData(false);
                }
            }
        };

        loadNewsItem();
    }, [id, item]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this news item?')) {
            return;
        }

        try {
            setLoading(true);
            setError(null);
            await newsService.deleteNews(id);
            navigate('/', { replace: true });
        } catch (error) {
            setError('Failed to delete news item.');
            console.error('Error deleting news item:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loadingData) {
        return (
            <div className="item-card-container">
                <div className="loading">Loading news item...</div>
            </div>
        );
    }

    return (
        <div className="item-card-container">
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
            { item ? (
                <div key={item._id} className="item-card">
                    <div className="item-content">
                    <h2 className="item-title">{item.title}</h2>
                    <p className="item-excerpt">
                        {item.content || 'No content available'}
                    </p>
                    <div className="item-meta">
                        <span className="item-date">
                        {item.createdAt || item.date 
                            ? new Date(item.createdAt || item.date).toLocaleDateString() 
                            : 'Unknown date'}
                        </span>
                        {item.author && <span className="item-author">By {item.author}</span>}
                    </div>
                    </div>
                    <div className="item-actions-card">
                        <Link to="/" className="return-btn">Go back</Link>
                        <Link 
                            to={`/edit/${item._id}`} 
                            className={`btn btn-secondary ${loading ? 'disabled' : ''}`}
                            state={item}
                        >
                            Edit
                        </Link>
                        <button 
                            onClick={() => handleDelete(item._id)} 
                            className="btn btn-danger"
                            disabled={loading}
                        >
                            {loading ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            ) : (
            <div className="item-card-placeholder">
                <p>No news article selected.</p>
            </div>
            )}
        </div>
    )
}

export default ItemCard;
const BASE_URL = import.meta.env.VITE_APP_API_URL; // Update this URL to match your backend API

class NewsService {
  async getAllNews() {
    try {
      const response = await fetch(`${BASE_URL}/news`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  }

  async getNewsById(id) {
    try {
      const response = await fetch(`${BASE_URL}/news/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching news by id:', error);
      throw error;
    }
  }

  async createNews(newsData) {
    try {
      const response = await fetch(`${BASE_URL}/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating news:', error);
      throw error;
    }
  }

  async updateNews(id, newsData) {
    try {
      const response = await fetch(`${BASE_URL}/news/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating news:', error);
      throw error;
    }
  }

  async deleteNews(id) {
    try {
      const response = await fetch(`${BASE_URL}/news/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return true;
    } catch (error) {
      console.error('Error deleting news:', error);
      throw error;
    }
  }
}

export default new NewsService();
# News Dashboard

A modern React-based news dashboard application built with Vite for managing news articles. This frontend application provides a complete CRUD (Create, Read, Update, Delete) interface for news management.

## Features

- **📰 News List**: View all news articles in a clean, organized layout
- **🔄 Sorting**: Sort articles by newest or oldest first
- **➕ Create Articles**: Add new news articles with title, author, and content
- **✏️ Edit Articles**: Update existing news articles
- **🗑️ Delete Articles**: Remove articles with confirmation dialog
- **📱 Responsive Design**: Mobile-friendly interface
- **⚡ Fast Loading**: Built with Vite for optimal performance
- **🎨 Modern UI**: Clean, professional design with proper error handling

## Screenshots

### Main Dashboard
![News Dashboard Main](https://github.com/user-attachments/assets/a9a511c7-97c0-4052-b8cd-25e7a62d9a1f)

### Create/Edit Form
![Create Article Form](https://github.com/user-attachments/assets/9561b99a-dc0f-4971-9639-daf767565528)

### Form with Data
![Filled Form](https://github.com/user-attachments/assets/2b1ccc88-4172-4f4c-a78b-9d20b51f8f7b)

## Tech Stack

- **React 19.1.1** - UI framework
- **Vite 7.1.6** - Build tool and development server
- **React Router DOM** - Client-side routing
- **CSS3** - Styling and responsive design
- **ESLint** - Code linting and quality

## API Integration

The application is designed to work with a REST API that supports the following endpoints:

- `GET /api/news` - Fetch all news articles
- `GET /api/news/:id` - Fetch a specific news article
- `POST /api/news` - Create a new news article
- `PUT /api/news/:id` - Update an existing news article
- `DELETE /api/news/:id` - Delete a news article

### API Configuration

The API base URL is configured in `src/services/newsService.js`:

```javascript
const BASE_URL = 'http://localhost:3001/api'; // Update this URL to match your backend API
```

Update this URL to match your backend API server.

### Expected Data Format

The application expects news articles in the following format:

```json
{
  "id": "string|number",
  "title": "string",
  "content": "string",
  "author": "string (optional)",
  "createdAt": "ISO date string",
  "date": "ISO date string (fallback)"
}
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd news
```

2. Install dependencies:
```bash
npm install
```

3. Update the API URL in `src/services/newsService.js` if needed

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

### Viewing News Articles

1. The main dashboard displays all news articles
2. Use the "Newest First" / "Oldest First" dropdown to change sorting
3. If no API server is running, you'll see appropriate error messages

### Creating News Articles

1. Click "Create New Article" button
2. Fill in the required fields (Title and Content)
3. Optionally add an Author
4. Click "Create Article" to save

### Editing News Articles

1. Click the "Edit" button on any news article card
2. Modify the fields as needed
3. Click "Update Article" to save changes

### Deleting News Articles

1. Click the "Delete" button on any news article card
2. Confirm the deletion in the dialog
3. The article will be removed from the list

## Error Handling

The application includes comprehensive error handling:

- **API Connection Errors**: Clear messages when the backend is unavailable
- **Form Validation**: Required field validation
- **Network Errors**: Retry functionality for failed requests
- **User Feedback**: Loading states and success/error messages

## Responsive Design

The application is fully responsive and works well on:
- Desktop computers
- Tablets
- Mobile phones

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint` to ensure code quality
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

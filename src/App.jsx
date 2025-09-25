import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NewsList from './components/NewsList'
import NewsForm from './components/NewsForm'
import ItemCard from './components/ItemCard'
import './App.css'


function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<NewsList />} />
          <Route path="/create" element={<NewsForm />} />
          <Route path="/edit/:id" element={<NewsForm />} />
          <Route path="/view/:id" element={<ItemCard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

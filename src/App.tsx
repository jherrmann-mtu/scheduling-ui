import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';

function App() {

  return (
    <BrowserRouter>
      <div className="app-root">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/away">Away</Link>
        </nav>
      </div>

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/away" element={<p>Away</p>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App

import { useContext } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { AuthContext, clearAuth } from './api/AuthContext';
import './App.css';
import AuthPage from './auth/AuthPage';
import Home from './pages/Home';
import Create from './pages/Create';

function App() {
  const { token } = useContext(AuthContext)

  if (token === "") {
    return <AuthPage />
  }

  
  return (
    <BrowserRouter>
      <div className="nav-container">
        <nav>
          <Link className="nav-item" to="/">Home</Link>
          <Link className="nav-item" to="/create">Create Appointment</Link>
          <button className="nav-item" onClick={clearAuth}>Logout</button>
        </nav>
      </div>

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </main>
    </BrowserRouter>)
}

export default App

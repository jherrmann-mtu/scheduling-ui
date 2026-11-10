import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from './api/AuthContext';
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
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </main>
    </BrowserRouter>)
}

export default App

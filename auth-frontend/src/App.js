import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import RefreshToken from './pages/RefreshToken';
import VerifyToken from './pages/VerifyToken';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/refresh-token" element={<RefreshToken />} /> {/* Add route */}
            <Route path="/verify-token" element={<VerifyToken />} /> {/* Add route */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
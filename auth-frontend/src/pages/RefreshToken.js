import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const RefreshToken = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { refreshToken } = useAuth();

  const handleRefresh = async () => {
    try {
      const refreshed = await refreshToken();
      if (refreshed) {
        setSuccess('Token refreshed successfully!');
        setTimeout(() => navigate('/profile'), 2000); // Redirect after 2 seconds
      } else {
        setError('Failed to refresh token.');
      }
    } catch (error) {
      setError('An error occurred while refreshing the token.');
      console.error('Refresh token error:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold">Refresh Token</h1>
      <button
        onClick={handleRefresh}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Refresh Token
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
};

export default RefreshToken;

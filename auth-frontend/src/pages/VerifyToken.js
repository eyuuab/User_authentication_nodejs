import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const VerifyToken = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [valid, setValid] = useState(null);
  const navigate = useNavigate();
  const { verifyToken } = useAuth();

  const handleVerify = async () => {
    try {
      const isValid = await verifyToken(token);
      setValid(isValid);
      if (isValid) {
        navigate('/profile');
      } else {
        setError('Invalid token.');
      }
    } catch (error) {
      setError('An error occurred while verifying the token.');
      console.error('Verify token error:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold">Verify Token</h1>
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter token"
        className="mt-4 px-4 py-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleVerify}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Verify Token
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {valid !== null && (
        <p className={`mt-4 ${valid ? 'text-green-500' : 'text-red-500'}`}>
          {valid ? 'Token is valid.' : 'Token is invalid.'}
        </p>
      )}
    </div>
  );
};

export default VerifyToken;


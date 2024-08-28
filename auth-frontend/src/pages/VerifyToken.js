import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const VerifyToken = () => {
  const [error, setError] = useState('');
  const [valid, setValid] = useState(null);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth(); // Assumes token is stored in context

  useEffect(() => {
    const verifyCurrentToken = async () => {
      if (!auth?.accessToken) {
        setError('No access token found.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post('http://localhost:4000/api/auth/verify', {
          token: auth.accessToken
        });

        if (response.status === 200) {
          setValid(response.data.valid);
        } else {
          setError('Failed to verify token.');
        }
      } catch (error) {
        setError('An error occurred while verifying the token.');
        console.error('Verify token error:', error);
      } finally {
        setLoading(false);
      }
    };

    verifyCurrentToken();
  }, [auth]);

  if (loading) {
    return <div className="container mx-auto mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold">Verify Token</h1>
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

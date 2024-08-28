import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { user, loading, refreshToken, verifyToken } = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    const checkToken = async () => {
      if (user) {
        const tokenValid = await verifyToken(user.accessToken);
        if (!tokenValid) {
          const refreshed = await refreshToken();
          if (!refreshed) {
            setError('Session expired. Please log in again.');
          }
        }
      }
    };

    checkToken();
  }, [user, verifyToken, refreshToken]);

  if (loading) {
    return <div className="container mx-auto mt-8">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
      <p className="mt-4">Email: {user.email}</p>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Profile;

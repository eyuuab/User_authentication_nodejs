import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="container mx-auto mt-8">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
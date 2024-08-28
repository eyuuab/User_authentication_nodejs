import React, { useState } from 'react';

const Home = () => {
  const [message, setMessage] = useState('This is a simple authentication demo using React and a custom backend.');

  const handleClick = () => {
    setMessage('Button clicked! Redirecting to login...');
    // Simulate a redirect
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  };

  return (
    <div className="container mx-auto mt-8" style={{ textAlign: 'center', padding: '20px', border: '1px solid #ccc' }}>
      <h1 className="text-3xl font-bold mb-4" style={{ color: '#333' }}>Welcome to Auth Demo</h1>
      <p>{message}</p>
      <button 
        onClick={handleClick} 
        style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Go to Login
      </button>
    </div>
  );
};

export default Home;
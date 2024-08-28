import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth) : null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth) {
      localStorage.setItem('auth', JSON.stringify(auth));
      axios.defaults.headers.common['Authorization'] = `Bearer ${auth.accessToken}`;
    } else {
      localStorage.removeItem('auth');
      delete axios.defaults.headers.common['Authorization'];
    }
    setLoading(false);
  }, [auth]);

  const login = (authData) => {
    setAuth(authData);
    localStorage.setItem('refreshToken', authData.refreshToken);
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('auth');
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      logout();
      return false;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/auth/refresh', { refreshToken });
      if (response.status === 200) {
        const { accessToken } = response.data;
        setAuth(prevAuth => ({ ...prevAuth, accessToken }));
        return true;
      }
    } catch (error) {
      console.error('Failed to refresh token:', error);
      logout();
    }
    return false;
  };

  const verifyToken = async (token) => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/verify', { token });
      return response.data.valid;
    } catch (error) {
      console.error('Failed to verify token:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, refreshToken, verifyToken, loading, user: auth?.user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

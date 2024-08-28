import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const auth = useAuth();

      try {
        const success = await auth.refreshToken();
        if (success) {
          const { accessToken } = auth.auth;
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return axios(originalRequest);
        }
      } catch (error) {
        console.error('Failed to refresh token:', error);
        localStorage.removeItem('auth');
        window.location.href = '/login'; // Redirect to login if refresh fails
      }
    }

    return Promise.reject(error);
  }
);

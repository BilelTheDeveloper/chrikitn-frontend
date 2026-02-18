import axios from 'axios';
import { API_BASE_URL } from '../config/config'; // ✅ Use your central config

const api = axios.create({
  baseURL: API_BASE_URL, 
});

// Automatically add the token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Matches standard JWT Bearer strategy
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
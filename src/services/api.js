
import axios from 'axios';

// The base URL for the SmartStudent Application Tier (Server)
// In development, this would be your local backend server address
const BASE_URL = 'http://localhost:8000/api/v1'; 

// Create an Axios instance configured for the SmartStudent API
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to handle Authentication Tokens (JWT/OAuth 2.0) 
// This will attach the token to every request if it exists in local storage
api.interceptors.request.use(
  (config) => {
    // Check if a token is stored (e.g., from a successful login)
    const token = localStorage.getItem('accessToken'); 
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
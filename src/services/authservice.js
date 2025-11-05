import api from './api';

const login = async (email, password) => {
  try {
    // Calls the backend API for secure authentication [cite: 371]
    const response = await api.post('/auth/login', { email, password });
    
    // Assuming the backend returns a token and user role
    const { token, user } = response.data;
    
    // Store token for future authenticated requests 
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userRole', user.role); // Store role for access control [cite: 78, 161]
    
    return user;
  } catch (error) {
    console.error('Login failed:', error.response.data);
    throw error;
  }
};

const register = async (userData) => {
  try {
    // The system shall allow users to register [cite: 427]
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error.response.data);
    throw error;
  }
};

const logout = () => {
  // Clear stored credentials
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userRole');
};

const authService = {
  login,
  register,
  logout,
};

export default authService;
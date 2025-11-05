import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authservice';

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user object and role
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user data from local storage on initial load
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    const storedToken = localStorage.getItem('accessToken');
    
    if (storedToken && storedRole) {
      // Simulate user object retrieval using stored data
      setUser({ role: storedRole, name: 'Authenticated User' });
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      const userData = await authService.login(email, password);
      setUser(userData);
      setIsAuthenticated(true);
      setLoading(false);
      return userData; // Return user for redirection logic
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    // Redirect to login page upon completion
  };

  const contextValue = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  if (loading) {
    // Optional: Return a loading spinner while checking local storage
    return <div>Loading Application...</div>; 
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom Hook to easily consume the context
export const useAuth = () => {
  return useContext(AuthContext);
};
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    // If not authenticated, redirect to login
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // If authenticated but role is not authorized, redirect to a forbidden page
    return <Navigate to="/unauthorized" replace />;
  }
  
  // If authorized, render the child route
  return <Outlet />; 
};

export default ProtectedRoute;
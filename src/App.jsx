import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import StudentDashboard from './pages/studentdashboard';
import LecturerDashboard from './pages/lecturerdashboard';
import AdminDashboard from './pages/admindashboard';
import ProtectedRoute from './components/protectedroutes';
import { AuthProvider } from './context/authcontext';
import './styles/App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginPage />} />
          
          {/* Student Routes */}
          <Route element={<ProtectedRoute allowedRoles={['student']} />}>
            <Route path="/student-dashboard" element={<StudentDashboard />} />
          </Route>

          {/* Lecturer Routes */}
          <Route element={<ProtectedRoute allowedRoles={['lecturer']} />}>
            <Route path="/lecturer-dashboard" element={<LecturerDashboard />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>

          {/* Fallback for unauthorized access */}
          <Route 
            path="/unauthorized" 
            element={
              <div className="unauthorized">
                <h1>Access Denied</h1>
                <p>You don't have permission to access this page.</p>
              </div>
            } 
          />

          {/* Catch all route for 404 */}
          <Route 
            path="*" 
            element={
              <div className="not-found">
                <h1>404: Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
              </div>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

// const RegisterPage = () => (
//     <div style={{ padding: '50px', textAlign: 'center' }}>
//         <h2>Registration (FR001)</h2>
//         <p>User registration functionality coming soon!</p>
//         <a href="/">Go to Login</a>
//     </div>
// );

export default App;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authservice';
import '../styles/login.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const user = await authService.login(email, password);
    
    // Success: Redirect based on role
    if (user.role === 'Student') {
      navigate('/dashboard/student');
    } else if (user.role === 'Lecturer') {
      navigate('/dashboard/lecturer');
    } else if (user.role === 'Administrator') {
      navigate('/dashboard/admin');
    }

  } catch (error) {
    alert('Login failed: Invalid credentials or server error.');
  }
};

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !role) {
      setError('All fields are required');
      return;
    }

    try {
      await authService.register({
        name,
        email,
        password,
        role
      });
      // After successful registration, switch to login mode
      setIsRegistering(false);
      // Clear form
      setName('');
      setPassword('');
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  // Simplified logic for UI feedback
  const passwordChecklist = {
    number: password.match(/[0-9]/),
    uppercase: password.match(/[A-Z]/),
    lowercase: password.match(/[a-z]/),
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Branding - Similar to 'dub' in the screenshot */}
        <div className="brand-logo">SmartStudent</div> 
        
        {/* Main Title */}
        <h1>Log in to SmartStudent</h1>

        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          {/* Show error message if any */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Name Field - Only shown during registration */}
          {isRegistering && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., daniel.adedoja@babcock.edu.ng"
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <span 
                className="password-toggle" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </span>
            </div>
            
            {/* Password Requirements Checklist */}
            <div className="password-requirements">
              <span className={passwordChecklist.number ? 'valid' : ''}>
                {passwordChecklist.number ? '✔' : '•'} Number
              </span>
              <span className={passwordChecklist.uppercase ? 'valid' : ''}>
                {passwordChecklist.uppercase ? '✔' : '•'} Uppercase letter
              </span>
              <span className={passwordChecklist.lowercase ? 'valid' : ''}>
                {passwordChecklist.lowercase ? '✔' : '•'} Lowercase letter
              </span>
            </div>
          </div>

          {/* Role Selection - Only shown during registration */}
          {isRegistering && (
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="student">Student</option>
                <option value="lecturer">Lecturer</option>
              </select>
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="primary-button">
            {isRegistering ? 'Create Account' : 'Secure Login'}
          </button>
        </form>

        {/* Toggle between login and register */}
        <p className="toggle-form">
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button 
            className="link-button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
              setEmail('');
              setPassword('');
              setName('');
            }}
          >
            {isRegistering ? 'Login here' : 'Register here'}
          </button>
        </p>

        {/* Separator */}
        <div className="separator">OR</div>

        {/* Secondary Buttons (Adapting to institutional context) */}
        <button className="secondary-button">
          {/* Replace with Google Icon */}
          [Google Icon] Continue with Google
        </button>
        <button className="secondary-button">
          {/* Replace with UMIS/SIS Icon */}
          [SSO Icon] Continue with UMIS/SIS (User Data Integration)
        </button>

        {/* Sign-up Link */}
        <p className="link-text">
          Don't have an account? <a href="/register">Sign Up Here</a> (FR001)
        </p>

        {/* Partner Section - Adapted for future institutional use case */}
        <div className="partner-box">
            <p>
                <small>Are you a Lecturer or Administrator? </small> 
                <a href="/admin-onboarding">Contact Administration for Account Setup</a>
            </p>
        </div>

      </div>
      
      {/* Footer Text and Help Icon - Placed outside the main box */}
      <div className="footer-links">
        By continuing, you agree to SmartStudent's Terms of Service and Privacy Policy
        <span className="help-icon">?</span>
      </div>
    </div>
  );
};

export default LoginPage;
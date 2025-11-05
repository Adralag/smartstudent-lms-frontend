import React, { useState } from 'react';
import '../styles/login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('SmartStudent Login Attempt:', email);
    // Secure Authentication Logic (FR002) goes here
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

        <form onSubmit={handleLogin}>
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
              {/* Password Visibility Toggle */}
              <span 
                className="password-toggle" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {/* Replace with an actual icon component (e.g., a simple eye icon) */}
                {showPassword ? '[Eye Icon Open]' : '[Eye Icon Closed]'}
              </span>
            </div>
            
            {/* Password Requirements Checklist - Matching the screenshot style */}
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

          {/* Primary Button */}
          <button type="submit" className="primary-button">
            Secure Login
          </button>
        </form>

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
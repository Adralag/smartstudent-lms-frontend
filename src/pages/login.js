import { useState } from 'react';
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

        <button className="secondary-button">
          <svg className="google-icon" width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.192 0 7.556 0 9s.348 2.808.957 4.039l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
          </svg>
          <span style={{ marginLeft: '10px' }}>Continue with Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
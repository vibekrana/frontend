import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') setIsDarkMode(true);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://4fqbpp1yya.execute-api.ap-south-1.amazonaws.com/prod/user/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setSuccess('✅ Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`login-container ${isDarkMode ? 'dark' : 'light'}`}>
      <button className="theme-toggle top-left" onClick={toggleTheme}>
        {isDarkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
      <button className="logout-button top-right" onClick={() => navigate('/login')}>
        Back
      </button>

      <div className="extra-icons">
        <span className="icon1">🚀</span>
        <span className="icon2">🤖</span>
        <span className="icon3">📊</span>
        <span className="icon4">💡</span>
      </div>

      <div className="login-box">
        <img src="/logo1922.png" alt="Logo" className="login-logo" />
        <h1 className="login-header">Marketing Bot</h1>
        <p className="login-subheader">Register</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="response-error">
              <div className="response-icon">!</div>
              <div className="response-content">
                <p>{error}</p>
              </div>
            </div>
          )}
          {success && (
            <div className="response-success">
              <div className="response-icon">✓</div>
              <div className="response-content">
                <p>{success}</p>
              </div>
            </div>
          )}

          <button type="submit" className="post-button" disabled={isLoading}>
            {isLoading ? <span className="spinner"></span> : 'Register'}
          </button>
        </form>

        <p style={{ marginTop: '1rem', color: '#22d3ee' }}>
          Already have an account?{' '}
          <a href="/login" style={{ color: '#facc15', fontWeight: 'bold' }}>
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;

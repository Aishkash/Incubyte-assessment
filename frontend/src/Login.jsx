import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

function Login({ setIsLoggedIn, setUserRole }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch(
        'https://incubyte-assessment-4.onrender.com/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid email or password');
      }

      localStorage.setItem('token', data.token);

      localStorage.setItem('userRole', 'user');
      setIsLoggedIn(true);
      setUserRole('user');

      navigate('/');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>User Login</h2>

        {error && <p className="error-message">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn primary-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p>
          Don't have an account?{' '}
          <Link to="/register">Register here</Link>
        </p>

        <Link to="/auth" className="back-link">
          ← Back to Options
        </Link>
      </div>
    </div>
  );
}

export default Login;

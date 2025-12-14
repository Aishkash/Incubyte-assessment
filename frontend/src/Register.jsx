import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

function Register({ setIsLoggedIn, setUserRole }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch(
        'https://incubyte-assessment-4.onrender.com/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      else{
        alert("User created! Kindly login.")
      }
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', 'user');
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
        <h2>New User Registration</h2>

        {error && <p className="error-message">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p>
          Already have an account?{' '}
          <Link to="/login">Login here</Link>
        </p>

        <Link to="/auth" className="back-link">
          ← Back to Options
        </Link>
      </div>
    </div>
  );
}

export default Register;

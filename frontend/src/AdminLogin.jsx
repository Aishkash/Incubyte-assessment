import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

function AdminLogin({ setIsLoggedIn, setUserRole }) {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async () => {
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
            email: adminId,      
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid email or password');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', 'admin');
      setIsLoggedIn(true);
      setUserRole('admin');
      navigate('/admin');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container admin">
      <div className="auth-box">
        <h2>Admin Login</h2>

        {error && <p className="error-message">{error}</p>}

        <input
          type="text"
          placeholder="Admin Email (admin@test.com)"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password (admin123)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn primary-btn admin-btn"
          onClick={handleAdminLogin}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Admin Login'}
        </button>

        <Link to="/auth" className="back-link">
          ← Back to Options
        </Link>
      </div>
    </div>
  );
}

export default AdminLogin;

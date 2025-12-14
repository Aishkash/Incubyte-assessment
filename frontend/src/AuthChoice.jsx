// --- AuthChoice.jsx ---
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; 

function AuthChoice() {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Choose Your Login</h2>
        <Link to="/login" className="btn primary-btn auth-link">User Login</Link>
        <Link to="/register" className="btn secondary-btn auth-link">New User Registration</Link>
        <Link to="/admin-login" className="btn secondary-btn auth-link admin-btn">Admin Login</Link>
        <Link to="/" className="back-link">← Back to Shop</Link>
      </div>
    </div>
  );
}

export default AuthChoice;
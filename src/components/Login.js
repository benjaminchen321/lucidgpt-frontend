// frontend/src/components/Login.js

import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../utils/axiosConfig';
import './Login.css'; // Import the updated CSS
import LoadingSpinner from './common/LoadingSpinner'; // Import LoadingSpinner

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // State for loading

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Start loading
    try {
      const params = new URLSearchParams();
      params.append('username', form.email); // Ensure backend expects 'username'
      params.append('password', form.password);
      // 'grant_type' defaults to 'password', no need to set it explicitly

      const response = await axios.post('/token', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      console.log('Token Response:', response.data); // Debugging line

      if (response.data.access_token) {
        login(response.data.access_token); // Update AuthContext
        // Navigation handled inside AuthContext's login function
      } else {
        setError('Invalid response from server. Please try again.');
      }
    } catch (err) {
      console.error('Login Error:', err); // Debugging line
      if (err.response && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('An error occurred during login.');
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? <LoadingSpinner /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

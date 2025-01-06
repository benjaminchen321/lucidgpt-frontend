// frontend/src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from '../utils/axiosConfig'; // Ensure axios is configured with baseURL and interceptors

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    console.log('AuthContext - Retrieved token:', token); // Debugging line
    if (token && token !== "null") { // Ensure token is valid
      axios.get('/users/me')
        .then(response => {
          console.log('AuthContext - User data:', response.data); // Debugging line
          setAuth({
            isAuthenticated: true,
            user: response.data,
            loading: false,
          });
        })
        .catch(() => {
          console.log('AuthContext - Invalid token, logging out'); // Debugging line
          setAuth({
            isAuthenticated: false,
            user: null,
            loading: false,
          });
        });
    } else {
      setAuth({
        isAuthenticated: false,
        user: null,
        loading: false,
      });
    }
  }, []);

  const login = (token) => {
    console.log('AuthContext - Logging in with token:', token); // Debugging line
    localStorage.setItem('access_token', token);
    axios.get('/users/me') // Fetch user info after login
      .then(response => {
        console.log('AuthContext - Logged in user data:', response.data); // Debugging line
        setAuth({
          isAuthenticated: true,
          user: response.data,
          loading: false,
        });
      })
      .catch(() => {
        console.log('AuthContext - Failed to fetch user data after login'); // Debugging line
        setAuth({
          isAuthenticated: false,
          user: null,
          loading: false,
        });
      });
  };

  const logout = () => {
    console.log('AuthContext - Logging out'); // Debugging line
    localStorage.removeItem('access_token');
    setAuth({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
    window.location.href = "/login"; // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

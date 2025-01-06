// src/context/AuthContext.js

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
    if (token) {
      // Optionally, decode the token to get user info or fetch from backend
      axios.get('/users/me') // Ensure you have this endpoint implemented
        .then(response => {
          setAuth({
            isAuthenticated: true,
            user: response.data,
            loading: false,
          });
        })
        .catch(() => {
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
    localStorage.setItem('access_token', token);
    axios.get('/users/me') // Fetch user info after login
      .then(response => {
        setAuth({
          isAuthenticated: true,
          user: response.data,
          loading: false,
        });
      })
      .catch(() => {
        setAuth({
          isAuthenticated: false,
          user: null,
          loading: false,
        });
      });
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setAuth({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

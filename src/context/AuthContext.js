// frontend/src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from '../utils/axiosConfig'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    role: null,
    loading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token && token !== "null") {
      axios.get('/users/me')
        .then(response => {
          console.log('User data fetched:', response.data);
          setAuth({
            isAuthenticated: true,
            user: response.data,
            role: response.data.role,
            loading: false,
          });
          // Redirect based on role
          if (response.data.role === 'superuser' || response.data.role === 'employee') {
            console.log('Redirecting to /dashboard');
            navigate('/dashboard');
          } else if (response.data.role === 'customer') {
            console.log('Redirecting to /assist');
            navigate('/assist');
          }
        })
        .catch(() => {
          console.log('Failed to fetch user data, redirecting to /login');
          setAuth({
            isAuthenticated: false,
            user: null,
            role: null,
            loading: false,
          });
          navigate('/login');
        });
    } else {
      console.log('No token found, redirecting to /login');
      setAuth({
        isAuthenticated: false,
        user: null,
        role: null,
        loading: false,
      });
      navigate('/login');
    }
  }, [navigate]);  

  const login = (token) => {
    console.log('Logging in with token:', token);
    localStorage.setItem('access_token', token);
    axios.get('/users/me')
      .then(response => {
        console.log('User data fetched after login:', response.data);
        setAuth({
          isAuthenticated: true,
          user: response.data,
          role: response.data.role,
          loading: false,
        });
        // Redirect based on role
        if (response.data.role === 'superuser' || response.data.role === 'employee') {
          console.log('Redirecting to /dashboard');
          navigate('/dashboard');
        } else if (response.data.role === 'customer') {
          console.log('Redirecting to /assist');
          navigate('/assist');
        }
      })
      .catch(() => {
        console.log('Failed to fetch user data after login, redirecting to /login');
        setAuth({
          isAuthenticated: false,
          user: null,
          role: null,
          loading: false,
        });
        navigate('/login');
      });
  };  

  const logout = () => {
    localStorage.removeItem('access_token');
    setAuth({
      isAuthenticated: false,
      user: null,
      role: null,
      loading: false,
    });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

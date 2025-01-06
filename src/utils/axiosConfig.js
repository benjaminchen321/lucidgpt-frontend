// frontend/src/utils/axiosConfig.js

import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "https://localhost:8000",
  withCredentials: true, // If your backend requires credentials like cookies
});

// Add a request interceptor to attach the token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    console.log('Axios Interceptor - Retrieved token:', token); // Debugging line
    if (token && token !== "null") { // Check if token is valid
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for global error handling
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized errors globally
    if (error.response && error.response.status === 401) {
      console.log('Axios Interceptor - Unauthorized, logging out'); // Debugging line
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;

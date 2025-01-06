import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // Ensure this matches your backend
  timeout: 60000,
  headers: {
    "Content-Type": "application/json", // Explicitly set Content-Type
    Accept: "application/json",
  },
});

export default axiosInstance;
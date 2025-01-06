// frontend/src/components/Home.js

import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) {
      if (auth.role === 'superuser' || auth.role === 'employee') {
        navigate('/dashboard');
      } else if (auth.role === 'customer') {
        navigate('/assist');
      }
    } else {
      navigate('/login');
    }
  }, [auth, navigate]);

  return null; // Since redirection is handled in useEffect
};

export default Home;

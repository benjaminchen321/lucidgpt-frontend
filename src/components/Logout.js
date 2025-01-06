// frontend/src/components/Logout.js

import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const Logout = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
    // The logout function handles redirection
  }, [logout]);

  return null; // Since redirection is handled in useEffect
};

export default Logout;

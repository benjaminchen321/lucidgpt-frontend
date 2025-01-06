// frontend/src/components/UserProfile.js

import React, { useEffect, useState, useContext } from 'react';
import axios from '../../utils/axiosConfig';
import { AuthContext } from '../../context/AuthContext';

const UserProfile = () => {
  const { auth } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (auth.isAuthenticated) {
      axios.get('/users/me')
        .then((response) => setUser(response.data))
        .catch((err) => setError('Failed to load user data.'));
    }
  }, [auth.isAuthenticated]);

  if (error) return <div>{error}</div>;
  if (!user) return <div>Loading user data...</div>;
  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
    </div>
  );
};

export default UserProfile;

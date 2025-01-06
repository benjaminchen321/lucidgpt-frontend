// frontend/src/components/__tests__/UserProfile.test.js

import React, { useEffect, useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from '../../utils/axiosConfig'; // Import the real axios instance
import MockAdapter from 'axios-mock-adapter';
import { AuthContext } from '../../context/AuthContext';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/users/me')
      .then((response) => setUser(response.data))
      .catch((err) => setError('Failed to load user data.'));
  }, []);

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

describe('UserProfile Component', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  test('displays user data after successful fetch', async () => {
    const authContextValue = {
      auth: {
        isAuthenticated: true,
        user: { id: 1, email: 'testuser@example.com', name: 'Test User', phone: '1234567890' },
        loading: false,
      },
      login: jest.fn(),
      logout: jest.fn(),
    };

    mock.onGet('/users/me').reply(200, {
      id: 1,
      name: 'Test User',
      email: 'testuser@example.com',
      phone: '1234567890',
    });

    render(
      <AuthContext.Provider value={authContextValue}>
        <UserProfile />
      </AuthContext.Provider>
    );

    expect(screen.getByText('Loading user data...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('User Profile')).toBeInTheDocument();
      expect(screen.getByText('Name: Test User')).toBeInTheDocument();
      expect(screen.getByText('Email: testuser@example.com')).toBeInTheDocument();
      expect(screen.getByText('Phone: 1234567890')).toBeInTheDocument();
    });
  });

  test('handles error during user data fetch', async () => {
    const authContextValue = {
      auth: {
        isAuthenticated: true,
        user: { id: 1, email: 'testuser@example.com', name: 'Test User', phone: '1234567890' },
        loading: false,
      },
      login: jest.fn(),
      logout: jest.fn(),
    };

    mock.onGet('/users/me').reply(500);

    render(
      <AuthContext.Provider value={authContextValue}>
        <UserProfile />
      </AuthContext.Provider>
    );

    expect(screen.getByText('Loading user data...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Failed to load user data.')).toBeInTheDocument();
    });
  });
});

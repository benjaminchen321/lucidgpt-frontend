// frontend/src/components/__tests__/Dashboard.test.js

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '../dashboard/Dashboard';
import { AuthContext } from '../../context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Dashboard Component', () => {
  test('renders dashboard for authenticated user', async () => {
    const authContextValue = {
      auth: {
        isAuthenticated: true,
        user: { id: 1, email: 'testuser@example.com', name: 'Test User' },
        loading: false,
      },
      login: jest.fn(),
      logout: jest.fn(),
    };

    render(
      <AuthContext.Provider value={authContextValue}>
        <Router>
          <Dashboard />
        </Router>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Customer Service Dashboard')).toBeInTheDocument();

    // Wait for "Welcome, Test User" to appear
    await waitFor(() => {
      expect(screen.getByText('Welcome, Test User')).toBeInTheDocument();
    });
  });

  test('renders loading state when authentication is loading', () => {
    const authContextValue = {
      auth: {
        isAuthenticated: false,
        user: null,
        loading: true,
      },
      login: jest.fn(),
      logout: jest.fn(),
    };

    render(
      <AuthContext.Provider value={authContextValue}>
        <Router>
          <Dashboard />
        </Router>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

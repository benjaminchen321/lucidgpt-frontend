// frontend/src/__tests__/CustomerList.test.js

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CustomerList from '../components/dashboard/components/CustomerList';
import { AuthContext } from '../context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from '../utils/axiosConfig'; // This should now be the mocked axios
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('CustomerList Component', () => {
  afterEach(() => {
    mock.reset();
  });

  test('renders loading state', async () => {
    mock.onGet('/customers').reply(200, { data: [] });

    render(
      <AuthContext.Provider value={{ auth: { isAuthenticated: true } }}>
        <Router>
          <CustomerList />
        </Router>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Loading customers...')).toBeInTheDocument();
  });

  test('renders customers after fetching', async () => {
    const customers = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];

    mock.onGet('/customers').reply(200, { data: customers });

    render(
      <AuthContext.Provider value={{ auth: { isAuthenticated: true } }}>
        <Router>
          <CustomerList />
        </Router>
      </AuthContext.Provider>
    );

    // Wait for customers to be rendered
    await waitFor(() => {
      customers.forEach((customer) => {
        expect(screen.getByText(customer.name)).toBeInTheDocument();
        expect(screen.getByText(customer.email)).toBeInTheDocument();
      });
    });
  });

  test('handles error during fetching', async () => {
    mock.onGet('/customers').reply(500);

    render(
      <AuthContext.Provider value={{ auth: { isAuthenticated: true } }}>
        <Router>
          <CustomerList />
        </Router>
      </AuthContext.Provider>
    );

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Failed to load customers. Please try again later.')).toBeInTheDocument();
    });
  });
});

// frontend/src/components/__tests__/Logout.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Logout from '../Logout';
import { AuthContext } from '../../context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock useNavigate before importing Logout
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Logout Component', () => {
  test('logs out user and redirects to login', () => {
    const mockLogout = jest.fn();

    render(
      <AuthContext.Provider value={{ logout: mockLogout }}>
        <Router>
          <Logout />
        </Router>
      </AuthContext.Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /logout/i }));

    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});

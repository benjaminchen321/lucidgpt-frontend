// frontend/src/utils/testUtils.js

import React from 'react';
import { AuthContext } from '../context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from './axiosConfig';
import MockAdapter from 'axios-mock-adapter';
import { render } from '@testing-library/react';

/**
 * Renders a component with necessary providers and mocked Axios.
 * @param {React.Component} ui - The component to render.
 * @param {object} authValue - The authentication context value.
 * @returns {object} - The rendered component and mock adapter.
 */
export const renderWithProviders = (ui, { authValue }) => {
  const mock = new MockAdapter(axios);

  const Wrapper = ({ children }) => (
    <AuthContext.Provider value={authValue}>
      <Router>{children}</Router>
    </AuthContext.Provider>
  );

  return {
    ...render(ui, { wrapper: Wrapper }),
    mock,
  };
};

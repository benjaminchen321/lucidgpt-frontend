// frontend/src/__tests__/App.e2e.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import { AuthContext } from '../context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from '../utils/axiosConfig'; // Import the real axios instance
import MockAdapter from 'axios-mock-adapter';

describe('App Component', () => {
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

  test('handles user input and displays API response', async () => {
    const aiResponse = { answer: 'This is a test answer from AI.' };
    mock.onPost('/assist').reply(200, aiResponse);

    render(
      <AuthContext.Provider value={{ auth: { isAuthenticated: true } }}>
        <Router>
          <App />
        </Router>
      </AuthContext.Provider>
    );

    // Wait for the search input to appear
    const searchInput = await screen.findByPlaceholderText(/Ask your question related to Lucid Motor.../i);
    expect(searchInput).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(searchInput, { target: { value: 'What is the range of the Lucid Air?' } });
    fireEvent.click(screen.getByRole('button', { name: /get assistance/i }));

    // Wait for the AI response to appear
    await waitFor(() => {
      expect(screen.getByText('Answer:')).toBeInTheDocument();
      expect(screen.getByText(aiResponse.answer)).toBeInTheDocument();
    });
  });
});

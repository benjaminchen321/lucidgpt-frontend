import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

test("handles user input and displays API response", async () => {
  render(<App />);

  // Navigate to Enhanced Assistance
  fireEvent.click(screen.getByText(/Enhanced Assistance/i));

  // Wait for the search input to appear
  const searchInput = await waitFor(() =>
    screen.findByPlaceholderText(/Type your question here.../i)
  );
  expect(searchInput).toBeInTheDocument();
});

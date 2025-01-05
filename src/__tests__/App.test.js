import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders the app header", () => {
  render(<App />);
  
  // Use `getAllByText` and verify the specific header element
  const headerElements = screen.getAllByText(/LucidGPT/i);
  const headerElement = headerElements.find((el) => el.tagName === "H1");
  expect(headerElement).toBeInTheDocument();
});

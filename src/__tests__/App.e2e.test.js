import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

beforeEach(() => {
  fetch.resetMocks(); // Reset mocks before each test
});

test("handles user input and displays API response", async () => {
  fetch.mockResponseOnce(JSON.stringify({ response: "Lucid Motors is a luxury EV brand." }));

  render(<App />);

  const textarea = screen.getByPlaceholderText(/Type your question here.../i);
  const button = screen.getByText(/Ask LucidGPT/i);

  fireEvent.change(textarea, { target: { value: "Tell me about Lucid cars." } });
  fireEvent.click(button);

  expect(button).toHaveTextContent("Sending...");
  expect(await screen.findByText(/Lucid Motors is a luxury EV brand./i)).toBeInTheDocument();
});

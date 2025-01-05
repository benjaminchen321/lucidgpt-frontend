import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import CustomerList from "../components/dashboard/components/CustomerList";
import axios from "axios";
import { act } from "react";

jest.mock("axios");

test("renders loading state", () => {
  render(<CustomerList onSelectCustomer={() => {}} />);
  expect(screen.getByText(/Loading customers.../i)).toBeInTheDocument();
});

test("renders customers after fetching", async () => {
  axios.get.mockResolvedValue({ data: [{ id: 1, name: "John Doe" }] });

  await act(async () => {
    render(<CustomerList onSelectCustomer={() => {}} />);
  });

  await waitFor(() => {
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });
});

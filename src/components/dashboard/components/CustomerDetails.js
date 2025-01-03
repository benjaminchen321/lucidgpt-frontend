// CustomerDetails.jsx
import React from "react";

const CustomerDetails = () => {
  const customer = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Springfield, USA",
  };

  return (
    <div className="customer-details">
      <h2>Customer Details</h2>
      <p><strong>Name:</strong> {customer.name}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
      <p><strong>Address:</strong> {customer.address}</p>
    </div>
  );
};

export default CustomerDetails;
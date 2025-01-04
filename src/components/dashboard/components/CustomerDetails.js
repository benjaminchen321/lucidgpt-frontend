import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerDetails = ({ customerId }) => {
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/customers/${customerId}`
        );
        setCustomer(response.data);
      } catch (err) {
        console.error("Error fetching customer details:", err);
        setError("Failed to load customer details.");
      }
    };

    if (customerId) {
      fetchCustomerDetails();
    }
  }, [customerId]);

  if (!customer) {
    return <p>Select a customer to view details.</p>;
  }

  return (
    <div className="customer-details">
      <h2>Customer Details</h2>
      {error && <p className="error">{error}</p>}
      <p>
        <strong>Name:</strong> {customer.customer.name}
      </p>
      <p>
        <strong>Email:</strong> {customer.customer.email}
      </p>
      <p>
        <strong>Phone:</strong> {customer.customer.phone}
      </p>
      <h3>Vehicles</h3>
      <ul>
        {customer.vehicles.map((vehicle) => (
          <li key={vehicle.vin}>
            {vehicle.model} ({vehicle.year})
          </li>
        ))}
      </ul>
      <h3>Appointments</h3>
      <ul>
        {customer.appointments.map((appointment) => (
          <li key={appointment.date}>
            {appointment.date} - {appointment.service_type} ({appointment.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerDetails;

// Updated CustomerDetails.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerDetails = ({ customerId }) => {
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      if (!customerId) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/customers/${customerId}`
        );
        setCustomer(response.data);
      } catch (err) {
        console.error("Error fetching customer details:", err);
        setError("Failed to load customer details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [customerId]);

  if (!customerId) {
    return (
      <p className="text-gray-500 italic text-center mt-4">
        Select a customer to view details.
      </p>
    );
  }

  if (loading) {
    return (
      <p className="text-gray-600 italic text-center mt-4 animate-pulse">
        Loading customer details...
      </p>
    );
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!customer) {
    return (
      <p className="text-gray-500 italic text-center mt-4">
        No customer details available.
      </p>
    );
  }

  return (
    <div className="customer-details p-4 bg-white shadow rounded">
      <h2 className="details-title text-lg font-bold text-blue-600 mb-4">
        Customer Details
      </h2>
      <div className="details-info grid grid-cols-1 sm:grid-cols-2 gap-4">
        <p className="details-item text-gray-700">
          <strong>Name:</strong> {customer.customer.name}
        </p>
        <p className="details-item text-gray-700">
          <strong>Email:</strong> {customer.customer.email}
        </p>
        <p className="details-item text-gray-700">
          <strong>Phone:</strong> {customer.customer.phone}
        </p>
      </div>
      <h3 className="details-subtitle text-blue-500 mt-4">Vehicles</h3>
      <ul className="details-list list-disc pl-6">
        {customer.vehicles.map((vehicle) => (
          <li key={vehicle.vin} className="details-list-item">
            {vehicle.model} ({vehicle.year})
          </li>
        ))}
      </ul>
      <h3 className="details-subtitle text-blue-500 mt-4">Appointments</h3>
      <ul className="details-list list-disc pl-6">
        {customer.appointments.map((appointment) => (
          <li key={appointment.id} className="details-list-item">
            {appointment.date} - {appointment.service_type} (
            {appointment.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerDetails;

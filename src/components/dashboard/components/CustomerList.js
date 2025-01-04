import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/customers`
        );
        setCustomers(response.data);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError("Failed to load customers.");
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="customer-list">
      <h2>Customer List</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>{customer.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;

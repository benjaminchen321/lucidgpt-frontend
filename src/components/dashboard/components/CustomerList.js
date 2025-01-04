import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerList = ({ onSelectCustomer }) => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/customers`,
        );
        setCustomers(response.data);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError("Failed to load customers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="customer-list">
      <h2>Customer List</h2>
      {loading && <p>Loading customers...</p>}
      {error && <p className="error">{error}</p>}
      <ul>
        {customers.map((customer) => (
          <li key={customer.id} onClick={() => onSelectCustomer(customer.id)}>
            {customer.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;

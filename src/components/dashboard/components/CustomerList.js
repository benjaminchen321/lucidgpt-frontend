// Updated CustomerList.js
import React from "react";
import useFetch from "../../hooks/useFetch";

const CustomerList = ({ onSelectCustomer }) => {
  const { data: customers, loading, error } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/customers`
  );

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

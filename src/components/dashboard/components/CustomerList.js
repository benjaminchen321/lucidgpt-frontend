import React from "react";
import useFetch from "../../hooks/useFetch";
import PaginatedList from "./PaginatedList";

const CustomerList = ({ onSelectCustomer }) => {
  const { data: customers, loading, error } = useFetch(
    `${process.env.REACT_APP_BACKEND_URL}/customers`
  );

  return (
    <div className="customer-list p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold text-blue-600 mb-4">Customer List</h2>
      {loading && <p>Loading customers...</p>}
      {error && <p className="error text-red-600">{error}</p>}
      {!loading && !error && (
        <PaginatedList
          items={customers}
          itemsPerPage={5}
          renderItem={(customer) => (
            <div
            onClick={() => onSelectCustomer(customer.id)}
            className="p-4 bg-gray-50 shadow-md rounded-lg cursor-pointer hover:shadow-lg hover:bg-gray-100 transition-all duration-200 flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <p className="text-lg font-medium text-gray-800 truncate w-full sm:w-auto sm:mr-4">
                {customer.name}
              </p>
              <p className="text-sm text-gray-500 truncate w-full sm:w-auto">
                {customer.email}
              </p>
            </div>
          )}
        />
      )}
    </div>
  );
};

export default CustomerList;

// Updated Dashboard.js
import React, { useState } from "react";
import "./Dashboard.css";
import CustomerList from "./components/CustomerList";
import CustomerDetails from "./components/CustomerDetails";
import AppointmentList from "./components/AppointmentList";

const Dashboard = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const handleSelectCustomer = (id) => {
    setSelectedCustomerId(id);
  };

  return (
    <div className="dashboard bg-gray-100 min-h-screen" style={{marginTop: "13vh"}}>
      <div className="dashboard-content container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 px-4">
        <aside className="dashboard-sidebar col-span-1 bg-white p-6 rounded-lg shadow-md">
          <p className="text-sm text-gray-600 mb-4">
            Select a customer from the list to view their details and upcoming appointments.
          </p>
          <CustomerList onSelectCustomer={handleSelectCustomer} />
        </aside>
        <main className="dashboard-main col-span-2 bg-white p-6 rounded-lg shadow-md">
          <p className="text-sm text-gray-600 mb-4">
            View comprehensive details about the selected customer, including their vehicles
            and scheduled appointments.
          </p>
          <CustomerDetails customerId={selectedCustomerId} />
          <div className="mt-6">
            <AppointmentList customerId={selectedCustomerId} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

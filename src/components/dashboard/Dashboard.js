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
    <div className="dashboard bg-gray-100 min-h-screen" style={{marginTop: "20vh"}}>
      <div className="dashboard container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <aside className="dashboard-sidebar col-span-1 bg-white p-4 rounded-lg shadow">
          <CustomerList onSelectCustomer={handleSelectCustomer} />
        </aside>
        <main className="dashboard-main col-span-2 bg-white p-4 rounded-lg shadow">
          <CustomerDetails customerId={selectedCustomerId} />
          <AppointmentList customerId={selectedCustomerId} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

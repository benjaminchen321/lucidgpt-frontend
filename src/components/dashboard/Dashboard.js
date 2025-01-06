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
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Customer Service Dashboard</h1>
      </header>
      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <CustomerList onSelectCustomer={handleSelectCustomer} />
        </aside>
        <main className="dashboard-main">
          <CustomerDetails customerId={selectedCustomerId} />
          <AppointmentList customerId={selectedCustomerId} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
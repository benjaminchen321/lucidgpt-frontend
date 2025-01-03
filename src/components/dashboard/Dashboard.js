import React from "react";
import "./Dashboard.css";
import CustomerList from "./components/CustomerList";
import CustomerDetails from "./components/CustomerDetails";
import AppointmentList from "./components/AppointmentList";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Customer Service Dashboard</h1>
      </header>
      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <CustomerList />
        </aside>
        <main className="dashboard-main">
          <CustomerDetails />
          <AppointmentList />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

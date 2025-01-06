// frontend/src/components/Navbar.js

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle"; // If you have a dark mode feature
import Logout from "./Logout";
import { AuthContext } from "../context/AuthContext";
import './Navbar.css'; // Create and style as needed

const Navbar = () => {
  const { auth } = useContext(AuthContext);

  if (auth.loading) {
    return null; // Don't render navbar while auth is loading
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/dashboard">LucidCRM</Link> {/* Replace with Lucid Motor's logo if available */}
      </div>
      {auth.isAuthenticated && (
        <ul className="navbar-links">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/assist">Enhanced Assistance</Link>
          </li>
          <li>
            <Link to="/crm">Maintenance CRM</Link>
          </li>
          <li>
            <Logout />
          </li>
          {/* <li>
            <DarkModeToggle />
          </li> */}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

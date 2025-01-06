import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the updated CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Navbar Title */}
        <Link to="/" className="navbar-brand">
          LucidCRM
        </Link>

        {/* Navigation Links */}
        <ul className="navbar-links">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/crm">Maintenance CRM</Link>
          </li>
          <li>
            <Link to="/assist">Enhanced Assistance</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

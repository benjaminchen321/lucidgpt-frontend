// frontend/src/components/Navbar.js

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css'; // Import the updated CSS

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Navbar Title */}
        <Link to="/" className="navbar-brand">
          LucidCRM
        </Link>

        {/* Navigation Links */}
        <ul className="navbar-links">
          {auth.isAuthenticated && (auth.role === 'employee' || auth.role === 'superuser') && (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/crm">Maintenance CRM</Link>
              </li>
            </>
          )}

          {auth.isAuthenticated && auth.role === 'customer' && (
            <li>
              <Link to="/assist">Enhanced Assistance</Link>
            </li>
          )}
        </ul>

        {/* Authentication Actions */}
        <ul className="navbar-actions">
          {auth.isAuthenticated ? (
            <li>
              <button onClick={logout} className="logout-button">Logout</button>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

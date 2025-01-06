import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          LucidGPT
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link to="/dashboard" className="hover:text-gray-200">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/crm" className="hover:text-gray-200">
              Maintenance CRM
            </Link>
          </li>
          <li>
            <Link to="/assist" className="hover:text-gray-200">
              Enhanced Assistance
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

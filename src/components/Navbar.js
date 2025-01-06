import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 fixed w-full z-20 top-0 left-0" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", paddingBottom: "3vh" }}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          LucidGPT
        </Link>
        <ul className="hidden md:flex space-x-4">
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
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none" aria-label="Open menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};


export default Navbar;

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav
      className="bg-blue-600 text-white p-4 fixed w-full z-20 top-0 left-0"
      style={{
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        paddingBottom: "3vh",
      }}
    >
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          LucidGPT
        </Link>
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link to="/dashboard" className="hover:text-gray-200">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/crm" className="hover:text-gray-200">
              Maintenance Hub
            </Link>
          </li>
          <li>
            <Link to="/assist" className="hover:text-gray-200">
              LucidGPT
            </Link>
          </li>
        </ul>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            aria-label="Open menu"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {/* Animated Slide-In Menu with Blur Effect */}
      <div
        className={`fixed top-0 right-0 h-full w-1/3 backdrop-blur-md text-white transform transition-transform duration-300 ease-in-out z-30 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <button
          className="absolute top-4 right-4 text-white focus:outline-none"
          aria-label="Close menu"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <ul className="mt-16 space-y-4 px-6">
          <li>
            <Link
              to="/dashboard"
              className="block text-lg hover:text-gray-300"
              onClick={() => setIsMenuOpen(false)} // Close menu on link click
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/crm"
              className="block text-lg hover:text-gray-300"
              onClick={() => setIsMenuOpen(false)} // Close menu on link click
            >
              Maintenance Hub
            </Link>
          </li>
          <li>
            <Link
              to="/assist"
              className="block text-lg hover:text-gray-300"
              onClick={() => setIsMenuOpen(false)} // Close menu on link click
            >
              LucidGPT
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

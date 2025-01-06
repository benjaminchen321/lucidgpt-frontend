import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white text-gray-800 fixed w-full z-20 top-0 left-0 shadow-md">
      <div className="max-w-screen-lg mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-[#a47b5b]">
          LucidGPT
        </Link>
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          <li>
            <Link to="/dashboard" className="hover:text-[#7b5b42]">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/crm" className="hover:text-[#7b5b42]">
              Maintenance Hub
            </Link>
          </li>
          <li>
            <Link to="/assist" className="hover:text-[#7b5b42]">
              LucidGPT
            </Link>
          </li>
        </ul>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-[#a47b5b] focus:outline-none"
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
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 h-full w-2/3 bg-white shadow-lg z-30 transform transition-transform duration-300 ease-in-out">
          <button
            className="absolute top-4 right-4 text-[#a47b5b] focus:outline-none"
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
          <ul className="mt-16 space-y-6 px-6 text-lg">
            <li>
              <Link
                to="/dashboard"
                className="block hover:text-[#7b5b42]"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/crm"
                className="block hover:text-[#7b5b42]"
                onClick={() => setIsMenuOpen(false)}
              >
                Maintenance Hub
              </Link>
            </li>
            <li>
              <Link
                to="/assist"
                className="block hover:text-[#7b5b42]"
                onClick={() => setIsMenuOpen(false)}
              >
                LucidGPT
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

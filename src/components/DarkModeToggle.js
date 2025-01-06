// src/components/DarkModeToggle.js
import React, { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <button onClick={toggleDarkMode} className="toggle-dark-mode" aria-label="Toggle Dark Mode">
      {isDarkMode ? "🌙" : "☀️"}
    </button>
  );
};

export default DarkModeToggle;

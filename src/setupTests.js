// frontend/src/setupTests.js

import "@testing-library/jest-dom";

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Safely override console.warn to filter specific warnings
const originalWarn = console.warn;
global.console.warn = (msg, ...args) => {
  if (typeof msg === "string" && !msg.includes("React Router Future Flag Warning")) {
    originalWarn(msg, ...args);
  }
};

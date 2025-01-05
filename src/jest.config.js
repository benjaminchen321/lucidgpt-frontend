module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], // Ensure Jest loads setupTests.js
  testEnvironment: "jsdom", // Use jsdom for DOM testing
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest", // Use babel-jest for JavaScript/JSX transformation
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios|msw)/", // Transform axios and other ES modules
  ],
};

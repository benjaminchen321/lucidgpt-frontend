module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"], // Load `jest.setup.js` for global mocks
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    "node_modules/(?!(msw)/)" // Ensure msw is correctly transformed by Jest
  ],
};

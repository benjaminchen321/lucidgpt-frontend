// frontend/src/__mocks__/axios.js

const mockAxios = {
  create: jest.fn(() => mockAxios), // Ensures that axios.create() returns the mockAxios itself
  get: jest.fn(() => Promise.resolve({ data: [] })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve({ data: {} })),
  
  // Mock interceptors
  interceptors: {
    request: {
      use: jest.fn(),
    },
    response: {
      use: jest.fn(),
    },
  },
  
  // Optional: Reset mock functions
  resetMocks: () => {
    mockAxios.get.mockReset();
    mockAxios.post.mockReset();
    mockAxios.put.mockReset();
    mockAxios.delete.mockReset();
    mockAxios.create.mockReset();
    mockAxios.interceptors.request.use.mockReset();
    mockAxios.interceptors.response.use.mockReset();
  },
};

export default mockAxios;

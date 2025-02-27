export const mockAxiosInstance = {
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() }
  },
  defaults: { baseURL: 'http://test-api.example.com/api' },
  get: jest.fn(),
  post: jest.fn(),
};

// Reset all mocks before each test
beforeEach(() => {
  mockAxiosInstance.get.mockReset();
  mockAxiosInstance.post.mockReset();
  
  // Set default implementations
  mockAxiosInstance.get.mockImplementation(() => Promise.resolve({ data: {} }));
  mockAxiosInstance.post.mockImplementation(() => Promise.resolve({ data: {} }));
});

jest.mock('axios', () => ({
  create: () => mockAxiosInstance
})); 
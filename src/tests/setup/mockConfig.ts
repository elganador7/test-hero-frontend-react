export const mockConfig = {
  apiUrl: 'http://test-api.example.com/api',
  googleClientId: 'mock-google-client-id'
};

jest.mock('../../config/env', () => ({
  config: mockConfig
})); 
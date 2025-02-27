import { mockAxiosInstance } from '../mocks/axisMock';

describe('API Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with correct base URL', () => {
    expect(mockAxiosInstance.defaults.baseURL).toBe('http://test-api.example.com/api');
  });
}); 
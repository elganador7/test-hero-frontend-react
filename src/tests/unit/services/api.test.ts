import { mockAxiosInstance } from '../../mocks/axisMock';
import { getTestTopics, generateRelevantQuestion, getUserStats } from '../../../services/api';

describe('API Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with correct base URL', () => {
    expect(mockAxiosInstance.defaults.baseURL).toBe('http://test-api.example.com/api');
  });
}); 
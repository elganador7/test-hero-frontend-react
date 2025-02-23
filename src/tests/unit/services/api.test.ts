import { mockAxiosInstance } from '../../mocks/axisMock';
import { getTestTopics, generateRelevantQuestion, getUserStats } from '../../../services/api';

describe('API Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with correct base URL', () => {
    expect(mockAxiosInstance.defaults.baseURL).toBe('http://test-api.example.com/api');
  });

  describe('getTestTopics', () => {
    it('fetches test topics successfully', async () => {
      const mockTopics = [{ id: 1, test_type: 'SAT', subject: 'Math' }];
      mockAxiosInstance.get.mockResolvedValueOnce({ data: mockTopics });

      const result = await getTestTopics();
      expect(result).toEqual(mockTopics);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test_topics/');
    });

    it('handles API errors', async () => {
      mockAxiosInstance.get.mockRejectedValueOnce(new Error('API Error'));
      await expect(getTestTopics()).rejects.toThrow('API Error');
    });
  });

  describe('generateRelevantQuestion', () => {
    it('generates a question successfully', async () => {
      const mockQuestion = { id: '1', question_text: 'Test question' };
      mockAxiosInstance.post.mockResolvedValueOnce({ data: mockQuestion });

      const result = await generateRelevantQuestion('user1', 'SAT', 'Math');
      expect(result).toEqual(mockQuestion);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/oai_queries/generate/relevant', {
        user_id: 'user1',
        test_type: 'SAT',
        subject: 'Math'
      });
    });

    it('handles API errors', async () => {
      mockAxiosInstance.post.mockRejectedValueOnce(new Error('Generation failed'));
      await expect(generateRelevantQuestion('user1', 'SAT', 'Math'))
        .rejects.toThrow('Generation failed');
    });
  });

  describe('getUserStats', () => {
    it('fetches user stats successfully', async () => {
      const mockStats = [{ testType: 'SAT', correct_rate: 0.8 }];
      mockAxiosInstance.get.mockResolvedValueOnce({ data: mockStats });

      const result = await getUserStats('user1');
      expect(result).toEqual(mockStats);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/users/user1/stats');
    });

    it('handles API errors', async () => {
      mockAxiosInstance.get.mockRejectedValueOnce(new Error('Stats not found'));
      await expect(getUserStats('user1')).rejects.toThrow('Stats not found');
    });
  });
}); 
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PerformanceSummary from './PerformanceSummary';
import { ThemeProvider } from '@mui/material';
import getTheme from '../../theme/theme';
import { getUserStats } from '../../services/api';

jest.mock('../../services/api');
const mockedGetUserStats = getUserStats as jest.MockedFunction<typeof getUserStats>;

jest.mock('react-auth-kit/hooks/useAuthUser', () => ({
  __esModule: true,
  default: () => ({ userId: 'test-user' }),
}));

describe('PerformanceSummary', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(
      <ThemeProvider theme={getTheme('light')}>
        {component}
      </ThemeProvider>
    );
  };

  it('shows loading state initially', () => {
    mockedGetUserStats.mockImplementation(() => new Promise(() => {}));
    renderWithTheme(<PerformanceSummary />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays performance data when loaded', async () => {
    const mockStats = [{
      testType: 'SAT',
      topic: 'Math',
      subject: 'Mathematics',
      subtopic: 'Algebra',
      specific_topic: 'Linear Equations',
      correct_rate: 0.8,
      question_count: 10,
      user_id: 'test-user',
      total_points: 100,
      total_points_possible: 120,
    }];
    
    mockedGetUserStats.mockResolvedValueOnce(mockStats);
    renderWithTheme(<PerformanceSummary />);

    await waitFor(() => {
      expect(screen.getByText('SAT')).toBeInTheDocument();
      expect(screen.getByText('Math')).toBeInTheDocument();
      expect(screen.getByText('80.00%')).toBeInTheDocument();
    });
  });

  it('shows error message on API failure', async () => {
    mockedGetUserStats.mockRejectedValueOnce(new Error('API Error'));
    renderWithTheme(<PerformanceSummary />);

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch performance summary')).toBeInTheDocument();
    });
  });
}); 
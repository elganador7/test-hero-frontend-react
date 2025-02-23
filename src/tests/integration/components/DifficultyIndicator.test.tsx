import React from 'react';
import { render, screen } from '@testing-library/react';
import DifficultyIndicator from '../../../components/questions/DifficultyIndicator';
import { ThemeProvider } from '@mui/material';
import getTheme from '../../../theme/theme';

describe('DifficultyIndicator', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(
      <ThemeProvider theme={getTheme('light')}>
        {component}
      </ThemeProvider>
    );
  };

  it('shows easy difficulty for low values', () => {
    renderWithTheme(<DifficultyIndicator difficulty={0.3} />);
    expect(screen.getByText('Easy')).toBeInTheDocument();
  });

  it('shows medium difficulty for middle values', () => {
    renderWithTheme(<DifficultyIndicator difficulty={0.5} />);
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });

  it('shows hard difficulty for high values', () => {
    renderWithTheme(<DifficultyIndicator difficulty={0.8} />);
    expect(screen.getByText('Hard')).toBeInTheDocument();
  });

  it('hides label when showLabel is false', () => {
    renderWithTheme(<DifficultyIndicator difficulty={0.5} showLabel={false} />);
    expect(screen.queryByText('Difficulty:')).not.toBeInTheDocument();
  });
}); 
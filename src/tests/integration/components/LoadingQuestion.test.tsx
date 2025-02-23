import React from 'react';
import { render } from '@testing-library/react';
import LoadingQuestion from '../../../components/common/LoadingQuestion';
import { ThemeProvider } from '@mui/material';
import getTheme from '../../../theme/theme';

describe('LoadingQuestion', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(
      <ThemeProvider theme={getTheme('light')}>
        {component}
      </ThemeProvider>
    );
  };

  it('renders loading skeleton', () => {
    const { container } = renderWithTheme(<LoadingQuestion />);
    expect(container.querySelector('.loadingCard')).toBeInTheDocument();
    expect(container.querySelectorAll('.option')).toHaveLength(4);
  });

  it('applies animation classes', () => {
    const { container } = renderWithTheme(<LoadingQuestion />);
    const card = container.querySelector('.loadingCard');
    expect(card).toHaveClass('loadingCard');
  });
}); 
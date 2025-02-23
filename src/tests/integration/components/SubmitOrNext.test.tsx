import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SubmitOrNext from '../../../components/questions/SubmitOrNext';
import { ThemeProvider } from '@mui/material';
import getTheme from '../../../theme/theme';

describe('SubmitOrNext', () => {
  const defaultProps = {
    answeredCorrectly: false,
    handleSubmit: jest.fn(),
    loadNewGeneratedQuestion: jest.fn(),
    generateNewQuestionFromCurrent: jest.fn(),
  };

  const renderWithTheme = (component: React.ReactElement) => {
    return render(
      <ThemeProvider theme={getTheme('light')}>
        {component}
      </ThemeProvider>
    );
  };

  it('shows submit button when not answered correctly', () => {
    renderWithTheme(<SubmitOrNext {...defaultProps} />);
    expect(screen.getByText('Submit Answer')).toBeInTheDocument();
  });

  it('shows next and similar buttons when answered correctly', () => {
    renderWithTheme(<SubmitOrNext {...defaultProps} answeredCorrectly={true} />);
    expect(screen.getByText('Next Question')).toBeInTheDocument();
    expect(screen.getByText('Similar Question')).toBeInTheDocument();
  });

  it('calls handleSubmit when submit button clicked', () => {
    renderWithTheme(<SubmitOrNext {...defaultProps} />);
    fireEvent.click(screen.getByText('Submit Answer'));
    expect(defaultProps.handleSubmit).toHaveBeenCalled();
  });

  it('calls loadNewGeneratedQuestion when next button clicked', () => {
    renderWithTheme(<SubmitOrNext {...defaultProps} answeredCorrectly={true} />);
    fireEvent.click(screen.getByText('Next Question'));
    expect(defaultProps.loadNewGeneratedQuestion).toHaveBeenCalled();
  });
}); 
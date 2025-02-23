import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FilterSelect from '../../../components/common/FilterSelect';
import { ThemeProvider } from '@mui/material';
import getTheme from '../../../theme/theme';

describe('FilterSelect', () => {
  const defaultProps = {
    placeholder: 'Select option',
    value: '',
    options: ['Option 1', 'Option 2'],
    onChange: jest.fn(),
    onClear: jest.fn(),
    variant: 'small' as const,
  };

  const renderWithTheme = (component: React.ReactElement) => {
    return render(
      <ThemeProvider theme={getTheme('light')}>
        {component}
      </ThemeProvider>
    );
  };

  it('renders with placeholder', () => {
    renderWithTheme(<FilterSelect {...defaultProps} />);
    expect(screen.getByText('Select option')).toBeInTheDocument();
  });

  it('shows options when clicked', () => {
    renderWithTheme(<FilterSelect {...defaultProps} />);
    fireEvent.mouseDown(screen.getByRole('combobox'));
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('calls onChange when option selected', () => {
    renderWithTheme(<FilterSelect {...defaultProps} />);
    fireEvent.mouseDown(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('Option 1'));
    expect(defaultProps.onChange).toHaveBeenCalledWith('Option 1');
  });
}); 
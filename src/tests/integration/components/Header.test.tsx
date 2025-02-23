import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Header } from '../../../components/header/Header';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import getTheme from '../../../theme/theme';

// Mock the auth hooks
jest.mock('react-auth-kit/hooks/useIsAuthenticated', () => ({
  __esModule: true,
  default: () => true,
}));

jest.mock('react-auth-kit/hooks/useSignOut', () => ({
  __esModule: true,
  default: () => jest.fn(),
}));

// Mock the theme store
jest.mock('../../../App', () => ({
  useThemeStore: () => ({
    mode: 'light',
    toggleMode: jest.fn(),
  }),
}));

// Mock the settings store
jest.mock('../../../store/useSettingsStore', () => ({
  useSettingsStore: () => ({
    filters: {
      testType: '',
      subjects: [],
    },
    setFilter: jest.fn(),
    clearFilter: jest.fn(),
  }),
}));

describe('Header', () => {
  const defaultProps = {
    setIsDrawerOpen: jest.fn(),
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter future={{ 
          v7_startTransition: true,
          v7_relativeSplatPath: true 
        }}>
          <ThemeProvider theme={getTheme('light')}>
            {component}
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    queryClient.clear();
  });

  it('renders title', () => {
    renderWithProviders(<Header {...defaultProps} />);
    expect(screen.getByText('TestHero')).toBeInTheDocument();
  });

  it('toggles drawer when menu button clicked', () => {
    renderWithProviders(<Header {...defaultProps} />);
    fireEvent.click(screen.getByTestId('MenuIcon'));
    expect(defaultProps.setIsDrawerOpen).toHaveBeenCalled();
  });

  it('shows filters on practice page', () => {
    window.history.pushState({}, '', '/practice');
    renderWithProviders(<Header {...defaultProps} />);
    expect(screen.getByText('Choose test...')).toBeInTheDocument();
  });

  it('does not show filters on other pages', () => {
    window.history.pushState({}, '', '/');
    renderWithProviders(<Header {...defaultProps} />);
    expect(screen.queryByText('Choose test...')).not.toBeInTheDocument();
  });
}); 
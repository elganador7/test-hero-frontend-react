import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useThemeStore } from '../../../App';

describe('useThemeStore', () => {
  it('should initialize with light mode', () => {
    const { result } = renderHook(() => useThemeStore());
    expect(result.current.mode).toBe('light');
  });

  it('should toggle theme mode', () => {
    const { result } = renderHook(() => useThemeStore());
    act(() => {
      result.current.toggleMode();
    });
    expect(result.current.mode).toBe('dark');
  });
}); 
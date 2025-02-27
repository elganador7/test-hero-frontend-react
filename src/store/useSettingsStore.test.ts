import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useSettingsStore } from './useSettingsStore';

describe('useSettingsStore', () => {
  beforeEach(() => {
    useSettingsStore.setState({
      filters: { testType: '', subjects: [] },
    });
  });

  it('should initialize with empty filters', () => {
    const { result } = renderHook(() => useSettingsStore());
    expect(result.current.filters).toEqual({
      testType: '',
      subjects: [],
    });
  });

  it('should set test type filter', () => {
    const { result } = renderHook(() => useSettingsStore());
    act(() => {
      result.current.setFilter('testType', 'SAT');
    });
    expect(result.current.filters.testType).toBe('SAT');
  });

  it('should set subjects filter', () => {
    const { result } = renderHook(() => useSettingsStore());
    act(() => {
      result.current.setFilter('subjects', ['Math']);
    });
    expect(result.current.filters.subjects).toEqual(['Math']);
  });

  it('should clear specific filter', () => {
    const { result } = renderHook(() => useSettingsStore());
    act(() => {
      result.current.setFilter('testType', 'SAT');
      result.current.clearFilter('testType');
    });
    expect(result.current.filters.testType).toEqual([]);
  });

  it('should clear all filters', () => {
    const { result } = renderHook(() => useSettingsStore());
    act(() => {
      result.current.setFilter('testType', 'SAT');
      result.current.setFilter('subjects', ['Math']);
      result.current.clearAllFilters();
    });
    expect(result.current.filters).toEqual({
      testType: '',
      subjects: [],
    });
  });
}); 

it('should clear specific filter', () => {
  const { result } = renderHook(() => useSettingsStore());
  act(() => {
    result.current.setFilter('testType', 'SAT');
    result.current.clearFilter('testType');
  });
  expect(result.current.filters.testType).toStrictEqual([]); 
}); 
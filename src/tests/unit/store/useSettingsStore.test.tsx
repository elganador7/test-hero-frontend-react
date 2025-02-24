import { renderHook, act } from '@testing-library/react-hooks';
import { useSettingsStore } from '../../../store/useSettingsStore';

it('should clear specific filter', () => {
  const { result } = renderHook(() => useSettingsStore());
  act(() => {
    result.current.setFilter('testType', 'SAT');
    result.current.clearFilter('testType');
  });
  expect(result.current.filters.testType).toStrictEqual([]); 
}); 
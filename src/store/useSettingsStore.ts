import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface SettingsState {
  filters: {
    testType: string;
    subjects: string[];
  };
  setFilter: (field: keyof SettingsState['filters'], value: string | string[]) => void;
  clearFilter: (field: keyof SettingsState['filters']) => void;
  clearAllFilters: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      (set) => ({
        filters: {
          testType: '',
          subjects: [],
        },
        setFilter: (field, value) =>
          set((state) => ({
            filters: {
              ...state.filters,
              [field]: value,
            },
          })),
        clearFilter: (field) =>
          set((state) => ({
            filters: {
              ...state.filters,
              [field]: [],
            },
          })),
        clearAllFilters: () =>
          set({
            filters: {
              testType: '',
              subjects: [],
            },
          }),
      }),
      {
        name: 'settings-storage',
      }
    )
  )
); 
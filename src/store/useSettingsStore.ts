import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { TestTopic } from '../models/TestTopic';

interface SettingsState {
  filters: {
    testType: string;
    subjects: string[];
    topics: string[];
    subtopics: string[];
    specificTopics: string[];
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
          topics: [],
          subtopics: [],
          specificTopics: [],
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
              [field]: field === 'testType' ? '' : [],
            },
          })),
        clearAllFilters: () =>
          set({
            filters: {
              testType: '',
              subjects: [],
              topics: [],
              subtopics: [],
              specificTopics: [],
            },
          }),
      }),
      {
        name: 'settings-storage',
      }
    )
  )
); 
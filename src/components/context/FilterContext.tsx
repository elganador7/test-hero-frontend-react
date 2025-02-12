// context/FilterContext.tsx
import React, { createContext, useContext, useState } from "react";

interface FilterState {
  testType: string | null;
  subject: string | null;
  topic: string | null;
  subtopic: string | null;
  specificTopic: string | null;
}

interface FilterContextType {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>({
    testType: null,
    subject: null,
    topic: null,
    subtopic: null,
    specificTopic: null,
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};


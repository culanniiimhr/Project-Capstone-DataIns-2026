import React, { createContext, useContext, useState } from 'react';

interface FilterContextType {
  tahunAkademik: string;
  semester: string;
  setTahunAkademik: (tahun: string) => void;
  setSemester: (sem: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tahunAkademik, setTahunAkademik] = useState('');
  const [semester, setSemester] = useState('');

  return (
    <FilterContext.Provider value={{ tahunAkademik, semester, setTahunAkademik, setSemester }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
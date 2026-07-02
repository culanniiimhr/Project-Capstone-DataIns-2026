import { createContext, useContext, useState } from "react";

type FilterContextType = {
  tahunAkademik: string;
  semester: string;
  setTahunAkademik: (value: string) => void;
  setSemester: (value: string) => void;
};

const FilterContext = createContext<FilterContextType>({
  tahunAkademik: "",
  semester: "",
  setTahunAkademik: () => {},
  setSemester: () => {},
});

export const FilterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tahunAkademik, setTahunAkademik] = useState("");
  const [semester, setSemester] = useState("");

  return (
    <FilterContext.Provider
      value={{
        tahunAkademik,
        semester,
        setTahunAkademik,
        setSemester,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
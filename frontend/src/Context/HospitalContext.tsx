// Context/HospitalContext.tsx
import React, { createContext, useState, ReactNode } from "react";

export interface Hospital {
  id: number;
  name: string;
  city: string;
  address: string;
}

export interface HospitalContextType {
  hospitals: Hospital[];
  setHospitals: React.Dispatch<React.SetStateAction<Hospital[]>>; // ✅ add setter
}

export const HospitalContext = createContext<HospitalContextType>({
  hospitals: [],
  setHospitals: () => {}, // default empty
});

export const HospitalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  return (
    <HospitalContext.Provider value={{ hospitals, setHospitals }}>
      {children}
    </HospitalContext.Provider>
  );
};

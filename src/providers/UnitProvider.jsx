import { createContext, useContext, useState } from "react";

const UnitContext = createContext();

export function UnitProvider({ children }) {
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleUnit = () => setIsCelsius((prev) => !prev);

  return (
    <UnitContext.Provider value={{ isCelsius, toggleUnit }}>
      {children}
    </UnitContext.Provider>
  );
}

export const useUnit = () => {
  const context = useContext(UnitContext);
  if (context === undefined) {
    throw new Error("useUnit must be used within a UnitProvider");
  }
  return context;
};
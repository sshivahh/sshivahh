import { createContext, useContext, useEffect, useState } from "react";

type VisitContextType = {
  isFirstVisit: boolean;
};

const VisitContext = createContext<VisitContextType>({ isFirstVisit: true });

export const VisitProvider = ({ children }: { children: React.ReactNode }) => {
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsFirstVisit(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <VisitContext.Provider value={{ isFirstVisit }}>
      {children}
    </VisitContext.Provider>
  );
};

export const useVisit = () => useContext(VisitContext);

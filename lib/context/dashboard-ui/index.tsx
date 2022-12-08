import React, { createContext, ReactNode, useContext, useState } from 'react';

interface IDashboardNavContext {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardNavContext = createContext<IDashboardNavContext | null>(null);

interface IDashboardNavContextProvider {
  children: ReactNode;
}

const DashboardNavContextProvider: React.FC<IDashboardNavContextProvider> = ({
  children,
}) => {
  const [showNav, setShowNav] = useState(false);
  const value = { showNav, setShowNav };

  return (
    <DashboardNavContext.Provider value={value}>
      {children}
    </DashboardNavContext.Provider>
  );
};

export default DashboardNavContextProvider;

export const useDashboardNavContext = () => useContext(DashboardNavContext);

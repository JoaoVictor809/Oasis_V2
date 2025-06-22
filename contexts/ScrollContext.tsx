import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useContext } from 'react';

// 1. Define Context Type
interface ScrollContextType {
  isTabBarVisible: boolean;
  setTabBarVisible: Dispatch<SetStateAction<boolean>>;
  scrollY: number;
  setScrollY: Dispatch<SetStateAction<number>>;
}

// 2. Create Context
export const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

// 3. Define Provider Props Type (children)
interface ScrollProviderProps {
  children: ReactNode;
}

// 4. Create Provider Component
export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
  const [isTabBarVisible, setTabBarVisible] = useState<boolean>(true);
  const [scrollY, setScrollY] = useState<number>(0);

  return (
    <ScrollContext.Provider value={{ isTabBarVisible, setTabBarVisible, scrollY, setScrollY }}>
      {children}
    </ScrollContext.Provider>
  );
};

// 5. Create Custom Hook
export const useScroll = (): ScrollContextType => {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
};

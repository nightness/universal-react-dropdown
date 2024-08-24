import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

interface CSSVarsContextType {
  setCSSVar: (name: string, value: string, element?: HTMLElement) => void;
  getCSSVar: (name: string, element?: HTMLElement) => string;
}

const CSSVarsContext = createContext<CSSVarsContextType | undefined>(undefined);

interface CSSVarsProviderProps {
  children: ReactNode;
  defaultVars?: { [key: string]: string };
}

export const CSSVarsProvider: React.FC<CSSVarsProviderProps> = ({ children, defaultVars = {} }) => {
  // const [vars, setVars] = useState<{ [key: string]: string }>(defaultVars);

  const setCSSVar = useCallback((name: string, value: string, element: HTMLElement = document.documentElement) => {
    element.style.setProperty(name, value);
    // setVars((prevVars) => ({
    //   ...prevVars,
    //   [name]: value,
    // }));
  }, []);

  const getCSSVar = useCallback((name: string, element: HTMLElement = document.documentElement): string => {
    return getComputedStyle(element).getPropertyValue(name).trim();
  }, []);

  // Set all default vars on mount
  useEffect(() => {
    Object.keys(defaultVars).forEach((name) => {
      setCSSVar(name, defaultVars[name]);
    });
  }, [defaultVars]);

  // useEffect(() => {
  //   // Apply all default vars on mount
  //   Object.keys(vars).forEach((name) => {
  //     element.style.setProperty(name, vars[name]);
  //   });
  // }, [vars]);

  return (
    <CSSVarsContext.Provider value={{ setCSSVar, getCSSVar }}>
      {children}
    </CSSVarsContext.Provider>
  );
};

export const useCSSVars = (): CSSVarsContextType => {
  const context = useContext(CSSVarsContext);
  if (!context) {
    throw new Error('useCSSVars must be used within a CSSVarsProvider');
  }
  return context;
};

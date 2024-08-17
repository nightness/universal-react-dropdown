// Global provider
// Path: src/providers/GlobalProvider.ts

import { createContext } from "react";

interface GlobalContextProps { }

export const GlobalContext = createContext<GlobalContextProps>({});

export default function GlobalProvider({ children }: {
  children: React.ReactNode;
}) {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
}

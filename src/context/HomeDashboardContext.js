import { useContext, createContext, useReducer } from "react";

const HomeDashboardContext = createContext();

export const HomeDashboardProvider = ({ reducer, initialState, children }) => (
  <HomeDashboardContext.Provider value={useReducer(reducer, initialState)}>
      {children}
  </HomeDashboardContext.Provider>
);

export const HomeContextValue = () => useContext(HomeDashboardContext);

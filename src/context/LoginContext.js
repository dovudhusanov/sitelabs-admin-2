import { useReducer, useContext, createContext } from "react";

const LoginContext = createContext();

export const LoginContextProvider = ({ reducer, initialState, children }) => (
  <LoginContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </LoginContext.Provider>
);

export const LognContextValue = () => useContext(LoginContext);

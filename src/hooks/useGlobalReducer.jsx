import { createContext, useContext, useReducer } from "react";
import { initialState, storeReducer } from "../store";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalReducer = () => {
  const context = useContext(GlobalContext);
  return context;
};

import { createContext, useReducer } from "react";
import Reducer from "./Reducer.js";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, {
        user: null,
    });

    console.log("UserContex state:", state);

    return (
        <Context.Provider value={{ ...state, dispatch }}>
            {children}
        </Context.Provider>
    );
};

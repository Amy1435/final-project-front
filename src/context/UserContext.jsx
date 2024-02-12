import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer.js";

const FIRST_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
};
export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, FIRST_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    console.log("UserContex state:", state);

    return (
        <Context.Provider value={{ user: state.user, dispatch }}>
            {children}
        </Context.Provider>
    );
};

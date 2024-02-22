import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer.js";

const storedUser = localStorage.getItem("user");
const FIRST_STATE = {
    user: isValidJSON(storedUser) ? JSON.parse(storedUser) : null,
};
function isValidJSON(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

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

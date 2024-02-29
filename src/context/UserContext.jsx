import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer.js";

function isValidJSON(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}
const storedData = localStorage.getItem("data");
const FIRST_STATE = {
    user: null,
    token: null,
};

if (isValidJSON(storedData)) {
    const parsedData = JSON.parse(storedData);
    FIRST_STATE.user = parsedData.user || null;
    FIRST_STATE.token = parsedData.token || null;
}
export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, FIRST_STATE);

    useEffect(() => {
        localStorage.setItem(
            "data",
            JSON.stringify({ user: state.user, token: state.token })
        );
    }, [state.user, state.token]);

    console.log("UserContex state:", state);

    return (
        <Context.Provider
            value={{ user: state.user, token: state.token, dispatch }}
        >
            {children}
        </Context.Provider>
    );
};

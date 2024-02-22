const Reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };
        case "LOGOUT":
            return { user: null };
        case "UPDATE_USER":
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default Reducer;

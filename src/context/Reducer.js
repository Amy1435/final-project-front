const Reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload.user, token: action.payload.token };
        case "LOGOUT":
            return { user: null, token: null };
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

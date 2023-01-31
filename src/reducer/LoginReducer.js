export const initialState = {
    admin: [],
    loading: false,
    error: null,
};

export const ActionType = {
    LOGIN__START: "LOGIN__START",
    LOGIN__FAILURE: "LOGIN__FAILURE",
};

export const LoginReducer = (state, action) => {
    switch (action.type) {
        case ActionType.LOGIN__START:
            return {...state, loading: true, admin: [], error: null};
        case ActionType.LOGIN__FAILURE:
            return {...state, loading: false, admin: [], error: action.payload};
        default:
            return state;
    }
};

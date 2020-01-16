import { REGISTER_SUCCESS, LOGIN_SUCCESS } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}
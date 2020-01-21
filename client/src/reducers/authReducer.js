import { REGISTER_SUCCESS, LOGIN_SUCCESS, SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';


const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
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
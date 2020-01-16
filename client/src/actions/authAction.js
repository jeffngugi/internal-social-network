import { LOGIN_SUCCESS, REGISTER_SUCCESS } from './types';

export const registerUser = (userData) => {
    return {
        type: REGISTER_SUCCESS,
        payload: userData
    }
}

export const login = (userData) => {
    return {
        type: LOGIN_SUCCESS,
        payload: userData
    }
}
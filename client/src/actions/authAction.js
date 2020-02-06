import { REGISTER_SUCCESS, GET_ERRORS, CLEAR_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


export const registerUser = (userData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    await axios.post('/users/create', userData, config)
        .then(res => {
            if (res.data.status === 'Error') {
                dispatch({
                    type: GET_ERRORS,
                    payload: res.data.message
                })
            } else {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: res.data.message
                })
            }
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

export const login = (userData) => async dispatch => {
    clearErrors();
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    await axios.post('/auth/signin', userData, config)
        .then(res => {
            if (res.data.status === 'Error') {
                dispatch({
                    type: GET_ERRORS,
                    payload: res.data.message
                })
            } else {
                //get token  
                const token = res.data.data.token;
                //set token to LS
                localStorage.setItem('jwtToken', token);
                //set token to auth header
                setAuthToken(token);
                //dedcode user data
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
                // console.log(decoded);
                // dispatch({
                //     type: LOGIN_SUCCESS,
                //     payload: res.data
                // })
            }
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

//setLogged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//Log user out
export const logout = () => dispatch => {
    //renove token from localstorage
    localStorage.removeItem('jwtToken');
    //Remove auth header for future requests
    setAuthToken(false);
    //Set current user into an empty object
    dispatch(setCurrentUser({}));
}

//clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};

export const getErrors = (errors)  =>{
    return{
        type:GET_ERRORS,
        payload:errors

    }
}
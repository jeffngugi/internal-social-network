import { GET_USERS, USER_LOADING } from './types';
import axios from 'axios';

//get all users
export const getUsers = () => async dispatch => {
    dispatch(userLoading())
    try {
        axios.get('/users/all')
            .then(res => dispatch({
                type: GET_USERS,
                payload: res.data
            }))
            .catch(err => console.log(err))

    } catch (error) {
        console.log(`Error ${error}`);
    }
}


export const userLoading = () => {
    return {
        type: USER_LOADING
    }
}

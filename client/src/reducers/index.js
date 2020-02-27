import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userReducer from './userReducer';
import articlesReducer from './articlesReducer'
import imageReducer from './imageReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    users: userReducer,
    articles: articlesReducer,
    images:imageReducer

})
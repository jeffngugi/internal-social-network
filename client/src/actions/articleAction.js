import axios from 'axios';
import { GET_ALL_ARTICLES, ARTICLE_LOADING } from './types';

export const getArticles = () => async dispatch => {
    dispatch(articleLoading());
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    await axios.get('/articles', config)
        .then(res => dispatch({
            type: GET_ALL_ARTICLES,
            payload: res.data.data
        }))
        .catch(err => console.log(err))
}

export const createArticle = (formData) =>async dispatch=>{    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    await axios.post('/articles', formData, config)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}
export const articleLoading = () => {
    return {
        type: ARTICLE_LOADING
    }
}
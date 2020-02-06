import { GET_ALL_ARTICLES, ARTICLE_LOADING, CREATE_ARTICLE} from '../actions/types';

const initialState = {
    articles: null,
    article: {},
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_ARTICLE:
            return{
                ...state
            }
        case GET_ALL_ARTICLES:
            return {
                ...state,
                articles: action.payload,
                loading: false
            }
        case ARTICLE_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}
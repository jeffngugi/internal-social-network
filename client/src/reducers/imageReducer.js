import {GET_ALL_IMAGES, IMAGES_LOADING} from '../actions/types';

const initialState = {
    images:null,
    image:{},
    loading:false
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_ALL_IMAGES:
            return{
                ...state,
                images:action.payload,
                loading:false
            }
        case IMAGES_LOADING:
            return{
                ...state,
                loading:true
            }
        default:
            return state;
    }
}
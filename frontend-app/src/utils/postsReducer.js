// reducer para setear los posts
import {useReducer} from "react";

export const SET_POSTS = 'SET_POSTS';
const SET_ERROR = 'SET_ERROR';
export const SET_FLAG = 'SET_FLAG';

const initialState = {
    posts: [],
    flag: 0,
    error: false
};

const postReducer = (state = initialState, action) => {
    const newState = {...state};
    const {type} = {...action};

    if (type === SET_POSTS) {
        newState.posts = action.data;
    }
    if (type === SET_ERROR) {
        newState.error = action.error;
    }
    if (type === SET_FLAG) {
        newState.flag++;
    }

    return newState;
};

export const PostReducer = () => useReducer(postReducer, initialState);
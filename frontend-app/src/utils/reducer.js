import {useReducer} from 'react';

const initialState = {
    token: null
};

// actions
const SAVE_CURRENT_TOKEN_ON_STATE = 'SAVE_CURRENT_TOKEN_ON_STATE'; // si existe un token en localStorage, guardarlo en initialState
const DO_LOGOUT = 'DO_LOGOUT'; // para vaciar el token (esté activo o caducado) y redirigir a login

const AuthorizationReducer = (state = initialState, action) => {
    const newState = {...state};
    const {type} = {...action};

    if (type === SAVE_CURRENT_TOKEN_ON_STATE) {
        if (localStorage.getItem("TOKEN_KEY")) {
            newState.token = JSON.parse(localStorage.getItem("TOKEN_KEY"));
            console.log("Token cogido de localStorage y guardado en state: " + newState.token);
        }
    }
    if (type === DO_LOGOUT) {
        newState.token = null;
        localStorage.removeItem("TOKEN_KEY");
        console.log("Token borrado del estado y de localStorage.");
    }

    return newState;
};

export const AuthReducer = () => useReducer(AuthorizationReducer, initialState);
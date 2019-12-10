import {useReducer} from 'react';

const initialState = {
    token: null,
    isFetching: false
};

// actions
const SAVE_CURRENT_TOKEN_ON_STATE = 'SAVE_CURRENT_TOKEN_ON_STATE'; // si existe un token en localStorage, guardarlo en initialState
const GET_CURRENT_TOKEN = 'GET_CURRENT_TOKEN'; // para devolver el token actualmente guardado en initialState
const DO_LOGOUT = 'DO_LOGOUT'; // para vaciar el token (esté activo o caducado) y redirigir a login
const IS_FETCHING = 'IS_FETCHING'; // para indicar cuando se están cargando datos de backend
const IS_NOT_FETCHING_ANYMORE = 'IS_NOT_FETCHING_ANYMORE'; // para indicar cuando se acabó de cargar datos de backend

const AuthorizationReducer = (state = initialState, action) => {
    const newState = {...state};
    const {type} = {...action};

    if (type === SAVE_CURRENT_TOKEN_ON_STATE) {
        if (localStorage.getItem("TOKEN_KEY")) {
            newState.token = localStorage.getItem("TOKEN_KEY");
            console.log("Nuevo token guardado! " + newState.token);
        }
    }
    if (type === GET_CURRENT_TOKEN) {
        if (initialState.token) {
            return initialState.token;
        } else {
            console.log("No hay token guardado, nada que devolver.");
        }
    }
    if (type === DO_LOGOUT) {
        newState.token = null;
        localStorage.removeItem("TOKEN_KEY");
        // TODO: history.push a la página de login?
    }
    if (type === IS_FETCHING) {
        newState.isFetching = true;
    }
    if (type === IS_NOT_FETCHING_ANYMORE) {
        newState.isFetching = false;
    }

    return newState;
};

export const AuthReducer = () => useReducer(AuthorizationReducer, initialState);
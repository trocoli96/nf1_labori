import {useReducer} from 'react';

const initialState = {
    token: null
};

// actions
const DO_LOGOUT = 'DO_LOGOUT'; // para vaciar el token (esté activo o caducado) y redirigir a login
// esta acción está en desuso, pero mantengo el código comentado para futura referencia
//const SAVE_CURRENT_TOKEN_ON_STATE = 'SAVE_CURRENT_TOKEN_ON_STATE'; // si existe un token en localStorage, guardarlo en initialState


const AuthorizationReducer = (state = initialState, action) => {
        const newState = {...state};
        const {type} = {...action};

        // esta acción ya no la usamos, consultamos directamente el token con getToken() de tokenHelper.js
        // lo dejo aquí igualmente para futura referencia
        /*
        if (type === SAVE_CURRENT_TOKEN_ON_STATE) {
            if (localStorage.getItem("TOKEN_KEY")) {
                newState.token = localStorage.getItem("TOKEN_KEY");
                console.log("Token cogido de localStorage y guardado en state.");
            }
        }
        */

        if (type === DO_LOGOUT) {
            newState.token = null;
            localStorage.removeItem("TOKEN_KEY");
            console.log("Token borrado del estado y de localStorage.");
        }

        return newState;
    }

export const AuthReducer = () => useReducer(AuthorizationReducer, initialState);
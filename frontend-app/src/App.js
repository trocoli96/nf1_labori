import React, {useReducer} from 'react';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import Profilepage from "./Profilepage";
import FormSignUp from './FormSignUp';
import './App.css';
import Header from "./Header";
import Login from "./Login";
import {HOME, PROFILE, SIGNUP, LOGIN} from "./routes/routes";
import {AuthProvider} from "./utils/AuthFront/context";

const DO_LOGIN = 'DO_LOGIN';
const IS_FETCHING = 'IS_FETCHING';
const GET_ERROR = 'GET_ERROR';
const GET_TOKEN = 'GET_TOKEN';

const initialState = {
    token: null,
    isFetching: false
};

const AuthReducer = (state = initialState, action) => {
    const newState = {...state};
    const {type} = {...action};

    if (type === DO_LOGIN) {
        // TODO Lógica de Login
    }
    if (type === GET_TOKEN) {
        return initialState.token;
    }
    if (type === GET_ERROR) {
        newState.token = null;
        return 'ERROR MOTHERFUCKER';
    }

    if (type === IS_FETCHING) {
        newState.isFetching = true;
    }

    return newState;
};

const [state, dispatch] = useReducer(AuthReducer, initialState);

const App = () => {

    // TODO: Guardar el token en una variable, para reutilizarlo en toda la app
    // TODO: If (token) => actualizar initialState
    // TODO: LOGOUT --> Borra localstorage, actualiza initialState al estado original

    return (<div className={'body'}>
            <Router>
                <AuthProvider value={{state, dispatch}}>
                    <Header/>
                    <Route path={HOME} component={Profilepage}/>
                    <Route path={LOGIN} component={Login}/>
                    <Route path={SIGNUP} component={FormSignUp}/>
                    <Route path={PROFILE} component={Profilepage}/>
                </AuthProvider>
            </Router>
        </div>
    );

};
export default withRouter(App);
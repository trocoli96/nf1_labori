/* BASIC STUFF */
import React from 'react';
import './App.css';

/* ROUTER & ROUTES */
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import Profilepage from "./Profilepage";
import FormSignUp from './FormSignUp';
import Header from "./Header";
import Login from "./Login";
import {HOME, PROFILE, SIGNUP, LOGIN} from "./routes/routes";

/* USECONTEXT PROVIDER */
import AuthContext from "./utils/AuthFront/context";
import {AuthReducer} from "./utils/reducer";

const App = () => {

    const [state, dispatch] = AuthReducer();

    // si el token existen en localStorage, lo guardamos en nuestra variable de contexto
    if (localStorage.getItem("token")) {
        dispatch({type: 'SAVE_CURRENT_TOKEN_ON_STATE'});
    }

    return (
        <div className={'body'}>
            <Router>
                <AuthContext.Provider value={{state, dispatch}}>
                    <Header/>
                    <Route path={HOME} component={Profilepage}/>
                    <Route path={LOGIN} component={Login}/>
                    <Route path={SIGNUP} component={FormSignUp}/>
                    <Route path={PROFILE} component={Profilepage}/>
                </AuthContext.Provider>
            </Router>
        </div>
    );

};
export default withRouter(App);
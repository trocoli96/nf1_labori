/* BASIC STUFF */
import React, {useEffect} from 'react';
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

    // recogemos el reducer, para luego pasarlo a los componentes que requieran sus datos
    const [state, dispatch] = AuthReducer();

    // si el token existe en localStorage, lo guardamos en nuestra variable de contexto al cargar la app
    // TODO (o más bien duda): ¿por qué no se llama a este dispatch antes que nada?
    useEffect(() => {
        if (localStorage.getItem("TOKEN_KEY")) {
            dispatch({type: 'SAVE_CURRENT_TOKEN_ON_STATE'});
        }
    }, [dispatch]);

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
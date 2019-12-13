/* BASIC STUFF */
import React, {useEffect} from 'react';
import './App.css';

/* ROUTER & ROUTES */
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import Profilepage from "./components/Profilepage";
import FormSignUp from './components/FormSignUp';
import Header from "./components/Header";
import Login from "./components/Login";
import {HOME, SIGNUP, LOGIN} from "./routes/routes";

/* USECONTEXT PROVIDER */
import {AuthContext} from "./utils/AuthFront/context";
import {AuthReducer} from "./utils/reducer";

const App = () => {

    // recogemos el reducer, para luego pasarlo a los componentes que requieran sus datos a través de context
    const [state, dispatch] = AuthReducer();

    // si el token existe en localStorage, lo guardamos en nuestra variable de contexto al cargar la app
    useEffect(() => {
        dispatch({type: 'SAVE_CURRENT_TOKEN_ON_STATE'});
    }, []);

    // si el token es null porque no hay, redirigimos a la pagina de login
    // TODO: habrá que repensar esto. al final, si alguien quiere ver la landing o el signup, creo que no le dejamos
    if (!state.token) {
        return (
            <AuthContext.Provider value={{state, dispatch}}>
                <Header/>
                <Login/>
            </AuthContext.Provider>)
    }


    return (
        <div className={'body'}>
            <Router>
                <AuthContext.Provider value={{state, dispatch}}>
                    <Header/>
                    <Route path={LOGIN} component={Login}/>
                    <Route path={SIGNUP} component={FormSignUp}/>
                    <Route path={HOME} component={Profilepage}/>
                </AuthContext.Provider>
            </Router>
        </div>
    );

};

export default withRouter(App);
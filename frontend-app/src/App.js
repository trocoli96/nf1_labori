/* BASIC STUFF */
import React, {useEffect} from 'react';
import './App.css';

/* ROUTER & ROUTES */
import {BrowserRouter as Router, Redirect, Route, withRouter} from 'react-router-dom';
import Profilepage from "./components/Profilepage";
import FormSignUp from './components/FormSignUp';
import Header from "./components/Header";
import Login from "./components/Login";
import {HOME, SIGNUP, LOGIN, PROFILE} from "./routes/routes";

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


    const privateRoutes = (
        <React.Fragment>
            <Route path={PROFILE} component={Profilepage}/>
        </React.Fragment>
    );
    const privateRedirectsOnNoToken = (
        <Route path="*" render={() => <Redirect to={LOGIN} />} />
    );

    return (
        <div className={'body'}>
            <Router>
                <AuthContext.Provider value={{state, dispatch}}>
                    <Header/>
                    <Route exact path={LOGIN} component={Login}/>
                    <Route exact path={SIGNUP} component={FormSignUp}/>
                    <Route exact path={HOME} component={FormSignUp}/>
                    {state.token && privateRoutes}
                    {!state.token && privateRedirectsOnNoToken}
                </AuthContext.Provider>
            </Router>
        </div>
    );

};

export default withRouter(App);
/* BASIC STUFF */
import React from 'react';
import {AuthContext} from "./utils/AuthFront/context";
import {AuthReducer} from "./utils/reducer";
import getToken from "./utils/tokenHelper";

/* ROUTER & ROUTES */
import {BrowserRouter as Router, Redirect, Route, withRouter, Switch} from 'react-router-dom';
import {HOME, SIGNUP, LOGIN, PROFILE, FEED, POST} from "./routes/routes";

/* COMPONENTS & STYLES */
import Profilepage from "./views/Profilepage";
import FormSignUp from './views/FormSignUp';
import Header from "./components/Header";
import Login from "./components/Login";
import Homepage from "./views/Homepage";
import FeedPage from "./views/FeedPage";
import './App.css';
import SeePost from "./views/SeePost";
alguna barbaridad
const App = () => {

    // recogemos el reducer, para luego pasarlo a los componentes que requieran sus datos a través de context
    const [state, dispatch] = AuthReducer();

    // guardamos el token para comprobar luego hacia dónde debemos dirigir en función de la ruta
    let currentToken = getToken();

    // si no hay token, serán estas rutas
    // TODO: Seguro que hay una forma más limpia que repetir dos veces las rutas
    if (currentToken === null) {
        return (
            <div className={'body'}>
                <Router>
                    <AuthContext.Provider value={{state, dispatch}}>
                        <Header/>
                        <Switch>
                            <Route exact path={LOGIN} component={Login}/>
                            <Route exact path={SIGNUP} component={FormSignUp}/>
                            <Route exact path={HOME} component={Homepage}/>
                            <Route exact path={PROFILE}>
                                <Redirect to={LOGIN}/>
                            </Route>
                            <Route exact path={FEED}>
                                <Redirect to={LOGIN}/>
                            </Route>
                        </Switch>
                    </AuthContext.Provider>
                </Router>
            </div>
        )
    }

    return (
        <div className={'body'}>
            <Router>
                <AuthContext.Provider value={{state, dispatch}}>
                    <Header/>
                    <Switch>
                        <Route exact path={LOGIN}>
                            <Redirect to={FEED}/>
                        </Route>
                        <Route exact path={SIGNUP}>
                            <Redirect to={FEED}/>
                        </Route>
                        <Route exact path={HOME}>
                            <Redirect to={FEED}/>
                        </Route>
                        <Route exact path={PROFILE} component={Profilepage}/>
                        <Route exact path={FEED} component={FeedPage}/>
                        <Route exact path={POST} component={SeePost}/>
                    </Switch>
                </AuthContext.Provider>
            </Router>
        </div>
    );

};

export default withRouter(App);
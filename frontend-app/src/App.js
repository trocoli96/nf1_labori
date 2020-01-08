/* BASIC STUFF */
import React, {useEffect} from 'react';
import {AuthContext} from "./utils/AuthFront/context";
import {AuthReducer} from "./utils/reducer";

/* ROUTER & ROUTES */
import {BrowserRouter as Router, Redirect, Route, withRouter, Switch} from 'react-router-dom';
import {HOME, SIGNUP, LOGIN, PROFILE} from "./routes/routes";

/* COMPONENTS & STYLES */
import Profilepage from "./components/Profilepage";
import FormSignUp from './components/FormSignUp';
import Header from "./components/Header";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import './App.css';

const App = () => {

    // recogemos el reducer, para luego pasarlo a los componentes que requieran sus datos a través de context
    const [state, dispatch] = AuthReducer();

    // si el token existe en localStorage, lo guardamos en nuestra variable de contexto al cargar la app
    useEffect(() => {
        dispatch({type: 'SAVE_CURRENT_TOKEN_ON_STATE'});
    }, [dispatch]);

    // renderizaremos estas rutas condicionalmente, en función de si hay o no hay token
    const privateRoutes = (
        <React.Fragment>
            <Route path={PROFILE} component={Profilepage}/>
            <Route path={FEED} component={FeedPage}/>
        </React.Fragment>
    );
    const privateRedirectsOnNoToken = (
        <Route path="*" render={() => <Redirect to={LOGIN}/>}/>
    );

    return (
        <div className={'body'}>
            <Router>
                <AuthContext.Provider value={{state, dispatch}}>
                    <Header/>
                    <Switch>
                        <Route exact path={LOGIN}>
                            {state.token ? <Redirect to={PROFILE}/> : <Login/>}
                        </Route>
                        <Route exact path={SIGNUP}>
                            {state.token ? <Redirect to={PROFILE}/> : <FormSignUp/>}
                        </Route>
                        <Route exact path={HOME}>
                            {state.token ? <Redirect to={PROFILE}/> : <Homepage/>}
                        </Route>
                        {state.token && privateRoutes}
                        {!state.token && privateRedirectsOnNoToken}
                    </Switch>
                </AuthContext.Provider>
            </Router>
        </div>
    );

};

export default withRouter(App);
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Profilepage from "./Profilepage";
import FormSignUp from './FormSignUp';
import './App.css';
import Header from "./Header";
import Login from "./Login";
import {HOME, PROFILE, SIGNUP, LOGIN} from "./routes/routes";
import {getToken} from "./utils/localStorage";
import {withRouter} from 'react-router-dom';

const token = getToken();

const App = () => {
    if (!token) {
        return (<Login/>)
    }

    return (<div className={'body'}>
            <Router>
                <Header/>
                <Route path={HOME} component={Profilepage}/>
                <Route path={LOGIN} component={Login}/>
                <Route path={SIGNUP} component={FormSignUp}/>
                <Route path={PROFILE} component={Profilepage}/>
            </Router>
        </div>
    );

};
export default withRouter(App);
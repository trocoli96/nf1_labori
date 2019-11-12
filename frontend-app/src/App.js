import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Profilepage from "./Profilepage";
import FormSignUp from './FormSignUp';
import './App.css';
import Header from "./Header";
import Login from "./Login";



const App = () => {
    return (
        <div className={'body'}>
            <Header/>
            <Router>
                <Route path={'/Home'}/>
                <Route path={'/Login'} component={Login}/>
                <Route path={'/Singup'} component={FormSignUp}/>
                <Route path={'/Profile'} component={Profilepage}/>
            </Router>
        </div>
    );
};

export default App;
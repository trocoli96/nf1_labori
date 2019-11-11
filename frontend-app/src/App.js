import React from 'react';
import './App.css';
import Header from "./Header";
import Login from "./Login";
import Router from "react-router-dom/es/Router";
import Route from "react-router-dom/es/Route";

function App() {

    return (
        <div className={'body'}>
            <Header/>
            <Router>
                <Route path={'/Home'}/>
                <Route path={'/Login'} component={Login}/>
                <Route path={'/Singup'} component={FormSingUp}/>
                <Route path={'/Profile'} component={Profilepage}/>
            </Router>
        </div>
    );
}
export default App;
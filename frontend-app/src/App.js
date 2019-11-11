import React from 'react';
import './App'
import ButtonPopup from './Buttonpopup';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from "./Header";

function App() {
    return (
        <Router>
         <div className="body">
             <Header/>
             <Route path="/Home"/>
             <Route path="/Login"/>
             <Route path="/Singup"/>
             <Route path="/Profile"/>
         </div>
        <Router/>

    );
}

export default App;
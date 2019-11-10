import React from 'react';
import './App'
import ButtonPopup from './Buttonpopup';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
    return (
        <Router>
        <div className="App">
            <header className="App-header">
                <nav>
                   Labori
                </nav>
            </header>
         <div className="body">
             <Route path="/home"/>
             <ButtonPopup open={"Editbutton"}/>
         </div>
        </div>
        <Router/>
    );
}

export default App;;
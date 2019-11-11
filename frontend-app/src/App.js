import React from 'react';
import './App'
import ButtonPopup from './Buttonpopup';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './Header';

const App = () => {
    return (
         <div className={'body'}>
             <Header/>
             <Router>
                 <Route path={'/Home'}/>
                 <Route path={'/Login'}/>
                 <Route path={'/Singup'}/>
                 <Route path={'/Profile'}/>
             </Router>
         </div>

    );
};

export default App;
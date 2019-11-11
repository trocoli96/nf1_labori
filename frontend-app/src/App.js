import React from 'react';
import './App'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './Header';
import Profilepage from './Profilepage';

const App = () => {
    return (
         <div className={'body'}>
             <Header/>
             <Router>
                 <Route path={'/Home'}/>
                 <Route path={'/Login'}/>
                 <Route path={'/Singup'}/>
                 <Route path={'/Profile'} component={Profilepage}/>
             </Router>
         </div>

    );
};

export default App;
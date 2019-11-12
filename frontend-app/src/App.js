import React from 'react';
import './App'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './Header';
import Profilepage from './Profilepage';
import FormSingUp from './FormSignUp'

const App = () => {
    return (
         <div className={'body'}>
             <Header/>
             <Router>
                 <Route path={'/Home'}/>
                 <Route path={'/Login'}/>
                 <Route path={'/Singup'} component={FormSingUp}/>
                 <Route path={'/Profile'} component={Profilepage}/>
             </Router>
         </div>

    );
};

export default App;
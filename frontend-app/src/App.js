import React from 'react';
import './App'
import Header from './Header';
import Profilepage from './Profilepage';

function App() {
    return (
        <div className="App">
            <Header/>
            <Profilepage/>
            <header className="App-header">

                <p>
                    Welcome to Labori
                </p>

            </header>

        </div>
    );
}

export default App;
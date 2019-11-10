import React from 'react';
import './App'
import ButtonPopup from './Buttonpopup';


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <ButtonPopup open={"hola"}/>
            </header>
        </div>
    );
}

export default App;
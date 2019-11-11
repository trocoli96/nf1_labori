import React from 'react';
import './App.css';
import LoginForm from "./Login-Form";
import Logo from "./linkedin-logo.png";


function App() {

    return (
        <div className="login">
            <header className="login-header">
                <img className={"logo-labori"} src={Logo} alt={"logo-linkedin"}/>
                <h1 className={"login-welcome"}> Welcome Back</h1>
                <p className={"login-text"}>Don't miss your next opportunity. Sign in to stay updated on your professional world.</p>
            </header>
            <div className={"login-body"}>
            <div className={"login-form-section"}>
                <LoginForm/>
            </div>
            <div className={"login-form-links"}>
                <div><a href="#"> Forgot Password?</a> </div>
                <p>New to LaBori? <a href="#">Join now</a></p>
            </div>
        </div>
        </div>
    );
}

export default App;
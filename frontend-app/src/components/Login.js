import React, {useContext} from 'react';
import '../App.css';
import LoginForm from "./Login-Form";
import {AuthContext} from "../utils/AuthFront/context";

function Login() {

    const {state, dispatch} = useContext(AuthContext);

    return (
        <div className="login">
            <header className="login-header">
                <h1 className={"welcome"}>Welcome Back</h1>
                <p className={"login-text"}>Don't miss your next opportunity. Sign in to stay updated on your
                    professional world.</p>
            </header>
            <div className={"login-body"}>
                <div className={"login-form-section"}>
                        <LoginForm/>
                </div>
                <div className={"login-form-links"}>
                    <div><a href="#">Forgot Password?</a></div>
                    <p>New to LaBori? <a href="#">Join now</a></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
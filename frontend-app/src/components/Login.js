/* BASIC STUFF */
import React from 'react';

/* ROUTER & ROUTES */
import {Link, withRouter} from 'react-router-dom';
import {LOGIN, SIGNUP} from "../routes/routes";

/* COMPONENTS & STYLES */
import '../App.css';
import LoginForm from "../views/Login-Form";

function Login() {

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
                    <div>
                        <Link style={{color: "#3f51b5"}} to={LOGIN} className="headerBtn">Forgot Password?</Link>
                    </div>
                    <p>
                        New to LaBori? <Link style={{color: "#3f51b5"}} to={SIGNUP} className="headerBtn">
                        Join now
                    </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Login);
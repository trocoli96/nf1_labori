/* BASIC STUFF */
import React, {useContext, useState} from 'react';
import {saveToken} from "../utils/localStorage";
import {AuthContext} from "../utils/AuthFront/context";

/* ROUTER & ROUTES */
import {withRouter} from 'react-router-dom';
import {FEED} from "../routes/routes";

/* COMPONENTS & STYLES */
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import '../styles/App.css';

function LoginForm({history}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isFetching, setIsFetching] = useState(false);


    // recogemos lo proveído por el context
    const {dispatch} = useContext(AuthContext);

    const data = {
        email: email,
        password: password,
    };

    const handleSubmit = (event) => {
        setError(false);
        setIsFetching(true);
        const fetchData = async () => {
            const url = "http://api.labori-app.xyz/api/login";
            const options = {
                method: "POST",
                body: JSON.stringify(data),
                headers: new Headers({
                    Accept: "application/json",
                    "Content-type": "application/json"
                }),
                mode: "cors"
            };
            return fetch(url, options)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    return Promise.reject(response.status);
                }).then(data => {
                    console.log("Login correcto, guardamos token en localStorage y state, y redirigimos.");
                    saveToken(data);
                    dispatch({type: "SAVE_CURRENT_TOKEN_ON_STATE"});
                    setIsFetching(false);
                    history.push(FEED);
                }).catch(error => {
                    console.log("Login incorrecto. Error: " + error);
                    setIsFetching(false);
                    if (error === 401) {
                        setError(true);
                    }
                });
        };
        fetchData();
    };

    return (
        <div className={"form_full"}>
            <div className="field_login">
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    autoComplete="email"
                    type="email"
                    data-test="email"
                    value={email}
                    autoFocus
                    onChange={(event) => setEmail(event.target.value)}
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            // Do code here
                            handleSubmit();
                        }
                    }}/>
            </div>
            <div className="field_login">
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    autoComplete="password"
                    type="password"
                    data-test="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            // Do code here
                            handleSubmit();
                        }
                    }}
                />

            </div>
            {error ? <Typography color="error">User and/or password are not correct.</Typography> : null}
            {isFetching ?
                <CircularProgress/> :
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}

                >
                    Sign in
                </Button>
            }
        </div>
    );
}

export default withRouter(LoginForm);
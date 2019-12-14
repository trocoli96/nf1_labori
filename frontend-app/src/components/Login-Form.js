import React, {useContext, useRef, useState} from 'react';
import {withRouter} from 'react-router-dom';
import '../App.css';
import {Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {saveToken} from "../utils/localStorage";
import {HOME, PROFILE} from "../routes/routes";
import {AuthContext} from "../utils/AuthFront/context";
import CircularProgress from '@material-ui/core/CircularProgress';

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
            const url = "http://127.0.0.1:80/api/login";
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
                    history.push(PROFILE);
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

    const emailRef = useRef();
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
                    inputRef={emailRef}
                    onChange={(event) => setEmail(event.target.value)}/>
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
                    onChange={(event) => setPassword(event.target.value)}/>
            </div>
            {error ? <Typography color="error">El usuario y/o la contraseña son incorrectos.</Typography> : null}
            {isFetching ?
                <CircularProgress/> :
                <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                    Sign in
                </Button>
            }
        </div>
    );
}

export default withRouter(LoginForm);
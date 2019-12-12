import React, {useContext, useState} from 'react';
import {withRouter} from 'react-router-dom';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {saveToken} from "../utils/localStorage";
import {HOME} from "../routes/routes";
import {AuthContext} from "../utils/AuthFront/context";

function LoginForm({history}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // recogemos lo proveído por el context
    const {dispatch} = useContext(AuthContext);

    const data = {
        email: email,
        password: password,
    };

    const handleSubmit = (event) => {
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
                    history.push(HOME);
                }).catch(error => {
                    console.log("Login incorrecto. Error: " + error);
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
                        autoFocus
                        type="email"
                        data-test="email"
                        value={email}
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
                        autoFocus
                        type="password"
                        data-test="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}/>
                </div>
                <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                    Sign in
                </Button>
        </div>
    );
}

export default withRouter(LoginForm);
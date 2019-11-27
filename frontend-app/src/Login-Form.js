import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


function LoginForm ({history}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const data = {
        email : email,
        password : password,
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const fetchData = async () => {
            const url = "http://127.0.0.1:80/api/login";
            const options = {
                method: "POST",
                body: JSON.stringify(data),
                headers: new Headers({
                    Accept: "application/json",
                    "Content-type":
                        "application/json"
                }),
                mode: "cors"
            };
            return fetch(url, options)
                .then(response => {
                    if (response.status === 200)
                    {
                        console.log(response);
                        //return <Redirect to={"s/Signup"}/>;
                        //alert(response.statusText);
                        //return response.json();
                        history.push('/Profile');
                    }
                    //return Promise.reject(response.status);
                }).catch(error => {
                    setError(error);
                    console.log(error);
                    alert(error);
                });
        };
        fetchData();
    };
    return (
        <div className={"form_full"}>
            <form className="login-form" onSubmit={handleSubmit}>
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
                        onChange={(event) => setPassword(event.target.value)} />
                </div>
                <Button variant="contained" color="primary" type="submit" >
                    Sign in
                </Button>
            </form>
        </div>
    );
};
export default withRouter(LoginForm);
import React, {useState} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        const fetchdata = async () => {
            const url = "http://127.0.0.1:80/api/login";
            const options = {
                method: "POST",
                body: JSON.stringify(useState),
                headers: new Headers({
                    Accept: "application/json",
                    "Content-type":
                        "application/json"
                }),
                mode: "cors"
            };
            return fetch(url, options)
                .then(response => {
                    if (response.status === 201) {
                        alert(response.statusText);
                        return response.json();
                    }
                    return Promise.reject(response.status);
                }).catch(error => {
                    setError(error);
                    alert(error);
                });
        };
        fetchdata();
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
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus>
                        <input
                            type="email" data-test="email" value={email}
                            onChange={(event) => setEmail(event.target.value)}/>
                    </TextField>
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
                    >
                        <input type="password" data-test="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </TextField>
                </div>
                <Button variant="contained" color="primary" type="submit" onclick >
                    Sign in
                </Button>
            </form>
        </div>
    );
};
export default LoginForm;
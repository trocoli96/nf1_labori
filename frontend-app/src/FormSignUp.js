import React, {useState} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const SignUpForm = () => {
    const [first_name, setName]= useState('f');
    const [last_name, setLastName]= useState('s');
    const [email, setEmail] = useState('@');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const data = {

        first_name: first_name,

        last_name: last_name,

        email: email,

        password: password,
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const fetchdata = async () => {
            const url = "http://127.0.0.1:80/api/user";
            const options = {
                method: "POST",
                body: JSON.stringify(data),
                headers: new Headers({
                    Accept: "application/json",
                    "Content-type":"application/json",
                    'Access-Control-Allow-Headers': 'Authorization'
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
        fetchdata()
    };
    return (
        <div className={"login-form_full"}>

            <form className="login-form" onSubmit={handleSubmit}>
                <div className="field_login">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="first_name"
                        label="Nombre"
                        name="first_name"
                        autoComplete="Nombre"
                        autoFocus
                        type="text" value={first_name}
                        onChange={event => setName(event.target.value)}/>


                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="last_name"
                        label="Apellido"
                        name="last_name"
                        autoComplete="apellido"
                        autoFocus

                        type="text" value={last_name}
                        onChange={event => setLastName(event.target.value)}/>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus

                        type="email" data-test="email" value={email}
                        onChange={event => setEmail(event.target.value)}/>

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
                        type="password" data-test="password" value={password} onChange={event => setPassword(event.target.value)} />

                </div>
                <Button variant="contained" color="primary" type="submit" onSubmit={event => setPassword(event.target.value)}>
                    Sign in
                </Button>
            </form>

        </div>
    );
};
export default SignUpForm ;

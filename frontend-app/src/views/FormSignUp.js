/* BASIC STUFF */
import React, {useContext, useState} from 'react';
import {saveToken} from "../utils/localStorage";
import {AuthContext} from "../utils/AuthFront/context";

/* ROUTER & ROUTES */
import {Link, withRouter} from 'react-router-dom';
import {PROFILE, LOGIN} from "../routes/routes";

/* COMPONENTS & STYLES */
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useStyles} from '../styles/styles';

function SignUpForm({history}) {

    const [first_name, setName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // states para activar los warnings si el usuario se deja algo por rellenar
    const [thereIsNoName, setThereIsNoName] = useState(false);
    const [thereIsNoSurname, setThereIsNoSurname] = useState(false);
    const [thereIsNoEmail, setThereIsNoEmail] = useState(false);
    const [isShortPassword, setIsShortPassword] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(false);

    const data = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
    };

    // recogemos lo proveído por el context
    const {dispatch} = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(false);

        // revisamos que los campos están bien rellenados
        let isThereAnyError = false;

        if (data.first_name.trim().length === 0) {
            setThereIsNoName(true);
            isThereAnyError = true;
        }
        if (data.last_name.trim().length === 0) {
            setThereIsNoSurname(true);
            isThereAnyError = true;
        }
        if (data.email.trim().length === 0) {
            setThereIsNoEmail(true);
            isThereAnyError = true;
            // TODO: más que validar que haya algo escrito, habria que validar que tiene el formato correcto de un email
        }
        if (data.password.length < 8) {
            setIsShortPassword(true);
            isThereAnyError = true;
        }

        // si hay uno o más errores, paramos aquí la ejecución y mostraremos los avisos
        if (isThereAnyError) return;

        const fetchdata = async () => {
            setIsFetching(true);
            const url = "http://api.labori-app.xyz/api/user";
            const options = {
                method: "POST",
                body: JSON.stringify(data),
                headers: new Headers({
                    Accept: "application/json",
                    "Content-type": "application/json",
                    'Access-Control-Allow-Headers': 'Authorization'
                }),
                mode: "cors"
            };
            return fetch(url, options)
                .then(response => {
                    if (response.status >= 200 && response.status < 400) {
                        return response.json();
                    } else {
                        return Promise.reject(response.status);
                    }
                }).then(response => {
                    console.log("Registro correcto, guardamos token en localStorage y state, y redirigimos.");
                    saveToken(response);
                    dispatch({type: "SAVE_CURRENT_TOKEN_ON_STATE"});
                    setIsFetching(false);
                    history.push(PROFILE);
                })
                .catch(error => {
                    console.log("Error al hacer el signup: " + error);
                    setError(true);
                    setIsFetching(false);
                });
        };
        fetchdata()
    };

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paperSignUp}>
                <Avatar className={classes.avatarSignUp}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.formSignUp} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
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
                                onChange={event => {
                                    setName(event.target.value);
                                    setThereIsNoName(false);
                                }}
                            />
                            {thereIsNoName ?
                                <Typography color="error">Please enter your first name.</Typography> : null}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="last_name"
                                label="Apellido"
                                name="last_name"
                                autoComplete="apellido"
                                type="text" value={last_name}
                                onChange={event => {
                                    setLastName(event.target.value);
                                    setThereIsNoSurname(false);
                                }}
                            />
                            {thereIsNoSurname ?
                                <Typography color="error">Please enter your last name.</Typography> : null}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                type="email" data-test="email" value={email}
                                onChange={event => {
                                    setEmail(event.target.value);
                                    setThereIsNoEmail(false);
                                }}
                            />
                            {thereIsNoEmail ? <Typography color="error">Please enter your email.</Typography> : null}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                autoComplete="current-password"
                                type="password" data-test="password" value={password} onChange={event => {
                                setPassword(event.target.value);
                                setIsShortPassword(false);
                            }}
                            />
                            {isShortPassword ? <Typography color="error">Password is too short.</Typography> : null}
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                        <Grid item xs={12}>
                            { error ? <Typography color="error">There was an error when signing up.</Typography> : null}
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        {isFetching ?
                                <CircularProgress/>
                            :
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submitSignUp}
                                >
                                    Sign Up
                                </Button>
                            </Grid>
                        }
                    </Grid>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to={LOGIN} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};


export default withRouter(SignUpForm);
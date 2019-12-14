import React, {useContext, useState} from 'react';
import {withRouter} from 'react-router-dom';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {PROFILE} from "../routes/routes";
import {saveToken} from "../utils/localStorage";
import {AuthContext} from "../utils/AuthFront/context";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignUpForm ({history}) {

    const [first_name, setName]= useState('');
    const [last_name, setLastName]= useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // states para activar los warnings si el usuario se deja algo por rellenar
    const [thereIsNoName, setThereIsNoName] = useState(false);
    const [thereIsNoSurname, setThereIsNoSurname] = useState(false);
    const [thereIsNoEmail, setThereIsNoEmail] = useState(false);
    const [isShortPassword, setIsShortPassword] = useState(false);


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

        // revisamos que los campos están bien rellenados
        // returnamos el aviso si no
        if (data.first_name.trim().length === 0) {
            return setThereIsNoName(true);
        }
        if (data.last_name.trim().length === 0) {
            return setThereIsNoSurname(true);
        }
        if (data.email.trim().length === 0) {
            return setThereIsNoEmail(true);
            // TODO: más que validar que haya algo escrito, habria que validar que tiene el formato correcto de un email
        }
        if (data.password.length < 8) {
            return setIsShortPassword(true);
        }


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
                    if (response.status >= 200 && response.status < 400) {
                        return response.json();
                    } else {
                        return Promise.reject(response.status);
                    }
                }).then(response => {
                    console.log("Registro correcto, guardamos token en localStorage y state, y redirigimos.");
                    console.log(response.access_token);
                    saveToken(response.access_token);
                    // dispatch({type: "SAVE_CURRENT_TOKEN_ON_STATE"});
                    // TODO: ENVIAR TOKEN DIRECTAMENTE AL DISPATCH???
                    history.push(PROFILE);
                })
                .catch(error => {
                    console.log("Error al hacer el signup: " + error);
                });
        };
        fetchdata()
    };

        const classes = useStyles();

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
                                {thereIsNoName ? <Typography color="error">Please enter your first name.</Typography> : null}
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
                                {thereIsNoSurname ? <Typography color="error">Please enter your last name.</Typography> : null}
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
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
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
//Brais

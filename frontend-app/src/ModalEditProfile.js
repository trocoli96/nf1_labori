import React, {useReducer, useEffect} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

function ModaleditProfile () {

    const SET_PROFILE = 'SET_PROFILE';
    const SET_ERROR = 'SET_ERROR';

    const initialState = {
        user: undefined,
    };

    const EditUserReducer = (state = initialState, action) => {
        const newState = {...state};
        const {type} = {...action};

        if (type === SET_PROFILE) {
            newState.user = action.user;
        }
        if (type === SET_ERROR) {
            newState.error = action.error;
        }
        return newState;
    };
        const [state, dispatch] = useReducer(EditUserReducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://127.0.0.1/api/user/${id}`;
            const options = {
                method: 'GET',
                headers: new Headers({
                    Accept: 'application/json',
                    'Access-Control-Allow-Headers': 'Authorization',
                    'Content-Type': 'application/json',
                }),
                mode: 'cors',
            };

            return fetch(url, options)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    return Promise.reject(response.status);
                })
                .then(data => {
                    debugger;
                    dispatch({ type: SET_PROFILE, user : data });
                })
                .catch(error => dispatch({ type: SET_ERROR, error: true }));
        };

        fetchData();
    }, []);

    function SaveNew() {
        const fetchData = async () => {
            const url = `http://127.0.0.1/api/user/${id}`;
            const options = {
                method: 'POST',
                headers: new Headers({
                    Accept: 'application/json',
                    'Access-Control-Allow-Headers': 'Authorization',
                    'Content-Type': 'application/json',
                body: json,
                }),
                mode: 'cors',
            };

            return fetch(url, options)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    return Promise.reject(response.status);
                })
                .then(data => {
                    debugger;
                    dispatch({ type: SET_PROFILE, user : data });
                })
                .catch(error => dispatch({ type: SET_ERROR, error: true }));
        };

        fetchData();

    };



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
                                type="text" value={state.first_name}
                                onChange={event => setName(event.target.value)}
                            />
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
                                autoFocus

                                type="text" value={state.last_name}
                                onChange={event => setLastName(event.target.value)}
                            />
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
                                autoFocus

                                type="email" data-test="email" value={state.email}
                                onChange={event => setEmail(event.target.value)}
                            />
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
                        Save
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
}

export default ModaleditProfile;

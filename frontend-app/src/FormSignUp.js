import React, {useState} from 'react';
import './App.css';
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

const SignUpForm = ({history}) => {
    const [first_name, setName]= useState('');
    const [last_name, setLastName]= useState('');
    const [email, setEmail] = useState('');
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
                    if (response.status >= 200 && response.status < 400) {
                        console.log("Registro correcto.");
                        history.push('/Profile');
                    } else {
                        return Promise.reject(response.status);
                    }
                }).catch(error => {
                    setError(error);
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

                                    type="text" value={last_name}
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

                                    type="email" data-test="email" value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
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
                                    autoFocus
                                    type="password" data-test="password" value={password} onChange={event => setPassword(event.target.value)}
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


export default SignUpForm;
//Brais

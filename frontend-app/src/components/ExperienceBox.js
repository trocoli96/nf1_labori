/* BASIC STUFF */
import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from "../utils/AuthFront/context";
import getToken from "../utils/tokenHelper";

/* COMPONENTS & STYLES */
import ButtonPopup from "../components/Buttonpopup";
import '../App.css';
import {CircularProgress, Container} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: 2,
        textAlign: 'center',
        color: 'blue',
    },
    profile: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        width: '100%',
        margin: 0,
    },
    photocover: {
        textAlign:'center',
        marginBottom:'20%',
    },
    icon: {
        display: 'inline-flex',
    },
    userinfo: {
        paddingTop: '10px',
        textAlign: 'center',
    },
    gridfeed: {
        padding: '0px !important',
    },
    text:{
        fontSize: '90%',
        lineHeight:'2px',
    },
    title:{
        lineHeight:'2px',
    }
}));

function ExperienceBox() {

    const classes = useStyles();

    // recogemos lo proveído por el context
    const {dispatch} = useContext(AuthContext);  // no incluyo state porque no lo estamos usando. reañadir si hiciera falta

    // creamos los hooks de estado con los datos del usuario
    const [userData, setUserData] = useState({
        "first_name": null,
        "last_name": null,
        "email": null
    });

    // useEffect para coger los datos del usuario al cargar
    useEffect(() => {
        const fetchData = async () => {
            const url = `http://127.0.0.1/api/experience/?token=` + getToken();
            const options = {
                method: 'GET',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }),
                mode: 'cors'
            };

            return fetch(url, options)
                .then(response => {
                    if (response.status >= 200 && response.status < 400) {
                        return response.json();
                    } else {
                        return Promise.reject(response.status);
                    }
                })
                .then(data => {
                    return setUserData({
                        "first_name": data.first_name,
                        "last_name": data.last_name,
                        "email": data.email
                    });
                })
                .catch(error => {
                    console.log("Error al hacer el fetch de @me. Error: " + error);
                    if (error === 401) {
                        console.log("Token inválido, probablemente caducado. Hacemos logout.");
                        dispatch({type: "DO_LOGOUT"});

                    }
                });
        };

        fetchData();

    }, [dispatch]);


    return (<AuthContext.Consumer>
        {props =>
            <Grid container spacing={6} className={classes.profile}>
                <Grid item xs={12} className={classes.gridfeed}>
                    <Paper className={classes.userinfo}>
                        <Container className={classes.photocover}>
                            <Avatar className={classes.icon}>H</Avatar>
                        </Container>
                        <h3 className={classes.title}>{userData.first_name ? userData.first_name : <CircularProgress size={20}/>} {userData.last_name ? userData.last_name : <CircularProgress size={20}/>}</h3>
                        <p className={classes.text}>{userData.email ? userData.email : <CircularProgress/>}</p>
                        <Divider/>
                        <p>Saved Items</p>
                    </Paper>
                </Grid>
            </Grid>
        }
    </AuthContext.Consumer>)
}

export default ExperienceBox;
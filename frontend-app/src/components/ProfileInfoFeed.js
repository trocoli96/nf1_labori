/* BASIC STUFF */
import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from "../utils/AuthFront/context";
import getToken from "../utils/tokenHelper";

/* COMPONENTS & STYLES */
import ButtonPopup from "../components/Buttonpopup";
import '../App.css';
import {Container} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';



const useStyles = makeStyles(theme =>({
    paper: {
        padding: 2,
        textAlign: 'center',
        color: 'blue',
    },
    profile: {
        padding: theme.spacing(5),
        width:'100%',
        margin:0,
    },
    photocover: {
        marginLeft: theme.spacing(11),
    },
    userinfo: {
        paddingTop:'10px',
        textAlign: 'center',
    },
    gridfeed:{
        padding: '0px !important',
    }
}));

function ProfileInfoFeed() {

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
            const url = `http://127.0.0.1/api/users/?token=` + getToken();
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
                            <Container>
                                <Avatar className={classes.photocover}>H</Avatar>
                            </Container>
                            <h3>{userData.first_name ? userData.first_name : "?"} {userData.last_name ? userData.last_name : "?"}</h3>
                            <p>{userData.email ? userData.email : "?"}</p>
                            <div>
                                <ButtonPopup/>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
        }
    </AuthContext.Consumer>)
}

export default ProfileInfoFeed;
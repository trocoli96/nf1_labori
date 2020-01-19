/* BASIC STUFF */
import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from "../utils/AuthFront/context";
import getToken from "../utils/tokenHelper";

/* COMPONENTS & STYLES */
import {useStyles} from '../styles/styles';
import ButtonPopup from "../components/Buttonpopup";
import '../styles/App.css';
import {CircularProgress, Container} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';




function Profilepage() {

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
            <Container className={classes.rootProfile} maxWidth={'xl'}>
                <Grid container spacing={6} className={classes.profilePaper}>
                    <Grid item xs={8}>
                        <Container className={classes.photocoverProfile}> </Container>
                        <Paper className={classes.userinfoProfile}>
                            <h3>{userData.first_name ? userData.first_name : <CircularProgress size={20}/>} {userData.last_name ? userData.last_name : null}</h3>
                            <p>{userData.email ? userData.email : <CircularProgress size={20}/>}</p>
                        <div>
                            <ButtonPopup setUserData={setUserData}/>
                        </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        }
    </AuthContext.Consumer>)
}

export default Profilepage;

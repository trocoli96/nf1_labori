/* BASIC STUFF */
import React, {useState, useEffect, useContext} from 'react';
import {useParams, withRouter} from 'react-router-dom';
import {AuthContext} from "../utils/AuthFront/context";
import getToken from "../utils/tokenHelper";
import {PAGE404} from "../routes/routes";

/* COMPONENTS & STYLES */
import ExperiencesList from "../components/ExperiencesList";
import {useStyles} from '../styles/styles';
import ButtonPopup from "../components/Buttonpopup";
import AddExperienceButton from "../components/AddExperienceButton";
import PeopleWhoMaybeYouKnow from "../components/PeopleWhoMaybeYouKnow";
import '../styles/App.css';
import {CircularProgress, Container} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Router, Redirect} from "react-router-dom";


function Profilepage(props) {

    const classes = useStyles();

    // recogemos lo proveído por el context
    const {dispatch} = useContext(AuthContext);  // no incluyo state porque no lo estamos usando. reañadir si hiciera falta

    // creamos los hooks de estado con los datos del usuario
    const [userData, setUserData] = useState({
        "first_name": null,
        "last_name": null,
        "email": null,
        "followers": null,
        "followings": null
    });

    const [updateExperiences, setUpdateExperiences] = useState(true);

    // useEffect para coger los datos del usuario al cargar
    useEffect(() => {

        const fetchData = async () => {
            const url = `http://127.0.0.1/api/user/`;
            const options = {
                method: 'GET',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken(),
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
                        "email": data.email,
                        "followers": data.followers,
                        "followings": data.followings
                    });
                })
                .catch(error => {
                    console.log("Error al hacer el fetch de usuario. Error: " + error);
                    if (error === 401) {
                        console.log("Token inválido, probablemente caducado. Hacemos logout.");
                        return dispatch({type: "DO_LOGOUT"});
                    }
                });
        };

        fetchData();

    }, [dispatch]);


    return (<AuthContext.Consumer>
        {props =>
            <Container className={classes.rootProfile} maxWidth={'xl'}>
                <Grid container spacing={3}>
                    <Grid container className={classes.profilePaper}>
                        <Grid item xs={12} md={8}>
                            <Container className={classes.photocoverProfile}> </Container>
                            <Paper className={classes.userinfoProfile}>
                                <h3>{userData.first_name ? userData.first_name :
                                    <CircularProgress size={20}/>} {userData.last_name ? userData.last_name : null}</h3>
                                <p className={classes.subtitle}>{userData.followers} Followers - {userData.followings} Followings</p>
                                <div>{userData.email ? <p>{userData.email}</p> : <CircularProgress size={20}/>}</div>
                                <div>
                                    <ButtonPopup setUserData={setUserData}/>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container spacing={6} className={classes.experience}>
                        <Grid item xs={12} md={8}>
                            <Paper className={classes.userexperience}>
                                <Grid container spacing={5}>
                                    <Grid item xs={6} style={{paddingLeft: 50}}>
                                        <h3>Experience</h3>
                                    </Grid>
                                    <Grid container item xs={6} justify="flex-end">
                                        <AddExperienceButton setUpdateExperiences={setUpdateExperiences}/>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={5}>
                                    <Grid item xs={12}>
                                        <ExperiencesList updateExperiences={updateExperiences}
                                                         setUpdateExperiences={setUpdateExperiences}/>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        }
    </AuthContext.Consumer>)
}

export default withRouter(Profilepage);

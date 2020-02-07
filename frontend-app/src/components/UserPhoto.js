/* BASIC STUFF */
import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from "../utils/AuthFront/context";
import getToken from "../utils/tokenHelper";

/* COMPONENTS & STYLES */
import '../styles/App.css';
import {CircularProgress, Container} from "@material-ui/core";
import {useStyles} from '../styles/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ButtonPopup from "./Buttonpopup";
import AddExperienceButton from "./AddExperienceButton";
import ExperiencesList from "./ExperiencesList";

function UserPhoto(props) {

    const classes = useStyles();

    const size=props.size;

    // recogemos lo proveído por el context
    const {dispatch} = useContext(AuthContext);  // no incluyo state porque no lo estamos usando. reañadir si hiciera falta

    // creamos los hooks de estado con los datos del usuario
    const [userPic, setUserPic] = useState("");

    // useEffect para coger los datos del usuario al cargar
    useEffect(() => {

        const fetchData = async () => {
            const url = `http://api.labori-app.xyz/api/user/`;
            const options = {
                method: 'GET',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken()
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
                    console.log(data['profile_photo']);
                    return setUserPic(data['profile_photo']);
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
        { props =>
            <Avatar src={userPic} className={size}/>
        }
    </AuthContext.Consumer>);
}

export default UserPhoto;
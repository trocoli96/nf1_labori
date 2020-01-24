/* BASIC STUFF */
import React, {useState, useEffect, useContext} from "react";
import getToken from "../utils/tokenHelper";
import {AuthContext} from "../utils/AuthFront/context";

/* COMPONENTS & STYLES */
import {useStyles} from '../styles/styles';
import {Grid} from "@material-ui/core";
import SingleExperience from "./SingleExperience";

function ExperiencesList(props) {

    const classes = useStyles();

    // recogemos lo proveído por el context
    const {dispatch} = useContext(AuthContext);  // no incluyo state porque no lo estamos usando. reañadir si hiciera falta

    const [experiences, setExperiences] = useState([]);

    // useEffect para hacer fetch de la experiencia laboral
    useEffect(() => {

        if (!props.updateExperiences) return;

        const fetchData = async () => {
            const url = 'http://127.0.0.1/api/experiences?token=' + getToken();
            const options = {
                method: 'GET',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }),
                mode: 'cors'
            };

            fetch(url, options)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        Promise.reject(response.status);
                    }
                })
                .then(data => {
                    props.setUpdateExperiences(false);
                    return setExperiences(data);
                })
                .catch(error => {
                    if (error === 401) {
                        props.setUpdateExperiences(false);
                        console.log("Token inválido, probablemente caducado. Hacemos logout.");
                        return dispatch({type: "DO_LOGOUT"});
                    }
                    props.setUpdateExperiences(false);
                    return console.log(error);
                })
        };

        fetchData();

    }, [props.updateExperiences]);


    return (
        <Grid className={classes.experiencebox}>
            {experiences !== undefined ?
                experiences.map(experience => {
                    return (
                        <SingleExperience experience={experience} key={experience.id} setUpdateExperiences={props.setUpdateExperiences}/>
                    )
                })
                :
                <p>No experiences. Add your first one!</p>
            }
        </Grid>
    )
}

export default ExperiencesList;


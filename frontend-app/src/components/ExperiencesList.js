import React, {useState, useEffect} from "react";
import {Grid} from "@material-ui/core";
import getToken from "../utils/tokenHelper";

function ExperiencesList() {

    const [experiences, setExperiences] = useState([]);


    // useEffect para hacer fetch de la experiencia laboral
    useEffect(() => {

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
                    console.log(data);
                    return setExperiences(data);
                })
                .catch(error => {
                    return console.log(error);
                })
        };

        fetchData();

    }, []);


    return (
        <Grid container>
            {experiences.length !== 0 ?
                experiences.map(experience => {
                return (
                    <Grid item xs={12} key={experience.id}>
                        <p>{experience.title}</p>
                        <p>{experience.company}</p>
                        <p>{experience.start_date} to {experience.end_date}</p>
                        <p>{experience.location}</p>
                        <p>{experience.description}</p>
                        <hr/>
                    </Grid>
                )
            })
            :
            <p>No experiences. Add your first one!</p>}
        </Grid>
    )
}

export default ExperiencesList;


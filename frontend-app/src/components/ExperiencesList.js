import React, {useState, useEffect} from "react";
import {useStyles} from '../styles/styles';
import {Grid} from "@material-ui/core";
import getToken from "../utils/tokenHelper";

import BusinessIcon from '@material-ui/icons/Business';
import Avatar from "@material-ui/core/Avatar";

function ExperiencesList(props) {

    const classes = useStyles();

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
                    props.setUpdateExperiences(false);
                    return console.log(error);
                })
        };

        fetchData();

    }, [props.updateExperiences]);


    return (
        <Grid className={classes.experiencebox}>
            {experiences.length !== 0 ?
                experiences.map(experience => {
                return (
                    <Grid item xs={12} key={experience.id}>
                        <Grid item xs={10} className={classes.experienceheader}>
                            <div style={{padding: 15}}>
                            <Avatar variant="square" style={{padding: 5}}><BusinessIcon/></Avatar>
                            </div>
                            <span className={classes.experienceheaderinfo}>
                                <h3 className={classes.title}>{experience.title}</h3>
                                <p className={classes.title}>{experience.company}</p>
                                <p className={classes.text}>{experience.start_date} to {experience.end_date}</p>
                                <p className={classes.text}>{experience.location}</p>
                            </span>
                        </Grid>
                        <Grid item xs={10} className={classes.experiencedescription}>
                            <span>
                            <p>{experience.description}</p>
                            </span>
                        </Grid>
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


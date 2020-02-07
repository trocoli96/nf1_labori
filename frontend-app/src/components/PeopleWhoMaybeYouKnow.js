/*BASIC STUFF */
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../utils/AuthFront/context";
import getToken from "../utils/tokenHelper";

/*STYLES & COMPONENTS*/
import {Grid} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {useStyles} from "../styles/styles";
import {Link} from "react-router-dom";


function PeopleWhoMaybeYouKnow(){

    const classes = useStyles();

    // recogemos lo proveído por el context
    const {dispatch} = useContext(AuthContext);  // no incluyo state porque no lo estamos usando. reañadir si hiciera falta

    const [persons, setPersons] = useState([]);
    const [error, setError] = useState(false);

    // useEffect para hacer fetch de la experiencia laboral
    useEffect(() => {

        const fetchData = async () => {
            const url = 'http://api.labori-app.xyz/api/peoplemaybeyouknow';
            const options = {
                method: 'GET',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken()
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
                     return setPersons(data);
                })
                .catch(error => {
                    if (error === 401) {
                        console.log("Token inválido, probablemente caducado. Hacemos logout.");
                        return dispatch({type: "DO_LOGOUT"});
                    }
                    return console.log(error);
                })
        };

        fetchData();

    }, [dispatch]);

    return(<AuthContext.Consumer>
        {props =>
            <Grid>
                <Grid>
                    <p>People who maybe you know...</p>
                    {persons && persons.map((person) =>
                        <Grid className={classes.peopleyoumaybeknow}>

                            <Link to={`/profile/${person.id}`}>
                                <Avatar style={{backgroundColor: person.color, float: 'left', marginRight: '3px'}}>{person.shortname}</Avatar>
                            </Link>
                            <Link to={`/profile/${person.id}`}>
                                <p style={{paddingTop: '0.5em', color: 'black'}}>{person.first_name} {person.last_name}</p>
                            </Link>

                        </Grid>)
                    }
                </Grid>
            </Grid>
           }
        </AuthContext.Consumer>
    );
}


export default PeopleWhoMaybeYouKnow;
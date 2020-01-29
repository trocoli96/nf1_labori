/*BASIC STUFF */
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../utils/AuthFront/context";
import getToken from "../utils/tokenHelper";

/*STYLES & COMPONENTS*/
import {Grid} from "@material-ui/core";
import {CircularProgress} from "@material-ui/core";
import SinglePost from "./SinglePost";


function PeopleWhoMaybeYouKnow(){


    // recogemos lo proveído por el context
    const {dispatch} = useContext(AuthContext);  // no incluyo state porque no lo estamos usando. reañadir si hiciera falta

    const [persons, setPersons] = useState([]);
    const [error, setError] = useState(false);

    // useEffect para hacer fetch de la experiencia laboral
    useEffect(() => {

        const fetchData = async () => {
            const url = 'http://127.0.0.1/api/peoplemaybeyouknow';
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
                    {persons.data && persons.data.map((person) =>
                        <p>{person.is_following}</p>)
                    }
                </Grid>
            </Grid>
           }
        </AuthContext.Consumer>
    );
}


export default PeopleWhoMaybeYouKnow;
/*BASIC STUFF*/
import React, {useState} from 'react';
import getToken from "../utils/tokenHelper";

/*STYLES*/
import {useStyles} from "../styles/styles";
import Button from "@material-ui/core/Button";


function ButtonFollow (props) {

    const classes = useStyles();

    const [error, setError] = useState(false);
    const [fetching, setIsFetching] = useState(true);

    const follow = (e) => {
        setError(false);
        setIsFetching(true);
        const fetchData = async () => {
            const url = `http://127.0.0.1/api/follow/${props.id}`;
            const options = {
                method: 'POST',
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
                    }
                    return Promise.reject(response.status);
                }).then(data => {
                    setIsFetching(false);
                    props.setFollowed(true);
                }).catch(error => {
                    setError(true);
                    if (error === 401) {
                        setError(true);
                    }
                });
        };
        fetchData();
    };

    return (
        <div className={classes.buttonfollowing}>
        <Button variant="contained" color="primary" onClick={follow}>
            Follow
        </Button>
        </div>
    )
}

export default ButtonFollow;
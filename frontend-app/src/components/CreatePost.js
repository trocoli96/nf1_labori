/* BASIC STUFF */
import React, {useState, useContext, useEffect} from 'react';
import {AuthContext} from "../utils/AuthFront/context";
import getToken from "../utils/tokenHelper";

/* COMPONENTS & STYLES */
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from '@material-ui/core/Button';
import {CircularProgress, Modal, Typography} from "@material-ui/core";


const useStyles = makeStyles(theme =>({
    textfield: {
        background: 'white',
        width: '80%',
        borderColor: 'black',
        marginLeft:'1em',
        marginTop:'1em',
    },
}));

function CreatePost() {

    const classes = useStyles();

    const [post_text, setPostText] = useState('');
    const [error, setError] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [open, setOpen] = useState(false);

    const data = {
        post_text: post_text,
    };

    const post = (e) => {
        setError(false);
        setIsFetching(true);
        const fetchData = async () => {
            const url = `http://127.0.0.1/api/post/?token=` + getToken();
            const options = {
                method: 'POST',
                body: JSON.stringify(data),
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
                    }
                    return Promise.reject(response.status);
                }).then(data => {
                    setIsFetching(false);
                    setOpen(true);
                }).catch(error => {
                    setIsFetching(false);
                    setError(true);
                    if (error === 401) {
                        setError(true);
                    }
                });
        };
        fetchData();
    };

        return (<AuthContext.Consumer>
            {props =>
                <Grid item xs={8}>
                    <TextField
                        variant="outlined"
                        placeholder="Write a post..."
                        className={classes.textfield}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <BorderColorIcon/>
                                </InputAdornment>
                            ),
                        }}
                        onChange={(e) => setPostText(e.target.value)}/>
                    {open ?
                        <Modal open={open}>
                            <p>Congratulations Laborier! Your post has been created!</p>
                            <Button onClick={() => setOpen(false)}>
                                Close
                            </Button>
                        </Modal> : null
                    }
                    {error ?
                        <Typography color="error">There was a problem posting your amazing post!</Typography> : null}
                    {isFetching ?
                        <CircularProgress/> :
                        <Button variant="contained" color="primary" onClick={post}>
                            Post!
                        </Button>
                    }
                </Grid>
            }
        </AuthContext.Consumer>)
    }

export default CreatePost;
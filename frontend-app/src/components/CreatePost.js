/* BASIC STUFF */
import React, {useState} from 'react';
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
        width: '100%',
        borderColor: 'black',
        paddingLeft: 10,
        marginTop:0,
        borderRadius: 0,
    },
    paper: {
        marginTop: 200,
        marginLeft: 600,
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    buttonClose: {
        marginLeft: 100,
    },
    title: {
        marginTop: 0,
        marginBottom: 0,
        paddingLeft: 10,
    },
    postbutton:{
        paddingLeft: '50%' ,
        paddingRight: '50%',
    }
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

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                    handleOpen();
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
                    <Grid item xd={8}>
                        <span className={classes.title}>Create a post</span>
                        <TextField
                            variant="outlined"
                            placeholder="Share your experience with other Laboriers..."
                            multiline={true}
                            rows={3}
                            rowsMax={3}
                            className={classes.textfield}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BorderColorIcon/>
                                    </InputAdornment>
                                ),
                            }}
                            onChange={(e) => setPostText(e.target.value)}/>

                        {error ?
                            <Typography color="error">There was a problem posting your amazing post!</Typography> : null}
                        {isFetching ?
                            <CircularProgress/> :
                            <Button variant="contained" color="primary" onClick={post} className={classes.postbutton}>
                                Post!
                            </Button>
                        }
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={open}
                            onClose={handleClose}
                        >
                            <div className={classes.paper}>
                                <h2 id="simple-modal-title">Congratulations!</h2>
                                <p id="simple-modal-description">
                                    Well done Laborier! You successfully posted your first post!
                                </p>
                                <Button variant="contained" color="primary" onClick={handleClose} className={classes.buttonClose}>
                                    Close
                                </Button>
                            </div>
                        </Modal>
                    </Grid>
                </Grid>
            }
        </AuthContext.Consumer>)
    }

export default CreatePost;
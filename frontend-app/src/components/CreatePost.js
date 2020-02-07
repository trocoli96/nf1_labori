/* BASIC STUFF */
import React, {useState, useContext} from 'react';
import {AuthContext} from "../utils/AuthFront/context";
import getToken from "../utils/tokenHelper";
import {PostContext} from "../utils/postContext";
import {SET_FLAG} from "../utils/postsReducer";


/* COMPONENTS & STYLES */
import {useStyles} from '../styles/styles';
import '../styles/App.css';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from '@material-ui/core/Button';
import {CircularProgress, Typography} from "@material-ui/core";


function CreatePost() {

    const classes = useStyles();

    const [post_text, setPostText] = useState('');
    const [error, setError] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    const {postState, postDispatch} = useContext(PostContext);

    const data = {
        post_text: post_text,
    };
    const post = (e) => {
        setError(false);
        setIsFetching(true);
        const fetchData = async () => {
            const url = `http://api.labori-app.xyz/api/post/?token=` + getToken();
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
                    setPostText('');
                    postDispatch({type: SET_FLAG})
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

    return (
        <AuthContext.Consumer>
            {props =>
                <PostContext.Consumer>
                    {props =>
                        <Grid item xs={11}>
                            <Grid item xd={10} className={classes.createpost}>
                                <TextField
                                    variant="outlined"
                                    placeholder="Share your thoughts with other Laboriers..."
                                    multiline={true}
                                    rows={3}
                                    rowsMax={3}
                                    value={post_text}
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
                                    <Typography color="error">There was a problem posting your amazing
                                        post!</Typography> : null}
                                {isFetching ?
                                    <CircularProgress/> :
                                    <Button variant="contained" color="primary" onClick={post}
                                            className={classes.postbutton}>
                                        Post!
                                    </Button>
                                }
                            </Grid>
                        </Grid>
                    }
                </PostContext.Consumer>
            }
        </AuthContext.Consumer>)
}

export default CreatePost;
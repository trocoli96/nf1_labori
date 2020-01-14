/* BASIC STUFF */
import React, {useReducer, useEffect} from 'react';
import {AuthContext} from "../utils/AuthFront/context";

/* COMPONENTS & STYLES */
import '../App.css';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme =>({
    postslist:{
        marginTop: 30,
        marginLeft: 30,
        width: '100%',
    },
    singlepost:{
        marginBottom: 20,
    }
}));


function FeedPosts() {

    const classes = useStyles();

    const SET_POSTS_DATA = 'SET_POSTS_DATA';
    const SET_ERROR = 'SET_ERROR';

    const initialstate ={
        postsData: [],
        error:false,
    };

    const postsReducer = (state = initialstate, action) => {
        const newState = {...state};
        const { type } = {...action};

        if (type === SET_POSTS_DATA){
            newState.postsData = action.data;
        }
        if (type === SET_ERROR){
            newState.error = action.error;
        }
        return newState;
    };

    const [state, dispatch] = useReducer(postsReducer, initialstate);

    useEffect(() => {
    const fetchData = async () => {
        const url = 'http://127.0.0.1/api/posts?page=1';
        const options = {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }),
            mode: 'cors',
        };

        return fetch(url, options)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                return Promise.reject(response.status);
            })
            .then(data => {
                dispatch({ type: SET_POSTS_DATA, data: data.data });

            })
            .catch(error => dispatch({ type: SET_ERROR, error:true }));
    };

    dispatch({ type: SET_ERROR, error: false});

        fetchData();

    }, []);
    return (<AuthContext.Consumer>
        {props =>
            <Grid item xs={11}>
                <Grid item xd={10} className={classes.postslist}>
                        {state.postsData && state.postsData.map(data => (
                            <Paper className={classes.singlepost}>
                                {data.post_text}
                            </Paper>
                        ))}
                </Grid>
            </Grid>

        }
    </AuthContext.Consumer>
    );
}

export default FeedPosts;

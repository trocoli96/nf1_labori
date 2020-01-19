/* BASIC STUFF */
import React from 'react';
import {AuthContext} from "../utils/AuthFront/context";
import {useStyles} from '../styles/styles';

/* COMPONENTS & STYLES */
import '../styles/App.css';
import Grid from "@material-ui/core/Grid";
import {Container} from "@material-ui/core";
import CreatePost from "../components/CreatePost";
import ProfileInfoFeed from "../components/ProfileInfoFeed";
import FeedPosts from "../components/FeedPosts";


function FeedPage(){

    const classes = useStyles();

    return (<AuthContext.Consumer>
        {props =>
            <Container className={classes.rootFeed} maxWidth={'xl'}>
                <div className={classes.columnFeedSides}>
                    <ProfileInfoFeed/>
                </div>
                <div className={classes.columnFeedCenter}>
                    <Grid container spacing={6}>
                    <CreatePost/>
                    </Grid>
                    <Grid container spacing={6}>
                    <FeedPosts/>
                    </Grid>
                </div>

            <div className={classes.columnFeedSides}>
            </div>
            </Container>
        }
    </AuthContext.Consumer>)
}


export default FeedPage;


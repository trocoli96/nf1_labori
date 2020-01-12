/* BASIC STUFF */
import React from 'react';
import {AuthContext} from "../utils/AuthFront/context";

/* COMPONENTS & STYLES */
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';
import Grid from "@material-ui/core/Grid";
import {Container} from "@material-ui/core";
import CreatePost from "../components/CreatePost";

const useStyles = makeStyles(theme =>({
    root: {
        background: 'rgb(241,238,238)',
        height:'2000px',
        width:'100%',
        paddingTop: '30px',
        paddingLeft: 200 ,
        paddingRight: 200 ,
    },
    columnCenter:{
        float: 'left',
        width: '50%',
        backgroundColor: 'white',
        height: '60em',
    },
    columnSides: {
        float: 'left',
        width: '25%',
        backgroundColor: 'white',
        height: '60em',
    },

}));

function FeedPage(){

    const classes = useStyles();

    return (<AuthContext.Consumer>
        {props =>
            <Container className={classes.root} maxWidth={'xl'}>
                <div className={classes.columnSides}>
                </div>

                <div className={classes.columnCenter}>
                            <Grid container spacing={6} className={classes.profile}>
                                <CreatePost/>
                            </Grid>
                        </div>

            <div className={classes.columnSides}>
            </div>
            </Container>
        }
    </AuthContext.Consumer>)
}


export default FeedPage;


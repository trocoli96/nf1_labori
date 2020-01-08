/* BASIC STUFF */
import React from 'react';
import {AuthContext} from "../utils/AuthFront/context";

/* COMPONENTS & STYLES */
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import InputAdornment from "@material-ui/core/InputAdornment";
import {Container} from "@material-ui/core";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme =>({
    textfield: {
        background: 'white',
        width: '80%',
        borderColor: 'black',
        marginLeft:'1em',
        marginTop:'1em',
    },
    root: {
        background: 'rgb(241,238,238)',
        height:'2000px',
        width:'100%',
        paddingTop: '30px',
    },
    columnCenter:{
        float: 'left',
        width: '50%',
        backgroundColor: 'grey',
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
                                    />
                                    <Button variant="contained" color="primary">
                                    Primary
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>

            <div className={classes.columnSides}>
            </div>
            </Container>
        }
    </AuthContext.Consumer>)
}


export default FeedPage;


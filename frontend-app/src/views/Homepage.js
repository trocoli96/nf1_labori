/* BASIC STUFF */
import React from 'react';
import {useStyles} from '../styles/styles';
import {withRouter} from "react-router-dom";

/* COMPONENTS & STYLES */
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import {SIGNUP} from "../routes/routes";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';



function Homepage() {

    const classes = useStyles();

    return (
        <div className={classes.heroBlockHomePage}>
            <Container className={classes.formPaperHomePage}>
                <Grid container spacing={5} className={classes.fullHeightHomePage} alignItems="center">
                    <Grid item xs={12} md={6} className={classes.marginNegativeHomePage}>
                        <Paper className={classes.formPaperHomePage}>
                            <Typography className={classes.maintitleHomePage}>Welcome to your professional
                                community</Typography>
                            <Typography className={classes.subtitleHomePage}>Your next opportunity awaits</Typography>
                            <Grid container spacing={3}>
                                <Grid item xs></Grid>
                                <Grid item xs={9}>
                                    <Button
                                        size="large"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        href={SIGNUP}
                                        endIcon={<KeyboardArrowRightIcon/>}
                                    >Create my Labori account</Button>
                                </Grid>
                                <Grid item xs></Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default withRouter(Homepage);
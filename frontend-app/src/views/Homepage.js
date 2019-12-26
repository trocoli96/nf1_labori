/* BASIC STUFF */
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";
import heroImage from '../media/marten-bjork-6dW3xyQvcYE-unsplash.jpg'

/* COMPONENTS & STYLES */
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import {SIGNUP} from "../routes/routes";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles(theme => (
    {
        heroBlock: {
            height: '95vh',
            backgroundImage: 'url(' + heroImage + ')',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center'
        },
        formPaper: {
            padding: theme.spacing(8, 5),
        },
        marginNegative: {
            marginTop: '-90px'
        },
        fullHeight: {
            height: '100%'
        },
        mainTitle: {
            fontSize: '38px',
            marginBottom: '10px'
        },
        subtitle: {
            fontSize: '22px',
            marginBottom: '40px'
        }
    }
));

function Homepage() {

    const classes = useStyles();

    return (
        <div className={classes.heroBlock}>
            <Container className={classes.fullHeight}>
                <Grid container spacing={5} className={classes.fullHeight} alignItems="center">
                    <Grid item xs={12} md={6} className={classes.marginNegative}>
                        <Paper className={classes.formPaper}>
                            <Typography variant="h1" className={classes.mainTitle}>Welcome to your professional
                                community</Typography>
                            <Typography className={classes.subtitle}>Your next opportunity awaits</Typography>
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
/* BASIC STUFF */
import React, {useContext} from 'react';
import {AuthContext} from "../utils/AuthFront/context";

/* ROUTER & ROUTES */
import {Link} from "react-router-dom";
import {PROFILE, SIGNUP, LOGIN, HOME, FEED} from "../routes/routes";

/* COMPONENTS & STYLES */
import {useStyles} from '../styles/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import '../styles/Header.css';
import getToken from "../utils/tokenHelper";


export default function ButtonAppBar() {
    const classes = useStyles();
    const {dispatch} = useContext(AuthContext); // no incluyo state porque no lo estamos usando. reañadir si hiciera falta

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.titleheader}>
                        <Link to={HOME}><span style={{color: "white"}}>Labori</span></Link>
                    </Typography>
                    {getToken() ?
                        <>
                            <Button color="inherit">
                                <Link to={FEED} className="headerBtn">
                                    Home
                                </Link>
                            </Button>
                            <Button color="inherit">
                                <Link to={PROFILE} className="headerBtn">
                                    Profile
                                </Link>
                            </Button>
                            <Button onClick={e => {
                                dispatch({type: 'DO_LOGOUT'});
                            }}><span className="headerBtn">LogOut</span></Button>
                        </>
                        :
                        <>
                            <Button color="inherit" href={SIGNUP}>Sign up</Button>
                            <Button color="inherit" href={LOGIN}>Login</Button>
                        </>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}
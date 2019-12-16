/* BASIC STUFF */
import React, {useContext} from 'react';
import {AuthContext} from "../utils/AuthFront/context";

/* ROUTER & ROUTES */
import {Link} from "react-router-dom";
import {PROFILE, SIGNUP, LOGIN, HOME} from "../routes/routes";

/* COMPONENTS & STYLES */
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './Header.css';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const {state, dispatch} = useContext(AuthContext);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link to={HOME}><span style={{color: "white"}}>Labori</span></Link>
                    </Typography>
                    {state.token ?
                        <>
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
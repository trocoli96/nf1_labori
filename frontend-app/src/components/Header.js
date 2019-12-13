import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";
import {AuthContext} from "../utils/AuthFront/context";


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
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Labori
                    </Typography>
                    {state.token ?
                        <>
                            <Button color="inherit"><Link to={'./profile'}>Profile</Link></Button>
                            <Button onClick={e => {dispatch({type :'DO_LOGOUT'})}}  color="inherit">LogOut</Button>
                        </>
                        :
                        <>
                            <Button color="inherit"><Link to={'./signup'}>SignUp</Link></Button>
                            <Button color="inherit"><Link to={'./login'}>LogIn</Link></Button>
                        </>
                    }

                </Toolbar>
            </AppBar>
        </div>
    );
}
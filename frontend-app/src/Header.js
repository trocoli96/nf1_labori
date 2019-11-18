import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import InputBase from '@material-ui/core/InputBase';
import {Link } from 'react-router-dom';


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

function ButtonAppBar() {
    const classes = useStyles();
  return (
      <AppBar position="static">
          <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                  Labori
              </Typography>
              <InputBase
                  className={classes.input}
                  placeholder="Search"
                  inputProps={{ 'aria-label': 'search' }}
              />
              <IconButton color="inherit"><PersonIcon /><Typography variant="h6"><Link to="/Profile"> Profile</Link></Typography></IconButton>
              <IconButton color="inherit"><LockOpenIcon /><Typography variant="h6"><Link to="/Login">Log in</Link></Typography></IconButton>
          </Toolbar>
      </AppBar>

  );
}

export default ButtonAppBar;

import {makeStyles} from "@material-ui/core/styles";
import React from 'react';


const useStyles = makeStyles(theme =>({
    postslist:{
        marginTop: 30,
        marginLeft: 30,
        width: '100%',
    },
    singlepost:{
        marginBottom: 20,
        padding: 10,
    },
    profileicon:{
        width: theme.spacing(6),
        height: theme.spacing(6),
        display: 'inline-flex',
        position:'relative',
    },
    authorbox:{
        display:'flex',
        position:'relative',
    },
    authorinfo:{
        display:'inline',
        position:'relative',
        marginLeft: '10px',
        marginTop: '-5px',
    },
    text:{
        fontSize: '80%',
        lineHeight:'2px',
    },
    title:{
        lineHeight:'2px',
    },
    postbuttons:{
        paddingTop:'1px',
        paddingBottom:'1px',
    },
    iconbuttons:{
        marginRight:'4px',
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '0px solid #000',
        boxShadow: theme.shadows[5],
        top: "50%",
        left: "50%",
        marginLeft: "-200px",
        marginTop: "-150px"
    },
    popupHeader: {
        padding: theme.spacing(2, 4, 3),
        backgroundColor: "#3f51b5",
        color: "white"
    },
    textPadding: {
        padding: theme.spacing(2, 4, 3),
    }
}));

export default useStyles;
/* BASIC STUFF */
import React, {useState} from "react";

/* COMPONENTS & STYLES */
import {Grid} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import BusinessIcon from "@material-ui/icons/Business";
import {useStyles} from "../styles/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";


function SingleExperience(props) {

    const classes = useStyles();

    const [visible, setVisible] = useState("none");

    return (
        <div>
            <Grid container onMouseOver={e => setVisible("")} onMouseLeave={e => setVisible("none")}>
                <Grid item xs={10} className={classes.experienceheader}>
                    <div style={{padding: 15}}>
                        <Avatar variant="square" style={{padding: 5}}><BusinessIcon/></Avatar>
                    </div>
                    <span className={classes.experienceheaderinfo}>
                    <h3 className={classes.title}>{props.title}</h3>
                    <p className={classes.title}>{props.company}</p>
                    <p className={classes.text}>{props.start_date} to {props.end_date}</p>
                    <p className={classes.text}>{props.location}</p>
                    <p>{props.description}</p>
                </span>
                </Grid>
                <Grid item xs={2}>
                    <Box display={visible}>
                        <IconButton color="default" aria-label="delete experience">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Grid>
            </Grid>
            <hr/>
        </div>


    )

}

export default SingleExperience;
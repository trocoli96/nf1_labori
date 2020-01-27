/* BASIC STUFF */
import React, {useContext, useState, useEffect} from "react";
import {AuthContext} from "../utils/AuthFront/context";
import getToken from "../utils/tokenHelper";

/* COMPONENTS & STYLES */
import {Grid} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import BusinessIcon from "@material-ui/icons/Business";
import {useStyles} from "../styles/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";


function SingleExperience(props) {

    const classes = useStyles();

    // recogemos lo proveído por el context
    const {dispatch} = useContext(AuthContext);  // no incluyo state porque no lo estamos usando. reañadir si hiciera falta

    const [visible, setVisible] = useState("none");

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [deleteExperience, setDeleteExperience] = useState(false);

    useEffect(() => {

        if (!deleteExperience) return;

        const experience = props.experience;

        const fetchData = async () => {
            const url = 'http://127.0.0.1/api/experience/delete?token=' + getToken();
            const options = {
                body: JSON.stringify(experience),
                method: 'DELETE',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }),
                mode: 'cors'
            };

            fetch(url, options)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        Promise.reject(response.status);
                    }
                })
                .then(data => {
                    setDeleteExperience(false);
                    return props.setUpdateExperiences(true);
                })
                .catch(error => {
                    if (error === 401) {
                        setDeleteExperience(false);
                        console.log("Token inválido, probablemente caducado. Hacemos logout.");
                        return dispatch({type: "DO_LOGOUT"});
                    }
                    setDeleteExperience(false);
                    return console.log(error);
                })
        };

        fetchData();

    }, [deleteExperience]);

    return (
        <div>
            <Grid container onMouseOver={e => setVisible("")} onMouseLeave={e => setVisible("none")}>
                <Grid item xs={10} className={classes.experienceheader}>
                    <div style={{padding: 15}}>
                        <Avatar variant="square" style={{padding: 5}}><BusinessIcon/></Avatar>
                    </div>
                    <span className={classes.experienceheaderinfo}>
                    <h3 className={classes.title}>{props.experience.title}</h3>
                    <p className={classes.title}>{props.experience.company}</p>
                    <p className={classes.text}>{props.experience.start_date} to {props.experience.end_date}</p>
                    <p className={classes.text}>{props.experience.location}</p>
                    <p>{props.experience.description}</p>
                </span>
                </Grid>
                {props.setUpdateExperiences ?
                    <Grid item xs={2}>
                        <Box display={visible}>
                            <IconButton color="default" aria-label="delete experience" onClick={handleClickOpen}>
                                <DeleteIcon/>
                            </IconButton>
                        </Box>
                    </Grid>
                    :
                    null
                }

            </Grid>
            <hr/>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete experience?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this experience?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={e => {
                        handleClose();
                        setDeleteExperience(true)
                    }} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default SingleExperience;
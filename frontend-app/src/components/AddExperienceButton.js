import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

function AddExperienceButton() {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [selectedDate, handleDateChange] = useState(new Date());


    const useStyles = makeStyles(theme => ({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '0px solid #000',
            boxShadow: theme.shadows[5],
            top: "50%",
            left: "50%",
            marginLeft: "-200px",
            marginTop: "-300px"
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

    const classes = useStyles();

    return (
        <div>
            <IconButton color="primary" aria-label="add experience" onClick={handleOpen}>
                <AddCircleIcon/>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className={classes.paper}>
                    <div className={classes.popupHeader}>
                        <h2>Add a new experience</h2>
                    </div>
                    <div className={classes.textPadding}>
                        <p>
                            <TextField id="job-title" label="Job title" fullWidth/>
                        </p>
                        <p>
                            <TextField id="company" label="Company" fullWidth/>
                        </p>
                        <p>
                            <TextField id="location" label="Location" fullWidth/>
                        </p>
                        <Grid container justify="space-around">
                            <Grid item>
                                <TextField
                                    id="start-date"
                                    label="Start date"
                                    type="date"
                                    defaultValue="2020-01-01"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="end-date"
                                    label="End date"
                                    type="date"
                                    defaultValue="2020-01-02"
                                />
                            </Grid>
                        </Grid>

                        <p>


                        </p>
                        <p>

                        </p>
                        <p>
                            <TextField
                                id="description"
                                label="Description"
                                multiline
                                rows="8"
                                variant="outlined"
                                fullWidth
                            />
                        </p>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AddExperienceButton;
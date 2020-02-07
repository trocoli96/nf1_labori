/* BASIC STUFF */
import React, {useState, useEffect, useContext} from "react";
import getToken from "../utils/tokenHelper";
import {AuthContext} from "../utils/AuthFront/context";

/* COMPONENTS & STYLES */
import '../styles/App.css';
import {useStyles} from '../styles/styles';
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Modal from '@material-ui/core/Modal';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {CircularProgress} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";


function AddExperienceButton(props) {

    const classes = useStyles();

    // recogemos lo proveído por el context
    const {dispatch} = useContext(AuthContext);  // no incluyo state porque no lo estamos usando. reañadir si hiciera falta


    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState("2020-01-01");
    const [endDate, setEndDate] = useState("2020-01-02");
    const [description, setDescription] = useState("");
    const [currentlyWorking, setCurrentlyWorking] = useState(false);

    useEffect(() => {

        if (!isSubmitting) return;

        // quitamos los mensajes de error
        setError("");

        // validamos que hayan rellenado todos los campos
        const allFields = [jobTitle, company, location, description];
        for (var i = 0; i < allFields.length; i++) {
            if (allFields[i] === "") {
                setError("All fields must be filled");
                return setIsSubmitting(false);
            }
        }

        // validamos que la fecha de final sea posterior a la del comienzo
        if (!currentlyWorking) {
            if (startDate >= endDate) {
                setError("End date can't be earlier than start date");
                return setIsSubmitting(false);
            }
        }

        // creamos el objeto a enviar
        var dataToSend = {
            title: jobTitle,
            company: company,
            location: location,
            start_date: startDate,
            end_date: endDate,
            description: description
        };

        // si esta marcado currently working, la fecha será 2999-01-01
        if (currentlyWorking) {
            dataToSend.end_date = "2999/01/01";
        }

        const fetchData = async () => {

            const url = 'http://api.labori-app.xyz/api/experience?token=' + getToken();
            const options = {
                body: JSON.stringify(dataToSend),
                method: 'POST',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }),
                mode: 'cors'
            };

            fetch(url, options)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    return Promise.reject(response.status)
                })
                .then(data => {
                    setIsSubmitting(false);
                    setOpen(false)
                    return props.setUpdateExperiences(true);
                })
                .catch(error => {
                    if (error === 401) {
                        console.log("Token inválido, probablemente caducado. Hacemos logout.");
                        dispatch({type: "DO_LOGOUT"});
                    }
                    console.log("Error al añadir la experiencia. Error: " + error);
                    setError("An error ocurred. Please try again.");
                    return setIsSubmitting(false);
                });

        };

        fetchData()

    }, [isSubmitting]);

    // si cerramos el modal, reseteamos los valores
    useEffect(() => {
        if (!open) {
            setJobTitle("");
            setCompany("");
            setLocation("");
            setStartDate("2020-01-01");
            setEndDate("2020-01-02");
            setDescription("");
            setCurrentlyWorking(false);
            setError("");
        }
    }, [open]);

    return (
        <Grid>
            <IconButton color="primary" aria-label="add experience" onClick={handleOpen}>
                <AddCircleIcon/>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className={classes.paperExperience}>
                    <div className={classes.popupHeader}>
                        <h2>Add a new experience</h2>
                    </div>
                    <div className={classes.textPadding}>
                        <p>
                            <TextField
                                id="job-title"
                                label="Job title"
                                fullWidth
                                onChange={(e) => setJobTitle(e.target.value)}
                            />
                        </p>
                        <p>
                            <TextField
                                id="company"
                                label="Company"
                                fullWidth
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </p>
                        <p>
                            <TextField
                                id="location"
                                label="Location"
                                fullWidth
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </p>
                        <Grid container justify="space-around" alignItems="center">
                            <Grid item>
                                <TextField
                                    id="start-date"
                                    label="Start date"
                                    type="date"
                                    defaultValue="2020-01-01"
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="end-date"
                                    label="End date"
                                    type="date"
                                    defaultValue="2020-01-02"
                                    onChange={(e) => setEndDate(e.target.value)}
                                    disabled={currentlyWorking}
                                />
                            </Grid>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={currentlyWorking}
                                              onChange={() => setCurrentlyWorking(!currentlyWorking)}
                                              value="Currently working here"
                                    />
                                }
                                label="Currently working here"
                            />
                        </Grid>
                        <p></p>
                        <TextField
                            id="description"
                            label="Description"
                            multiline
                            rows="8"
                            variant="outlined"
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                        />
                        <p>{error}</p>
                        {isSubmitting ?
                            <CircularProgress/> :
                            <Button variant="contained" color="primary" onClick={() => setIsSubmitting(true)}>
                                Submit
                            </Button>
                        }
                        {isSubmitting ? null : <Button onClick={() => setOpen(false)}>Cancel</Button>}
                    </div>

                </div>
            </Modal>
        </Grid>
    )
}

export default AddExperienceButton;
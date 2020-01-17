import React, {useState, useEffect} from 'react';
import '../App.css';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {CircularProgress} from "@material-ui/core";


function ButtonPopup(props) {

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

    // para gestionar la apertura o cierre del modal
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    // para gestionar el mostrar el password o no en el primer campo
    const [valuesField1, setValuesField1] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChangeField1 = prop => event => {
        setValuesField1({...valuesField1, [prop]: event.target.value});
    };

    const handleClickShowPasswordField1 = () => {
        setValuesField1({...valuesField1, showPassword: !valuesField1.showPassword});
    };

    // para gestionar el mostrar el password o no en el segundo campo
    const [valuesField2, setValuesField2] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    // valores del formulario

    const handleChangeField2 = prop => event => {
        setValuesField2({...valuesField2, [prop]: event.target.value});
    };
    const handleClickShowPasswordField2 = () => {
        setValuesField2({...valuesField2, showPassword: !valuesField2.showPassword});
    };
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    // para revisar si hay datos que enviar o los campos estan en blanco
    function isEmpty(obj) {
        for (var x in obj) { return false; }
        return true;
    }

    useEffect(() => {

        // si no estamos enviando nada, salimos del effect
        if (!isSubmitting) {
            return;
        }

        // quitamos los mensajes de error
        setError("");

        // para mandar mensajes de error si la contraseña es corta o no existe
        if (valuesField1.password.length > 0) {

            if (valuesField1.password.length < 8) {
                setError("Password should contain at least 8 characters");
                return setIsSubmitting(false);
            } else {
                if (valuesField1.password !== valuesField2.password) {
                    setError("Both passwords should match");
                    return setIsSubmitting(false);
                }
            }

        }

        let newUserData = {};
        let firstNameToSend = "";
        let lastNameToSend = "";
        let emailToSend = "";
        let passwordToSend = "";

        // hacemos trim
        firstNameToSend = firstName.trim();
        lastNameToSend = lastName.trim();
        emailToSend = email.trim();
        passwordToSend = valuesField1.password.trim();

        // si tras el trim aun sigue habiendo algo, lo agregamos a newUserData
        if (firstNameToSend !== "") {
            newUserData["first_name"] = firstNameToSend;
        }
        if (lastNameToSend !== "") {
            newUserData["last_name"] = lastNameToSend;
        }
        if (emailToSend !== "") {
            newUserData["email"] = emailToSend;
        }
        if (passwordToSend !== "") {
            newUserData["password"] = passwordToSend;
        }

        // si no hay nada que enviar, salimos
        if (isEmpty(newUserData)) {
            console.log("Nada que enviar");
            return setIsSubmitting(false);
        }

        console.log(newUserData);

        // TODO fetch de put

        return setIsSubmitting(false);

    }, [isSubmitting]);



    // si cerramos el modal, reseteamos los valores
    useEffect(() => {

        if (!open) {
            setFirstName("");
            setLastName("");
            setEmail("");
            setValuesField1({
                password: ''
            });
            setValuesField2({
                password: ''
            });
            setError("");
        }

    }, [open]);

    return (
        <React.Fragment>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className={classes.paper}>
                    <div className={classes.popupHeader}>
                        <h2>Edit your profile</h2>
                    </div>
                    <div className={classes.textPadding}>
                        <form>
                            <TextField id="change-name" label="First name" variant="outlined" fullWidth
                                       onChange={event => setFirstName(event.target.value)}/>
                            <TextField id="change-last-name" label="Last name" variant="outlined" fullWidth
                                       onChange={event => setLastName(event.target.value)}/>
                            <TextField id="change-email" label="New email" variant="outlined" fullWidth
                                       onChange={event => setEmail(event.target.value)}/>
                            <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="new-password">New password</InputLabel>
                                <FilledInput
                                    id="new-password"
                                    type={valuesField1.showPassword ? 'text' : 'password'}
                                    value={valuesField1.password}
                                    onChange={
                                        handleChangeField1('password')
                                    }
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPasswordField1}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {valuesField1.showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl variant="filled" fullWidth>
                                <InputLabel htmlFor="new-password-confirm">Confirm new password</InputLabel>
                                <FilledInput
                                    id="new-password-confirm"
                                    type={valuesField2.showPassword ? 'text' : 'password'}
                                    value={valuesField2.password}
                                    onChange={
                                        handleChangeField2('password')
                                    }
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPasswordField2}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {valuesField2.showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <p>{error}</p>
                            {isSubmitting ?
                                <CircularProgress/> :
                                <Button variant="contained" color="primary" onClick={() => setIsSubmitting(true)}>
                                    Submit
                                </Button>
                            }
                            {isSubmitting ? null : <Button onClick={() => setOpen(false)}>Cancel</Button>}
                        </form>
                    </div>
                </div>
            </Modal>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                Edit Profile
            </Button>
        </React.Fragment>
    )
}

export default ButtonPopup;
/* BASIC STUFF */
import React, {useState, useEffect, useContext} from 'react';
import getToken from "../utils/tokenHelper";
import {AuthContext} from "../utils/AuthFront/context";

/* COMPONENTS & STYLES */
import '../styles/App.css';
import {useStyles} from '../styles/styles';
import Modal from '@material-ui/core/Modal';
import Button from "@material-ui/core/Button";
import {CircularProgress} from "@material-ui/core";
import UserPhoto from "./UserPhoto";


function ButtonUserPhoto(props) {

    // recogemos lo proveído por el context
    const {dispatch} = useContext(AuthContext);  // no incluyo state porque no lo estamos usando. reañadir si hiciera falta

    // para gestionar la apertura o cierre del modal
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    // valores del formulario
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState("");
    const [error, setError] = useState("");

    // para revisar si hay datos que enviar o los campos estan en blanco
    function isEmpty(obj) {
        for (var x in obj) {
            return false;
        }
        return true;
    }


    useEffect(() => {

        // si no estamos enviando nada, salimos del effect
        if (!isSubmitting) {
            return;
        }

        if (profilePhoto === "") {
            return setOpen(false);
        }

        // quitamos los mensajes de error
        setError("");

        let reader = new FileReader();
        reader.readAsDataURL(profilePhoto);

        reader.onload = () => {

            let profilePhotoBase64 = {
                "image": reader.result
            };

            const fetchData = async () => {
                const url = `http://127.0.0.1/api/profilepicture`;
                const options = {
                    body: JSON.stringify(profilePhotoBase64),
                    method: 'PUT',
                    headers: new Headers({
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + getToken()
                    }),
                    mode: 'cors'
                };

                fetch(url, options)
                    .then(response => {
                        if (response.status >= 200 && response.status < 400) {
                            return response.json();
                        } else {
                            return Promise.reject(response.status);
                        }
                    })
                    .then(data => {
                        // TODO pasar la foto al componente padre
                        /*props.setUserData({
                            "first_name": data.first_name,
                            "last_name": data.last_name,
                            "email": data.email
                        });*/
                        setOpen(false);
                        return setIsSubmitting(false);
                    })
                    .catch(error => {
                        if (error === 401) {
                            console.log("Token inválido, probablemente caducado. Hacemos logout.");
                            return dispatch({type: "DO_LOGOUT"});
                        }
                        console.log("Error al actualizar los datos de user. Error: " + error);
                        setError("An error ocurred. Please try again.");
                        return setIsSubmitting(false);
                    });
            };

            fetchData();

        }



    }, [isSubmitting]);


    // si cerramos el modal, reseteamos los valores
    useEffect(() => {
        if (!open) {
            setProfilePhoto("");
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
                        <h2>Edit your photo</h2>
                    </div>
                    <div className={classes.textPadding}>

                        <UserPhoto/>
                        <form>
                            <input type="file" onChange={e => setProfilePhoto(e.target.files[0])}/>
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
                Edit Photo
            </Button>
        </React.Fragment>
    )
}

export default ButtonUserPhoto;
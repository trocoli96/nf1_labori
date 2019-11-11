import React, {useState} from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import {Modal} from "@material-ui/core";


function ButtonPopup(props){

    const [open, setOpen] = useState(false);

    return(
        <React.Fragment>
            <Modal open={open} onClose={() => setOpen(false)}>
                <p>Editprofile</p>
            </Modal>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                Edit Profile
            </Button>
        </React.Fragment>

    )
}
export default ButtonPopup;
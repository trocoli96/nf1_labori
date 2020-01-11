import React, {useState} from 'react';
import '../App.css';
import Button from '@material-ui/core/Button';
import {Modal} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


function ButtonPostedSuccesfull (props){

    const [open, setOpen] = useState (false);

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
        <p>Congratulations Laborier! Your post has been created!</p>
        </Modal>
    )
}

export default ButtonPostedSuccesfull;
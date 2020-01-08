import React, {useState} from 'react';
import '../App.css';
import Button from '@material-ui/core/Button';
import {Modal} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const useStyles = makeStyles({
    card: {
        minWidth: 275,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    bullet: {
        display: 'center-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

    function ButtonPopup(props){

    const [open, setOpen] = useState(false);
    const classes = useStyles();

    return(
        <React.Fragment>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Card className={classes.card}>
                    <CardContent>
                <p>fkwjfgeklrjger</p>
                    </CardContent>
                </Card>

            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                Edit Profile
            </Button>
            </Modal>
        </React.Fragment>

    )
}
export default ButtonPopup;
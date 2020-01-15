import React from 'react';
import '../App.css';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from "@material-ui/core/Button";


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

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

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
                        <p>
                            Name, last name, headline...
                        </p>
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
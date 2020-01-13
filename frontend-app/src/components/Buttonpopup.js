import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';



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

 //   const [open, setOpen] = useState(false);
 //   const classes = useStyles();

    return(
        <p>Texto temporal, el código original daba error</p>
        /*
        TODO: LO DEJAMOS ASI DE MOMENTO PORQUE ESTE CODIGO DABA ERROR
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
        </React.Fragment>*/
    )
}
export default ButtonPopup;
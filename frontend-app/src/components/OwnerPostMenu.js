/*BASIC STUFF*/
import React, {useContext, useEffect, useState} from "react";
import {SET_FLAG} from "../utils/postsReducer";

/*STYLE*/
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from "@material-ui/icons/Delete";
import {useStyles} from "../styles/styles";
import getToken from "../utils/tokenHelper";
import {AuthContext} from "../utils/AuthFront/context";
import {PostContext} from "../utils/postContext";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import AdjustIcon from "@material-ui/icons/Adjust";
import {Link} from "react-router-dom";





function OwnerPostMenu (props) {

    // recogemos lo proveído por el context
    const {dispatch} = useContext(AuthContext);  // no incluyo state porque no lo estamos usando. reañadir si hiciera falta

    const classes = useStyles();
    const ITEM_HEIGHT = 48;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const {postState, postDispatch} = useContext(PostContext);

    const [openDialog,setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const [deletePost, setDeletePost] = useState(false);

    useEffect(() => {

        if (!deletePost) return;

        const postId = props.id;

        const fetchData = async () => {
            const url = `http://api.labori-app.xyz/api/post/delete/` + postId;
            const options = {
                method: 'DELETE',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken(),
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
                    setDeletePost(false);
                    postDispatch({type: SET_FLAG})
                })
                .catch(error => {
                    if (error === 401) {
                        setDeletePost(false);
                        return dispatch({type: "DO_LOGOUT"});
                    }
                    setDeletePost(false);
                    return console.log(error);
                })
        };

        fetchData();

    }, [deletePost]);

    return (
        <div className={classes.menuposts}>
        <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
        >
            <MoreVertIcon />
        </IconButton>
        <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200,
                },
            }}>
            <MenuItem onClick={ e =>  {handleClickOpen(); handleClose();}}><DeleteIcon/>Delete</MenuItem>
            <MenuItem onClick={handleClose}><Link to={{pathname: `/post/${props.id}`}}><AdjustIcon/> View post</Link></MenuItem>
        </Menu>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete post?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this post? Changes will be irreversible!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={e => { handleCloseDialog(); setDeletePost(true) }} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
    </div>

    )

}

export default OwnerPostMenu;
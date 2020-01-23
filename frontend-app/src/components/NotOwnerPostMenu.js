/*BASIC STUFF*/
import React from 'react';
import {Link} from 'react-router-dom';


/*STYLE*/
import {useStyles} from "../styles/styles";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AdjustIcon from "@material-ui/icons/Adjust";




function NotOwnerPostMenu(props){

    const classes = useStyles();

    const ITEM_HEIGHT = 48;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



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
                <MenuItem onClick={handleClose}><Link to={{pathname: `/post/${props.id}`}}><AdjustIcon/> View post</Link></MenuItem>
            </Menu>
        </div>
    )


}

export default NotOwnerPostMenu;
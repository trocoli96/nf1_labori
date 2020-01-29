import React from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Button from "@material-ui/core/Button";
import {useStyles} from "../styles/styles";

export default function LikeBtn(props) {

    const classes = useStyles();

    return (
            <Button className={classes.postbuttons}>
                <ThumbUpIcon className={classes.iconbuttons}/> Like <span className={classes.likeCounter}>{props.likes ? props.likes : 0}</span>
            </Button>
    );

}
import React from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatIcon from "@material-ui/icons/Chat";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import ReplyIcon from "@material-ui/icons/Reply";
import Paper from "@material-ui/core/Paper";
import {useStyles} from "../styles/styles";

function SinglePost(props) {

    const classes = useStyles();

    return (
        <Paper className={classes.singlepost}>
            <Grid item xd={10} className={classes.authorbox}>
                <Avatar className={classes.profileicon} style={{backgroundColor: props.color}}>
                    {props.shortname}
                </Avatar>
                <span className={classes.authorinfo}>
                    <h3 className={classes.title}>{props.first_name} {props.last_name}</h3>
                    {props.former_name ?
                        <p className={classes.text}>{props.former_name} - {moment(props.created_at, "YYYY-MM-DD hh:mm:ss").fromNow()}</p>
                        :
                        <p className={classes.text}>{moment(props.created_at, "YYYY-MM-DD hh:mm:ss").fromNow()}</p>
                    }
                </span>
            </Grid>
            <p style={{marginLeft: 10}}>{props.post_text}</p>
            <Divider/>
            <Grid item xs={11}>
                <Button className={classes.postbuttons}><ThumbUpIcon className={classes.iconbuttons}/> Like</Button>
                <Button className={classes.postbuttons}><ChatIcon className={classes.iconbuttons}/> Comment</Button>
                <CopyToClipboard text={`http://localhost:3000/post/${props.id}`}>
                    <Button className={classes.postbuttons} onClick={() => props.setCopied(true)}><ReplyIcon
                        className={classes.iconbuttons}/>Share</Button>
                </CopyToClipboard>
            </Grid>
        </Paper>
    )
}

export default SinglePost;
/*BASIC STUFF*/
import React from "react";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import OwnerPostMenu from "./OwnerPostMenu";
import {Link} from "react-router-dom";
import LikeBtn from "./LikeBtn";

/*UTILS*/
import {useStyles} from "../styles/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

/*ICONS*/
import ChatIcon from "@material-ui/icons/Chat";
import ReplyIcon from "@material-ui/icons/Reply";
import NotOwnerPostMenu from "./NotOwnerPostMenu";

function SinglePost(props) {

    const classes = useStyles();

    return (
        <Paper className={classes.singlepost}>
            <Grid item xd={10} className={classes.authorbox}>
                <Link to={`/profile/${props.user_id}`}>
                    <Avatar className={classes.profileicon} style={{backgroundColor: props.color}}>
                        {props.shortname}
                    </Avatar>
                </Link>
                <span className={classes.authorinfo}>
                    <Link to={`/profile/${props.user_id}`}><h3
                        className={classes.title}>{props.first_name} {props.last_name}</h3></Link>
                    {props.former_name ?
                        <p className={classes.text}>{props.former_name} - {moment(props.created_at, "YYYY-MM-DD hh:mm:ss").fromNow()}</p>
                        :
                        <p className={classes.text}>{moment(props.created_at, "YYYY-MM-DD hh:mm:ss").fromNow()}</p>
                    }
                     </span>
                {props.owner ?
                    <OwnerPostMenu {...props}/>
                    :
                    <NotOwnerPostMenu {...props}/>
                }

            </Grid>
            <p style={{marginLeft: 10}}>{props.post_text}</p>
            <Divider/>
            <Grid container item justify="space-between">
                <Grid container item xs justify="flex-start" alignItems="center">
                    <LikeBtn likes={props.likes} postid={props.id} liked={props.liked}/>
                </Grid>
                <Grid item xs justify="center">
                    <Button className={classes.postbuttons}>
                        <ChatIcon className={classes.iconbuttons}/>
                        Comment
                    </Button>
                </Grid>
                <Grid item xs justify="flex-end">
                    <CopyToClipboard text={`http://localhost:3000/post/${props.id}`}>
                        <Button className={classes.postbuttons} onClick={() => props.setCopied(true)}>
                            <ReplyIcon
                                className={classes.iconbuttons}/>Share</Button>
                    </CopyToClipboard>
                </Grid>
            </Grid>
            <Grid container xs>
                <Grid item xs>
                    {props.comments.map(comment => {
                        return (
                            <Paper width="100%" className={classes.commentBox}>
                                <p className={classes.nameOnComment}>{comment.first_name} {comment.last_name}</p>
                                <p className={classes.bodyComment}>{comment.comment_body}</p>
                            </Paper>
                        )
                    })}
                </Grid>

            </Grid>
        </Paper>
    )
}

export default SinglePost;
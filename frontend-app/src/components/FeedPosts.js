/* BASIC STUFF */
import React, {useEffect, useState, useContext} from 'react';
import {AuthContext} from "../utils/AuthFront/context";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import moment from "moment";
import {useStyles} from '../styles/styles';

/* COMPONENTS & STYLES */
import '../styles/App.css';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Button from "@material-ui/core/Button";
import ChatIcon from '@material-ui/icons/Chat';
import ReplyIcon from '@material-ui/icons/Reply';
import Modal from '@material-ui/core/Modal';




function FeedPosts() {

    const classes = useStyles();

    // recogemos lo proveído por el context
    const {dispatch} = useContext(AuthContext);  // no incluyo state porque no lo estamos usando. reañadir si hiciera falta

    const [postsData, setPostsData] = useState([]);
    const [, setError] = useState(false);
    const [length, setLength] = useState(5);


    useEffect(() => {
        const fetchData = async () => {
            const url = `http://127.0.0.1/api/posts/` + [length];
            const options = {
                method: 'GET',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }),
                mode: 'cors',
            };

            return fetch(url, options)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    }
                    return Promise.reject(response.status);
                })
                .then(data => {
                    return setPostsData(data);
                })
                .catch(error => {
                    if (error === 401){
                        setError(true);
                        dispatch({type: "DO_LOGOUT"});
                    }
                });
        };

        fetchData();

    }, [dispatch, length]);

    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    debugger;
    return (<AuthContext.Consumer>
            {props =>
                <Grid item xs={11}>
                    <Grid item xd={10} className={classes.postslist}>
                        {postsData.data && postsData.data.map((data) => {
                            return (
                                <Paper className={classes.singlepost}>
                                    <Grid item xd={10} className={classes.authorbox}>
                                        <Avatar className={classes.profileicon}>
                                            {data.shortname}
                                        </Avatar>
                                        <span className={classes.authorinfo}>
                                        <h3 className={classes.title}>{data.first_name} {data.last_name}</h3>
                                        <p className={classes.text}>{data.former_name} - {moment(data.created_at, "YYYY-MM-DD hh:mm:ss").fromNow()}</p>
                                    </span>
                                    </Grid>
                                    <p>{data.post_text}</p>
                                    <Divider/>
                                    <Grid item xs={11}>
                                        <Button className={classes.postbuttons}><ThumbUpIcon className={classes.iconbuttons}/> Like</Button>
                                        <Button className={classes.postbuttons}><ChatIcon className={classes.iconbuttons}/> Comment</Button>
                                        <Button className={classes.postbuttons}><ReplyIcon className={classes.iconbuttons} onClick={() => setOpen(data.id)}/>Share</Button>
                                        <Modal open={open === data.id} onClose={handleClose}>
                                            <div className={classes.paper}>
                                                <div className={classes.popupHeader}>
                                                    <h2>Share this post</h2>
                                                </div>
                                                <div className={classes.textPadding}>
                                                    <CopyToClipboard text={`http://localhost:3000/post/${data.id}`}>
                                                        <Button onClick={() => setCopied(true)}>Copy Link and Share!</Button>
                                                    </CopyToClipboard>
                                                    {copied ? <span>Copied!</span> : null}
                                                </div>
                                            </div>
                                        </Modal>
                                    </Grid>
                                </Paper>
                            )
                        })}
                    </Grid>
                        <Grid item xs={11}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.loadmore}
                            onClick={() => setLength(length + 5) }
                            >
                            LOAD MORE
                            </Button>
                        </Grid>
                </Grid>

            }

        </AuthContext.Consumer>
    );
}

export default FeedPosts;

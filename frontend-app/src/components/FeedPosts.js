/* BASIC STUFF */
import {useStyles} from '../styles/styles';
import React, {useEffect, useState, useContext} from 'react';
import {AuthContext} from "../utils/AuthFront/context";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import moment from "moment";


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
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";



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

    const [copied, setCopied] = useState(false);

    const handleClose = () => {
        setCopied(false);
    };

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
                                        <CopyToClipboard text={`http://localhost:3000/post/${data.id}`}>
                                            <Button className={classes.postbuttons} onClick={() => setCopied(true)}><ReplyIcon className={classes.iconbuttons}/>Share</Button>
                                        </CopyToClipboard>

                                    </Grid>
                                </Paper>
                            )
                        })}
                        {copied ? <Snackbar
                                message="Copied to Clipboard!"
                                open={copied}
                                autoHideDuration={2000}
                                onClose={handleClose}
                                color="green"
                                action={
                                    <React.Fragment>
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            onClick={handleClose}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </React.Fragment>
                                }
                            />
                                : null}
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

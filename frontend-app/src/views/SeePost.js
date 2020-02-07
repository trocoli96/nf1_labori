/* BASIC STUFF */
import React, {useEffect, useState, useContext} from 'react';
import {AuthContext} from "../utils/AuthFront/context";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import moment from "moment";
import {Link, useParams} from 'react-router-dom';
import getToken from "../utils/tokenHelper";
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
import UserPhoto from "../components/UserPhoto";


function SeePost(props) {

    const classes = useStyles();

    // recogemos lo proveído por el context
    const {dispatch} = useContext(AuthContext);  // no incluyo state porque no lo estamos usando. reañadir si hiciera falta

    let {name} = useParams();
    const [post, setPost] = useState( []);
    const [, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://api.labori-app.xyz/api/post/${name}?token=` + getToken();
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
                    setPost(data);
                    console.log(data);
                })
                .catch(error => {
                    if (error === 401) {
                        setError(true);
                        dispatch({type: "DO_LOGOUT"});
                    }
                });
        };

        fetchData();

    }, [dispatch]);

    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };


    return (<AuthContext.Consumer>
            {props =>
                <Grid item xs={11}>
                    <Grid item xd={10} className={classes.postslist}>
                        {post ?
                            <Paper className={classes.singlepost}>
                                <Grid item xd={10} className={classes.authorbox}>
                                    <Link to={`/profile/${post.user_id}`}>
                                    <UserPhoto/>
                                    </Link>
                                    <span className={classes.authorinfo}>
                                        <Link to={`/profile/${post.user_id}`}><h3 className={classes.title}>{post.first_name} {post.last_name}</h3></Link>
                                        {props.former_name ?
                                            <p className={classes.text}>{post.former_name} - {moment(post.created_at, "YYYY-MM-DD hh:mm:ss").fromNow()}</p>
                                            :
                                            <p className={classes.text}>{moment(post.created_at, "YYYY-MM-DD hh:mm:ss").fromNow()}</p>
                                        }
                                    </span>
                                </Grid>
                                <p>{post.post_text}</p>
                                <Divider/>
                                <Grid item xs={11}>
                                    <Button className={classes.postbuttons}><ThumbUpIcon className={classes.iconbuttons}/> Like</Button>
                                    <Button className={classes.postbuttons}><ChatIcon className={classes.iconbuttons}/> Comment</Button>
                                    <Button className={classes.postbuttons}><ReplyIcon className={classes.iconbuttons} onClick={() => setOpen(true)}/>Share</Button>
                                    <Modal open={open} onClose={handleClose}>
                                        <div className={classes.paper}>
                                            <div className={classes.popupHeader}>
                                                <h2>Share this post</h2>
                                            </div>
                                            <div className={classes.textPadding}>
                                                <CopyToClipboard text={`http://${window.location.hostname}/post/${post.id}`}>
                                                    <Button onClick={() => setCopied(true)}>Copy Link and Share!</Button>
                                                </CopyToClipboard>
                                                {copied ? <span>Copied!</span> : null}
                                            </div>
                                        </div>
                                    </Modal>
                                </Grid>
                            </Paper>
                        : null}
                    </Grid>
                </Grid>
            }
        </AuthContext.Consumer>
    );
}
        export default SeePost;
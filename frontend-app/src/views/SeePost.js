/* BASIC STUFF */
import React, {useEffect, useState, useContext} from 'react';
import {AuthContext} from "../utils/AuthFront/context";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import moment from "moment";
import {useParams} from 'react-router-dom';
import getToken from "../utils/tokenHelper";

/* COMPONENTS & STYLES */
import '../App.css';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Button from "@material-ui/core/Button";
import ChatIcon from '@material-ui/icons/Chat';
import ReplyIcon from '@material-ui/icons/Reply';
import Modal from '@material-ui/core/Modal';


const useStyles = makeStyles(theme =>({
    postslist:{
        marginTop: 30,
        marginLeft: 30,
        width: '100%',
    },
    singlepost:{
        marginBottom: 20,
        padding: 10,
    },
    profileicon:{
        width: theme.spacing(6),
        height: theme.spacing(6),
        display: 'inline-flex',
        position:'relative',
    },
    authorbox:{
        display:'flex',
        position:'relative',
    },
    authorinfo:{
        display:'inline',
        position:'relative',
        marginLeft: '10px',
        marginTop: '-5px',
    },
    text:{
        fontSize: '80%',
        lineHeight:'2px',
    },
    title:{
        lineHeight:'2px',
    },
    postbuttons:{
        paddingTop:'1px',
        paddingBottom:'1px',
    },
    iconbuttons:{
        marginRight:'4px',
    },
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
        justifyContent: 'center',
    },
    loadmore:{
        position: 'absolute',
        right: '48%',
    }
}));

function SeePost(props) {

    const classes = useStyles();

    // recogemos lo proveído por el context
    const {dispatch} = useContext(AuthContext);  // no incluyo state porque no lo estamos usando. reañadir si hiciera falta

    let {name} = useParams();
    const [post, setPost] = useState( []);

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://127.0.0.1/api/post/${name}?token=` + getToken();
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
                .catch(error => console.log(error));
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
                                    <Avatar className={classes.profileicon}>
                                        {post.shortname}
                                    </Avatar>
                                    <span className={classes.authorinfo}>
                                        <h3 className={classes.title}>{post.first_name} {post.last_name}</h3>
                                        <p className={classes.text}>{post.former_name} - {moment(post.created_at, "YYYY-MM-DD hh:mm:ss").endOf('hour').fromNow()}</p>
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
                                                <CopyToClipboard text={`http://localhost:3000/post/${post.id}`}>
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
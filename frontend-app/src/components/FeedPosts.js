/* BASIC STUFF */
import {useStyles} from '../styles/styles';
import React, {useEffect, useState, useContext} from 'react';
import {AuthContext} from "../utils/AuthFront/context";
import {PostContext} from "../utils/postContext";
import getToken from "../utils/tokenHelper";


/* COMPONENTS & STYLES */
import '../styles/App.css';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SinglePost from "./SinglePost";



function FeedPosts() {

    const classes = useStyles();

    // recogemos lo proveído por el context
    const {dispatch} = useContext(AuthContext);  // no incluyo state porque no lo estamos usando. reañadir si hiciera falta
    const {postState} = useContext(PostContext);

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://api.labori-app.xyz/api/posts/?page=` + page ;
            const options = {
                method: 'GET',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken(),
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
                     return setPosts(data);
                })
                .catch(error => {
                    if (error === 401) {
                        dispatch({type: "DO_LOGOUT"});
                    }
                });
        };

        fetchData();

    }, [dispatch, page, postState.flag]);

    const [copied, setCopied] = useState(false);

    const handleClose = () => {
        setCopied(false);
    };

    return (
        <AuthContext.Consumer>
            {props =>
                <PostContext.Consumer>
                    {props =>
                        <Grid item xs={11}>
                            <Grid item xd={10} className={classes.postslist}>
                                {posts.data && posts.data.map((post) =>
                                    <SinglePost {...post} setCopied={setCopied} key={`postid_${post.id}`}/>)
                                }
                                {copied ? <Snackbar
                                        message="Link copied to Clipboard!"
                                        open={copied}
                                        autoHideDuration={1500}
                                        onClose={handleClose}
                                        color="green"
                                        action={
                                            <React.Fragment>
                                                <IconButton
                                                    aria-label="close"
                                                    color="inherit"
                                                    onClick={handleClose}
                                                >
                                                    <CloseIcon/>
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
                                    onClick={() => setPage(page + 1)}
                                >
                                    LOAD MORE
                                </Button>
                            </Grid>
                        </Grid>
                    }
                </PostContext.Consumer>
            }
        </AuthContext.Consumer>
    );
}

export default FeedPosts;

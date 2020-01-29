import React, {useState} from "react";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Button from "@material-ui/core/Button";
import {useStyles} from "../styles/styles";
import getToken from "../utils/tokenHelper";

export default function LikeBtn(props) {

    const classes = useStyles();
    const [likesPost, setLikesPost] = useState(props.likes);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [liked, setLiked] = useState(props.liked);

    const likePost = () => {

        if (isSubmitting) return;

        setIsSubmitting(true);

        const url = "http://127.0.0.1/api/like";
        const options = {
            method: 'POST',
            body: JSON.stringify({
                post_id: props.postid
            }),
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            }),
            mode: 'cors'
        };

        const fetchData = async () => {

            fetch(url, options)
                .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            return Promise.reject(response);
                        }
                    }
                ).then(data => {
                    setLikesPost(data.likes);
                    setLiked(data.liked);
                    return setIsSubmitting(false);
                }
            ).catch(error => {
                    console.log(error.status);
                    return setIsSubmitting(false);
                }
            )
        };

        fetchData();

    };

    return (
        <Button className={classes.postbuttons} onClick={likePost} disabled={isSubmitting}>
            <ThumbUpIcon color={liked ? "primary" : "inherit"} className={classes.iconbuttons}/>
            Like
            <span className={classes.likeCounter}>{likesPost ? likesPost : 0}</span>
        </Button>
    );

}
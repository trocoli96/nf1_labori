import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {AuthContext} from "../utils/AuthFront/context";

function SeePost(props){

let { name } = useParams();
const [post, setPost] = useState();

useEffect(() => {
    const fetchData = async () => {
        const url = `http://127.0.0.1/api/post/${name}`;
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
            })
            .catch(error => console.log(error));
    };

    fetchData();
}, []);

    return (<AuthContext.Consumer>
        {props =>
            <p>{post.post_text}</p>
        }
    </AuthContext.Consumer>)
}

export default SeePost;
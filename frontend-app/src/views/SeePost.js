import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {AuthContext} from "../utils/AuthFront/context";
import getToken from "../utils/tokenHelper";

function SeePost(props){

        // recogemos lo proveído por el context
        const {dispatch} = useContext(AuthContext);  // no incluyo state porque no lo estamos usando. reañadir si hiciera falta

        let { name } = useParams();
        const [post, setPost] = useState();

        useEffect(() => {
            const fetchData = async () => {
                const url = `http://127.0.0.1/api/post/${name}` + getToken();
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
                        return setPost(data);
                    })
                    .catch(error => console.log(error));
            };

            fetchData();
        }, [dispatch]);

            return (

                <p>post</p>
            )}

        export default SeePost;
/* BASIC STUFF */
import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from "../utils/AuthFront/context";

/* COMPONENTS & STYLES */
import ButtonPopup from "./Buttonpopup";
import '../App.css';

function Profilepage() {

    // recogemos lo proveído por el context
    const {state, dispatch} = useContext(AuthContext);

    // creamos los hooks de estado con los datos del usuario
    const [userData, setUserData] = useState({
        "first_name": null,
        "last_name": null,
        "email": null
    });

    // useEffect para coger los datos del usuario al cargar
    useEffect(() => {

        const fetchData = async () => {
            const url = `http://127.0.0.1/api/users/?token=` + state.token;
            const options = {
                method: 'GET',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }),
                mode: 'cors'
            };

            return fetch(url, options)
                .then(response => {
                    if (response.status >= 200 && response.status < 400) {
                        return response.json();
                    } else {
                        return Promise.reject(response.status);
                    }
                })
                .then(data => {
                    return setUserData({
                        "first_name": data.first_name,
                        "last_name": data.last_name,
                        "email": data.email
                    });
                })
                .catch(error => {
                    console.log("Error al hacer el fetch de @me. Error: " + error);
                    if (error === 401) {
                        console.log("Token inválido, probablemente caducado. Hacemos logout.");
                        dispatch({type: "DO_LOGOUT"});

                    }
                });
        };

        fetchData();

    }, [dispatch, state.token]);


    return (<AuthContext.Consumer>
        {props =>
            <div className="profilepage">
                <div id="profile-info">
                    <div className="user-info">
                        <p>Name: {userData.first_name ? userData.first_name : "?"}</p>
                        <p>Last Name: {userData.last_name ? userData.last_name : "?"}</p>
                        <p>Email: {userData.email ? userData.email : "?"}</p>
                    </div>
                    <div className="user-edit">
                        <ButtonPopup/>
                    </div>
                </div>
            </div>
        }
    </AuthContext.Consumer>)
}

export default Profilepage;
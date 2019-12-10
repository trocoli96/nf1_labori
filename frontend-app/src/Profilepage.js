import React, {useState, useEffect, useContext} from 'react';
import './App.css';
import AuthContext from "./utils/AuthFront/context";

import ButtonPopup from "./Buttonpopup";

function Profilepage() {

    const {state, dispatch} = useContext(AuthContext);

    const [userData, setUserData] = useState({
        "first_name": null,
        "last_name": null,
        "email": null,
    });

    // useEffect para coger los datos del usuario al cargar
    useEffect(() => {

        // lo primero, cogemos el token, de forma síncrona
        const token = dispatch({type: "GET_CURRENT_TOKEN"});

        // si no hay token, dispatchamos logout
        if (!token) {
            dispatch({"type": 'DO_LOGOUT'});
            return;
        }

        const fetchData = async () => {
            const url = `http://127.0.0.1/api/users/`;
            const options = {
                method: 'GET',
                headers: new Headers({
                    Accept: 'application/json',
                    'Access-Control-Allow-Headers': 'Authorization',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token.access_token,
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
            .catch(error => console.log("Error"));
        };

        fetchData();

    }, []);

    /*return */

    return (<AuthContext.Consumer>
        {props => userData.first_name ?
                <div className="profilepage">
                    <div id="profile-info">
                        <div className="user-info">
                            <p>Name and Last Name: {state.userData.email}</p>
                            <p>Former name</p>
                            <p>City,Country</p>
                        </div>
                        <div className="user-edit">
                            <ButtonPopup/>
                        </div>
                    </div>
                </div>
             : <p>No hay first_name en userData</p>}
    </AuthContext.Consumer>)
}

export default Profilepage;

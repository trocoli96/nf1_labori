import React, {useState, useEffect, useContext} from 'react';
import './App.css';
import AuthContext from "./utils/AuthFront/context";
import ButtonPopup from "./Buttonpopup";

function Profilepage() {

    // recogemos lo proveído por el context
    const {state, dispatch} = useContext(AuthContext);

    // creamos los hooks de estado con los datos del usuario
    const [userData, setUserData] = useState({
        "first_name": null,
        "last_name": null,
        "email": null
    });

    // guardamos el token proveído por el estado
    let token = state.token;

    // useEffect para coger los datos del usuario al cargar
    useEffect(() => {

        const fetchData = async () => {
            // TODO: DISPATCH DE "IS FETCHING"
            const url = `http://127.0.0.1/api/users/`;
            const options = {
                method: 'GET',
                headers: new Headers({
                    Accept: 'application/json',
                    'Access-Control-Allow-Headers': 'Authorization',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                }),
                mode: 'cors'
            };

            return fetch(url, options)
                .then(response => {
                    if (response.status >= 200 && response.status < 400) {
                        console.log("Recogimos los datos de @me!");
                        return response.json();
                    } else {
                        return Promise.reject(response.status);
                    }
                })
                .then(data => {
                    // TODO: DISPATCH DE "IS NOT FETCHING ANYMORE"
                    return setUserData({
                        "first_name": data.first_name,
                        "last_name": data.last_name,
                        "email": data.email
                    });
                })
            .catch(error => {
                // TODO: DISPATCH DE "IS NOT FETCHING ANYMORE"
                console.log("Error al hacer el fetch de @me")});
        };

        fetchData();

    }, [dispatch, token]);


    return (<AuthContext.Consumer>
        {props =>
            // TODO: para cuando ya funcione bien, la lógica sería if state.isFetching ---> spinner
                <div className="profilepage">
                    <div id="profile-info">
                        <div className="user-info">
                            <p>Name: {userData.first_name ? userData.first_name : "?" }</p>
                            <p>Last Name: {userData.last_name ? userData.last_name : "?" }</p>
                            <p>Email: {userData.email ? userData.email : "?" }</p>
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

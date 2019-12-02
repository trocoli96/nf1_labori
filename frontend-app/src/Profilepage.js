import './App.css';
import ButtonPopup from "./Buttonpopup";
import React, {useEffect, useReducer} from 'react';


function Profilepage() {

    const VIEW_USER = 'VIEW_USER';
    const SET_ERROR = 'SET_ERROR';

    const initialState = {
        userData: [],
        error: false,
    };

    const userReducer = (state = initialState, action) => {
        const newState = { ...state };
        const { type } = { ...action };

        if (type === VIEW_USER) {
            newState.userData = action.userData;
        }
        if (type === SET_ERROR) {
            newState.error = action.error;
        }
        return newState;
    };

    const [state, dispatch] = useReducer(userReducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            const url = 'http://127.0.0.1/api/users/2?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjFcL2FwaVwvbG9naW4iLCJpYXQiOjE1NzUzMDk1NzAsImV4cCI6MTU3NTMxMzE3MCwibmJmIjoxNTc1MzA5NTcwLCJqdGkiOiJtQ09mYjRpVkxrdWJUaFVaIiwic3ViIjoyLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.gGhu4STmCQjAmXDmoa6tItBvPXnViVpwy2bVzdLnV8c';
            const options = {
                method: 'GET',
                headers: new Headers({
                    Accept: 'application/json',
                    'Access-Control-Allow-Headers': 'Authorization',
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
            dispatch({ type: VIEW_USER, userData: data});
        })
        .catch(error => dispatch({ type: SET_ERROR, error: true }));
};
        fetchData();

    }, []);
            return state.data ? (
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


            ) : <p>hola</p>;
        }

        export default Profilepage;

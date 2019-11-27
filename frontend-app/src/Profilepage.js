
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
            newState.userData = action.data;
        }
        if (type === SET_ERROR) {
            newState.error = action.error;
        }
        return newState;
    };

    const [state, dispatch] = useReducer(userReducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            const url = 'http://127.0.0.1/api/users/4';
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
            dispatch({ type: VIEW_USER, data: data.results });
        })
        .catch(error => dispatch({ type: SET_ERROR, error: true }));
};
        fetchData();

    }, []);
            return state.data ? (
                <div className="profilepage">

                    <div id="profile-info">
                        <div className="user-info">
                            <p>Name and Lastname: {state.userData.email}</p>
                            <p>Former name</p>
                            <p>City,Country</p>
                        </div>
                        <div className="user-edit">
                            <ButtonPopup/>
                        </div>
                    </div>
                </div>


            ) : <p>no exists</p>;
        }

        export default Profilepage;

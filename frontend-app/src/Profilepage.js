import React from 'react';
import './App.css';
import ButtonPopup from "./Buttonpopup";
import Container from

function Profilepage() {

    return (
        <div className="profilepage">

            <div id="profile-info">
                <Container maxWidth="sm" />
                <p>Name and Lastname</p>
                <p>Former name</p>
                <p>City,Country</p>
                </div>
                <div className="user-edit">
                    <ButtonPopup/>

            </div>
        </div>


    );
};

export default Profilepage;
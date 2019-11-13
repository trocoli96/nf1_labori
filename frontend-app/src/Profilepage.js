import React from 'react';
import './App.css';
import ButtonPopup from "./Buttonpopup";
import Header from "./Header";

function Profilepage() {

    return (
        <div className="profilepage">

            <div id="profile-info">
                <div className="user-info">
                <p>Name and Lastname</p>
                <p>Former name</p>
                <p>City,Country</p>
                </div>
                <div className="user-edit">
                    <ButtonPopup/>
                </div>
            </div>
        </div>


    );
};

export default Profilepage;
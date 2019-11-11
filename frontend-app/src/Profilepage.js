import React from 'react';
import './App.css';
import Header from "./Header";

function Profilepage() {

    return (
        <div>
       <Header />
        <div id="profile-info">
            <div className="user-info">
            <p>Name and Lastname</p>
            <p>Former name</p>
            <p>City,Country</p>


        </div>


    );
};

export default Profilepage;
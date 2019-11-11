import React from 'react';
import './App.css';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';


function Homebutton() {
    return (
        <div>
            <button className="nav-button">
            <HomeOutlinedIcon className="home-icon" style={{ fontSize: 25 }}>Home</HomeOutlinedIcon>
            <p className="button-header-text">Home</p>
            </button>
        </div>

);
}


export default Homebutton;
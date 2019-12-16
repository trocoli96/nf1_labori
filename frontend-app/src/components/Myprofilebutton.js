import React from 'react';
import '../App.css';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

function Myprofilebutton() {
    return (
        <div>
            <button className="nav-button">
                <PersonOutlineOutlinedIcon className="home-icon" style={{ fontSize: 25 }}>Profile</PersonOutlineOutlinedIcon>
                <p className="button-header-text">Me</p>
            </button>
        </div>

    );
}


export default Myprofilebutton;
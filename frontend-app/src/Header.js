import React from 'react';
import './App.css';
import logo from "./logo-icon.png";
import Homebutton from "./Homebutton";
import Myprofilebutton from "./Myprofilebutton";

function Header() {
  return (
    <div className="header">
      <div id="header-content-left">
        <img alt="logo-icon" src={logo} className="icon-image"/>
        <div className="search">
            <form className="search-bar-form">
                <input type="search" className="search-bar" placeholder="Search">
                </input>
            </form>
        </div>
      </div>
        <div id="header-content-right">
         <textfield/>
      <Homebutton />
      <Myprofilebutton/>
    </div>
    </div>


  );
}

export default Header;

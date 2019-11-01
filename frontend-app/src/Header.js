import React from 'react';
import './App.css';
import logo from "./logo-icon.png";

function Header() {
  return (
    <div className="header">
      <div id="header-content">
        <img alt="logo-icon" src={logo} className="icon-image"/>
        <div className="search">
            <form className="search-bar-form">
                <input type="search" className="search-bar" placeholder="Search">
                </input>
            </form>
        </div>
    </div>
    </div>


  );
}

export default Header;

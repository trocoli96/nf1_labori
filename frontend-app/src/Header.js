import React from 'react';
import './App.css';
import logo from "./logo-icon.png";

function Header() {
  return (
    <div className="Header">
      <div className="Header-content">
        <img alt="logo-icon" src={logo} className="icon-image"/>
      </div>
        <div className="search-bar">
            Searche
        </div>
    </div>
  );
}

export default Header;

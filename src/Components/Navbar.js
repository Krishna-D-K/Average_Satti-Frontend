import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "../Styles/NavbarStyle.css";

export default function Navbar() {
  const [navicon, setNavicon] = useState('navicon')
  const [toggle, setToggle] = useState('toggle');

  const renderNavbar = (e) => {
    e.preventDefault();
    (navicon === "navicon") ? setNavicon("navicon navicon--active") : setNavicon("navicon");
    (toggle === "toggle") ? setToggle("toggle toggle--active") : setToggle("toggle");
  }
  return (
    <div>
      <span className={navicon} onClick={renderNavbar} />
      <div className={toggle}>
        <div className="navbar-container">
          <h1>Toggle Menu</h1>
          <ul className="toggle__menu">
            <li onClick={renderNavbar}><Link to="/">Home</Link></li>
            <li onClick={renderNavbar}><Link to="/courses">Courses</Link></li>
            <li onClick={renderNavbar}><Link to="/login">Login</Link></li>
            <li onClick={renderNavbar}><Link to="/about">About</Link></li>
          </ul>
          <ul className="social">
            <li><a href="https://github.com/Kirbaba"><i className="fa fa-github" /></a></li>
            <li><a href="https://twitter.com/VladKirbaba"><i className="fa fa-twitter" /></a></li>
            <li> <a href="https://www.facebook.com/VladislavKirbaba"><i className="fa fa-facebook" /></a></li>
            <li><a href="https://vk.com/vladislavkirbaba"> <i className="fa fa-vk" /></a></li>
          </ul>
        </div>
      </div>
    </div>

  )
}

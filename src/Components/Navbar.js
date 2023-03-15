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
        <div className="navbar-container gradient-custom text-center text-white">
          <h1>Toggle Menu</h1>
          <ul className="toggle__menu">
            <li onClick={renderNavbar}><Link to="/">Home</Link></li>
            <li onClick={renderNavbar}><Link to="/courses">Courses</Link></li>
            <li onClick={renderNavbar}><Link to="/login">Login</Link></li>
            <li onClick={renderNavbar}><Link to="/contributors">Contributors</Link></li>
          </ul>
          <div className="social">
            <a href="https://github.com/Krishna-D-K/Project-Frontend"><i className="fa-brands fa-github fa-lg"></i></a>
            <a href="mailto:iwannabeflash@gmail.com"><i className="fa-solid fa-envelope fa-lg"></i></a>
          </div>
        </div>
      </div>
    </div>

  )
}

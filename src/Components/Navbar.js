import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Styles from "../Styles/NavbarStyle.module.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import hamburger from '../images/hamburger.png';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" id={Styles.navBG} sticky="top">
      <Container className={Styles.container}>
        <Navbar.Brand className={Styles.brandName}><Link to='/'>AVERAGE_SATTI</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className={Styles.hamburger}><img src={hamburger} style={{"height":"1.5rem", "filter": "brightness(75%)"}}/></Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className={Styles.navLinks} eventKey="0"><Link to='/courses'>Courses</Link></Nav.Link>
            <Nav.Link className={Styles.navLinks} eventKey="1"><Link to='/login'>Admin</Link></Nav.Link>
            <Nav.Link className={Styles.navLinks} eventKey="2"><Link to='/contributors'>Contributors</Link></Nav.Link>
          </Nav>
          <Navbar.Text id={Styles.navText}>
            contribute: <a href="https://github.com/Krishna-D-K/Project-Frontend" target='_blank' rel='noreferrer'><i className="fa-brands fa-github fa-lg" /></a>
            email: <a href="mailto:iwannabeflash@gmail.com"  target='_blank' rel='noreferrer'><i className="fa-solid fa-envelope fa-lg" /></a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

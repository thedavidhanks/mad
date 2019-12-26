import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom';

const MenuBar = () =>{
    return(
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="/">Margee and Dave</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/whereintheworld">Map</Nav.Link>
            </Nav>
        </Navbar>
    );
};
export default MenuBar
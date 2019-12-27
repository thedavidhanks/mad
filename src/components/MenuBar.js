import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

//Link provides react router page switching without reloading the page.
import { Link } from 'react-router-dom';

const MenuBar = () =>{
    return(
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand as={Link} to="/">Margee and Dave</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/whereintheworld">Map</Nav.Link>
            </Nav>
        </Navbar>
    );
};
export default MenuBar
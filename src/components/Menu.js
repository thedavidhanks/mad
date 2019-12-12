import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

const Menu = () =>{
    return(
        <Dropdown>
            <Dropdown.Toggle id="dropdown-menu">=</Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/">Home</Dropdown.Item>
                <Dropdown.Item as={Link} to="/wherearethey">Map</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};
export default Menu
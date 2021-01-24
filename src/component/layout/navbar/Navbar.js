import React, { Component } from 'react'
import { StyledNavbar } from './NavStyle'
import { NavbarBrand, Nav } from 'react-bootstrap'

class Navbar extends Component {
    render() {
        return (
            <StyledNavbar>
                <NavbarBrand>Blog</NavbarBrand>
                <Nav.Link>Home</Nav.Link>
            </StyledNavbar>
        );
    }
}

export default Navbar;

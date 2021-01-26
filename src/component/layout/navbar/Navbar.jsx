import React, { Component } from 'react'
import { StyledNavbar } from './NavStyle'
import { NavbarBrand, Nav, NavDropdown } from 'react-bootstrap'
import { history } from "../../History";

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout = (evt)=> {
        evt.preventDefault()
        localStorage.removeItem('username')
        localStorage.removeItem('token')
        history.push('/')
    }

    render() {
        return (
            <StyledNavbar collapseOnSelect expand="lg">
                <NavbarBrand>Blog</NavbarBrand>
                <StyledNavbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto" />
                    <Nav.Link className="nav-style">Home</Nav.Link>
                    <NavDropdown id="collapsible-nav-dropdown" title={this.props.user} style={{color: 'white'}}>
                        <NavDropdown.Item onClick={this.handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </StyledNavbar.Collapse>
            </StyledNavbar>
        );
    }
}

export default Navbar;

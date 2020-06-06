// the navbar is in it's own file so that it can easily be imported to other pages
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

class Navigation extends Component {
    render() {
        return (
            <div>
            <Navbar class="navbar" variant="dark" expand="md">
                <Navbar.Brand href="/"><strong>Personal Database</strong></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    <Nav>
                        <Nav.Link class="navbar-link" href="/signup">
                            <p class="navbar-link-text"><strong>Signup</strong></p>
                        </Nav.Link>
                        <Nav.Link class="navbar-link" href="/login">
                            <p class="navbar-link-text"><strong>Login</strong></p>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
        )
    }
}

export default Navigation

import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Navigation() {
    return (
        <div>
            <Navbar sticky="top" bg="dark" variant="dark">
                <Navbar.Brand className="d-flex" as={Link} to="/">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/posts">Posts</Nav.Link>
                    <Nav.Link as={Link} to="/calendar">Calendar</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    )
}

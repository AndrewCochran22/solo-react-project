import React from 'react';
import { Dropdown, DropdownButton, Form, InputGroup, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Navigation() {
    return (
        <div>
            <Navbar sticky="top" bg="dark" variant="primary">
                <Navbar.Brand className="d-flex" as={Link} to="/">EventScheduler</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/posts">Events</Nav.Link>
                    <Nav.Link as={Link} to="/calendars">Calendar</Nav.Link>
                </Nav>
                <Form inline>
                    <InputGroup>
                        <DropdownButton
                            as={InputGroup.Append}
                            variant="outline-primary"
                            title="Register/Login"
                            id="input-group-dropdown-2"
                        >    
                            <Dropdown.Item as={Link} to="/register">Register</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
                        </DropdownButton>
                    </InputGroup>
                </Form>
            </Navbar>
        </div>
    )
}

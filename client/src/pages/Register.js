import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Register() {
    const history = useHistory();
    const [ form, setForm ] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('/api/v1/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: form.username,
                password: form.password,
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    alert('User Registered Successfully')
                    history.push('/login');
                }
            })
    }

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    return (
        <Form onSubmit={handleSubmit}><br />
            <Row>
                <Col>
                <Form.Control label="Username" type="text" name="username" onChange={handleChange} value={form.username} placeholder="Username" />
                </Col>
                <Col>
                <Form.Control label="Password" type="password" name="password" onChange={handleChange} value={form.password} placeholder="Password" />
                </Col>
            </Row><br />
            <Row>
                <Col>
                <Form.Control label="FirstName" type="text" name="firstName" onChange={handleChange} value={form.firstName} placeholder="First Name" />
                </Col>
                <Col>
                <Form.Control label="LastName" type="text" name="lastName" onChange={handleChange} value={form.lastName} placeholder="Last Name" />
                </Col>
            </Row><br />
            <Row>
                <Col>
                    <Form.Control label="Email" type="email" name="email" onChange={handleChange} value={form.email} placeholder="Email" />
                </Col>
            </Row><br />
            <Row>
                <Col>
                    <Button size="lg" as="input" type="submit" value="Submit" block />{' '}
                </Col>
            </Row>
        </Form>
    )
}

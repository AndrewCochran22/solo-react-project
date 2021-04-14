import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Login() {
    const history = useHistory();
    const [ form, setForm ] = useState({
        username: '',
        password: '',
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: form.username,
                password: form.password,
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    alert('User Logged In Successfully')
                    history.push('/');
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
                <Form.Control label="Username" onChange={handleChange} value={form.username} name="username" placeholder="Username" />
                </Col>
                <Col>
                <Form.Control label="Password" onChange={handleChange} value={form.password} name="password" placeholder="Password" />
                </Col>
            </Row><br />
            <Row>
                <Col>
                    <Button size="lg" as="input" type="submit" value="Login" block />{' '}
                </Col>
            </Row>
        </Form>
    )
}

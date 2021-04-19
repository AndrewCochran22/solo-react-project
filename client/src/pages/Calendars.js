import React, { useState } from 'react';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import { Button, Form } from 'react-bootstrap';
import '../picker.css'

export default function Calendars() {
    // const [ value, onChange ] = useState(new Date());
    const [ form, setForm ] = useState({
        title: '',
        content: '',
        startDate: new Date(),
        endDate: new Date()
    })

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }
    
    const handleDateChange = (value) => {
        console.log(value)
        setForm({
            ...form,
            startDate: value[0],
            endDate: value[1]
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('/api/v1/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: form.title,
                content: form.content,
                startDate: form.startDate,
                endDate: form.endDate,
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    alert(data.error)
                } else {
                    alert('Submitted');
                    setForm({
                        title: '',
                        content: '',
                        startDate: new Date(),
                        endDate: new Date()
                    });
                }
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1  className="text-center">Make an Event</h1>
            <div  className="text-center">
                <DateTimeRangePicker
                    onChange={handleDateChange}
                    value={[form.startDate, form.endDate]}
                    name="date"
                    minDate={new Date()}
                    // isCalendarOpen={true}
                    // disableClock={true}
                    // closeWidgets={false}
                />
                <Button variant="primary" size="sm" type="submit" className="mb-1 ml-1">Submit</Button>{' '}
            </div>
            <div className="m-3 p-3">
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label><h4>Event</h4></Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="What are you doing? (Hiking, Beers, etc.)" 
                    onChange={handleChange}
                    value={form.title}
                    name="title"
                />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label><h4>Gameplan</h4></Form.Label>
                <Form.Control 
                    type="text" 
                    as="textarea" 
                    placeholder="Give me some details! (Trisha's Birthday, Taco Tuesday, etc.)"
                    onChange={handleChange}
                    value={form.content}
                    name="content"
                />
            </Form.Group>
            </div>
        </form>
    )
}

import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

export default function Rsvps(props) {
    const [ attend, setAttend ] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch( `/api/v1/posts/${props.postId}/rsvps`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                attend,
            })
        })
            .then(res => res.json())
            .then((data) => {
                if (data.error) {
                    alert(data.error);
                } else {
                alert("Rsvp'd!")
            }
        })
    }

    return (
        <div>
            {}
            <Button onclick={handleSubmit} type="button"></Button>
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import { Badge, Button, Form } from 'react-bootstrap';

export default function Comment(props) {
    const [ showForm, setShowForm ] = useState(false);
    const [ text, setText ] = useState('');
    const [ comments, setComments ] = useState([]);

    const getComments = () => {
        fetch(`/api/v1/posts/${props.postId}/comments`)
            .then(res => res.json())
            .then(data => {
                if(data.error) {
                    alert(data.error)
                } else {
                    setComments(data);
                }
            })
    }

    useEffect(() => {
        getComments();
    }, [props.postId])

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`/api/v1/posts/${props.postId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    alert('Comment Submitted')
                    setText('');
                    setShowForm(false);
                    getComments();
                }
            })
    }

    return (
        <div>
            <div>
                {comments.map((comment) => {
                    return(
                        <div key={comment.id}>
                            <p><Badge variant="danger">{comment.User.firstName} {comment.User.lastName}</Badge>{' '}{comment.text}</p>
                            {/* <h6>{comment.UserId}</h6> */}
                        </div>
                    )
                })}
            </div>
            <div>
                {showForm ? (
                    <form onSubmit={handleSubmit}>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control
                                placeholder="Like the idea? Want to change the details or time?"
                                as="textarea"
                                rows={3}
                                onChange={(event) => setText(event.target.value)}
                                value={text}
                            />
                        </Form.Group><br />
                        <Button type="submit">Submit</Button>
                    </form>
                ) : (
                    <Button onClick={() => setShowForm(!showForm)}>Add Comment</Button>
                    )}
            </div>
        </div>
    )
}

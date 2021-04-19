import React, { useEffect, useState } from 'react'
import { Button, ListGroup } from 'react-bootstrap';
import Moment from 'react-moment';
import Comments from '../components/Comments'

export default function Posts() {
    const [ posts, setPosts ] = useState([])

    useEffect(() => {
        fetch('/api/v1/posts')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setPosts(data);
            })
    }, [])

    return (
        <div>
            <h1 className="text-center">Events</h1>
            {
                posts.map((post) => {
                    return (
                        <ListGroup key={post.id} className="m-3 pl-3 pr-3">
                            <ListGroup.Item as="li" active variant="primary" className="text-center"><Button variant="danger" className="justify-content-start">RSVP</Button> EVENT: {post.title}</ListGroup.Item>
                            <ListGroup.Item variant="primary">CONTENT: {post.content}</ListGroup.Item>
                            <ListGroup.Item variant="primary">DATE: <Moment format="LLLL">{post.startDate}</Moment> ==> <Moment format="LLLL">{post.endDate}</Moment></ListGroup.Item>
                            <ListGroup.Item variant="primary">COMMENT: <Comments postId={post.id} /></ListGroup.Item><br/>
                            {/* <ListGroup.Item variant="primary"><Button></Button></ListGroup.Item><br /> */}
                        </ListGroup>
                        // <div key={post.id}>
                        //     <h3>Title</h3>
                        //     <p>{post.title}</p>
                        //     <h3>Content</h3>
                        //     <p>{post.content}</p>
                        //     <h3>To/From</h3>
                        //     <p><Moment format="LLLL">{post.startDate}</Moment></p>
                        //     <p><Moment format="LLLL">{post.endDate}</Moment></p>
                        // </div>
                    )
                })
            }
        </div>
    )
}

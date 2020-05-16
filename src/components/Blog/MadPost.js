import React from 'react';
import Card from 'react-bootstrap/Card';
import { Markup } from 'interweave';

const MadPost = (props) => {
    const postedTime = new Date(props.date);
    return(
    <Card className='blogPosts'>
        <Card.Body>
            <Card.Title>{props.title}</Card.Title>
                <Markup content={props.children} /><br />
                <Card.Text><b>-{props.author}</b> on {postedTime.toUTCString()}</Card.Text>
        </Card.Body>
    </Card>
)};
export default MadPost;



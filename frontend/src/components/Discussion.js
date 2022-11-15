import React from 'react';
import {Button, Card} from "react-bootstrap";

const Discussion = (props) => {
    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>
                        {props.data.subject}
                    </Card.Title>
                    <Card.Text>
                        {props.data.text}
                    </Card.Text>

                    <Button href={`http://localhost:3000/discussion?id=${props.data._id}`}>K diskuzi</Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default Discussion;
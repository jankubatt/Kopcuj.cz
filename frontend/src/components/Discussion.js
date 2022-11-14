import React from 'react';
import {Button, Card} from "react-bootstrap";

const Discussion = (props) => {
    return (
        <>
            <Card key={props.data._id} sx={{marginTop: "10px"}}>
                <Card.Body>
                    <Card.Title>
                        {props.data.subject}
                    </Card.Title>
                    <Card.Text variant="body2">
                        {props.data.text}
                    </Card.Text>

                    <Button sx={{marginTop: "5px"}} variant="contained"><a
                        href={`http://localhost:3000/discussion?id=${props.data._id}`}>K diskuzi</a></Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default Discussion;
import React from 'react';
import {Button, Card} from "react-bootstrap";
import Username from "./Username";

const Discussion = (props) => {
    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>
                        <div className={"d-flex justify-content-between"}>
                            <div>
                                {props.data.subject}
                            </div>
                            <div>
                                <Username user={props.data.user}/>
                            </div>
                        </div>
                    </Card.Title>
                    <Card.Text>
                        {props.data.text}
                    </Card.Text>

                    <Button href={`http://localhost:3000/discussion?id=${props.data._id}`} className={"btn2"}>K
                        diskuzi</Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default Discussion;
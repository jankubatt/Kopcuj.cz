import React, {useEffect, useState} from 'react';
import {Button, Card} from "react-bootstrap";
import Username from "./Username";
import axios from "axios";

const Discussion = (props) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()

    const fetchUser = async () => {
        const response = await axios.get(`http://localhost:8082/api/users/${props.discussion.id_user}`);
        return response.data;
    }

    useEffect(() => {
        fetchUser().then((res) => {
            setUser(res);
            setLoading(false)
        })
    }, [])

    if (loading) return "Loading...";

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>
                        <div className={"d-flex justify-content-between"}>
                            <div>
                                {props.discussion.subject}
                            </div>
                            <div>
                                <Username user={user}/>
                            </div>
                        </div>
                    </Card.Title>
                    <Card.Text>
                        {props.discussion.text}
                    </Card.Text>

                    <Button href={`http://localhost:3000/discussion?id=${props.discussion._id}`} className={"btn2"}>K
                        diskuzi</Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default Discussion;
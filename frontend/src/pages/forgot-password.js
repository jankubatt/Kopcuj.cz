import React, {useRef} from 'react';
import '../App.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Button, Card, Form} from "react-bootstrap";

axios.defaults.withCredentials = true;

function ForgotPassword() {
    //Ref for storing form values
    const email = useRef();

    let navigate = useNavigate();

    //handles submit button
    const handleSubmit = (event) => {
        event.preventDefault(); //prevent reload of page

        //post data to database
        axios.post("/api/users/forgot-password", {email: email.current.value})
            .then(() => {
                navigate("/login")
            })
            .catch(err => {
                console.log("Error in register user!\n" + err);
            });
    }

    return (
        <div className='container w-50'>
            <Card>
                <Card.Body>
                    <Card.Title>
                        <h1>Zapomenuté heslo</h1>
                    </Card.Title>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label className={"mb-0"} htmlFor="email">E-Mail</Form.Label><br/>
                            <Form.Control className={"textarea"} ref={email} type="text" name={"email"}
                                          placeholder={"E-Mail"}/>
                        </Form.Group>

                        <div className={"d-flex justify-content-end"}>
                            <Button className='btn2 mt-2' type="submit">Odeslat</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ForgotPassword;
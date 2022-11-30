import React, {useRef} from 'react';
import '../App.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Button, Card, Form} from "react-bootstrap";

axios.defaults.withCredentials = true;

function ChangePassword() {
    //Ref for storing form values
    const pass = useRef();
    const passAgain = useRef();

    let navigate = useNavigate();
    const qs = require('query-string');
    const parsed = qs.parse(document.location.search);

    //handles submit button
    const handleSubmit = (event) => {
        event.preventDefault(); //prevent reload of page

        const data = {
            pass: pass.current.value,
            passAgain: passAgain.current.value,
            token: parsed.token
        };

        if (data.pass === data.passAgain) {
            //post data to database
            axios.post("/api/users/change-password", data)
            .then(() => {
                return navigate("/login");
            })
            .catch(err => {
                console.log("Error in change password user!\n" + err);
            });
        }
        else {
            alert("Hesla se neshodují!");
        }
    }

    return (
        <div className='container w-50'>
            <Card>
                <Card.Body>
                    <Card.Title>
                        <h1>Změna hesla</h1>
                    </Card.Title>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-2'>
                            <Form.Label htmlFor="pass">Heslo</Form.Label>
                            <Form.Control ref={pass} className={"textarea"} type="password" name={"pass"}
                                          placeholder={"Heslo"}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="passAgain">Heslo znovu</Form.Label>
                            <Form.Control ref={passAgain} className={"textarea"} type="password" name={"passAgain"}
                                          placeholder={"Heslo znovu"}/>
                        </Form.Group>

                        <div className={"d-flex justify-content-end"}>
                            <Button className='btn2 mt-2' type="submit">Změnit</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ChangePassword;
import React, {useRef} from 'react';
import '../App.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Button, Form} from "react-bootstrap";

axios.defaults.withCredentials = true;

function ForgotPassword() {
    //Ref for storing form values
    const email = useRef();

    let navigate = useNavigate();

    //handles submit button
    const handleSubmit = (event) => {
        event.preventDefault(); //prevent reload of page

        //post data to database
        axios.post("http://localhost:8082/api/users/forgot-password", {email: email.current.value})
            .then(() => {
            })
            .catch(err => {
                console.log("Error in register user!\n" + err);
            });
    }

    return (
        <div className='wrapper'>
            <Form onSubmit={handleSubmit}>
                <div className='input'>
                    <Form.Label htmlFor="email">E-Mail</Form.Label><br/>
                    <Form.Control ref={email} type="text" name={"email"}
                                  placeholder={"E-Mail"}/>
                </div>

                <Button className='btn-hoverable' type="submit">Odeslat</Button>
            </Form>
        </div>
    )
}

export default ForgotPassword;
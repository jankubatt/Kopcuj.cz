import React, {useRef} from 'react';
import '../App.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Button, Form} from "react-bootstrap";

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
            axios.post("http://localhost:8082/api/users/change-password", data)
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
        <div className='wrapper'>
            <Form onSubmit={handleSubmit}>
                <div className='input'>
                    <Form.Label htmlFor="pass">Heslo</Form.Label><br/>
                    <Form.Control type="password" name={"pass"}
                                  placeholder={"Heslo"}/>
                </div>

                <div className='input'>
                    <Form.Label htmlFor="passAgain">Heslo znovu</Form.Label><br/>
                    <Form.Control type="password" name={"passAgain"}
                                  placeholder={"Heslo znovu"}/>
                </div>

                <Button className='btn-hoverable' type="submit">Změnit</Button>
            </Form>

        </div>
    )
}

export default ChangePassword;
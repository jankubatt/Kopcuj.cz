import React, {useRef} from 'react';
import '../App.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Button, Card, Form} from "react-bootstrap";

axios.defaults.withCredentials = true;

function LoginPage() {
    //Ref for storing form values
    const username = useRef();
    const password = useRef();

    let navigate = useNavigate();

    //handles submit button
    const handleSubmit = (event) => {
        event.preventDefault(); //prevent reload of page

        const data = {
            login: username.current.value,
            pass: password.current.value
        };

        //post data to database
        axios.post("http://localhost:8082/api/users/login", data)
            .then(() => {
                return navigate("/");
            })
            .catch(err => {
                console.log("Error in login user!\n" + err);
            });
    }


    return (
        <div className='container login'>
            <Card style={{width: "40vw"}}>
                <Card.Body>
                    <Card.Title><h1>Přihlášení</h1></Card.Title>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className={"mb-3"}>
                            <Form.Label className={"mb-0"} htmlFor="username">Uživatelské jméno</Form.Label><br/>
                            <Form.Control className={"textarea"} ref={username} type="text" name={"username"}
                                          placeholder={"Uživatelské jméno"}/>
                        </Form.Group>

                        <Form.Group className={"mb-3"}>
                            <Form.Label className={"mb-0"} htmlFor="pass">Heslo</Form.Label><br/>
                            <Form.Control className={"textarea"} ref={password} type="password" name={"pass"}
                                          placeholder={"Heslo"}/>
                            <Form.Text><a href='/forgot-password'>Zapomenuté heslo</a></Form.Text>
                        </Form.Group>

                        <div className={"d-flex justify-content-end"}>
                            <Button className={"btn2"} type="submit">Přihlásit</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default LoginPage;
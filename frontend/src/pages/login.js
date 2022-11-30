import React, {useRef, useState} from 'react';
import '../App.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Alert, Button, Card, Form} from "react-bootstrap";

axios.defaults.withCredentials = true;

function LoginPage() {
    //Ref for storing form values
    const username = useRef();
    const password = useRef();

    const [error, setError] = useState(null);

    let navigate = useNavigate();

    //handles submit button
    const handleSubmit = (event) => {
        event.preventDefault(); //prevent reload of page

        const data = {
            login: username.current.value,
            pass: password.current.value
        };

        //post data to database
        axios.post("/api/users/login", data)
            .then((res) => {
                if (res.data === "details") return setError(`Špatné údaje`);
                return navigate("/");
            })
            .catch(err => {
                setError(`Něco se pokazilo.`)
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
                            <Form.Text><a href='/forgot-password'>Zapomenuté heslo</a></Form.Text><br/>
                            <Form.Text><a href='/register'>Registrovat se</a></Form.Text>
                        </Form.Group>

                        <div className={"d-flex justify-content-end"}>
                            <Button className={"btn2"} type="submit">Přihlásit</Button>
                        </div>
                    </Form>
                    {error !== null ? <Alert variant='danger'>{error}</Alert> : ""}
                </Card.Body>
            </Card>
        </div>
    )
}

export default LoginPage;
//IMPORTS
import React, {useRef, useState} from 'react';
import '../App.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Alert, Button, Card, Col, Form, Row} from "react-bootstrap";

function RegisterPage() {
    //Ref for storing form values
    const username = useRef();
    const nickname = useRef();
    const email = useRef();
    const pass = useRef();
    const passAgain = useRef();

    //Register errors
    const [error, setError] = useState(null)

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        let checkEmail;
        let checkUser;

        //get request to check, if email isn't already used
        await axios.get("/api/users/checkEmail/" + email.current.value).then(res => {
            checkEmail = res.data;
        });

        //get request to check if login isn't already used
        await axios.get("/api/users/checkLogin/" + username.current.value).then(res => {
            checkUser = res.data;
        });

        if (checkEmail !== "") {
            setError("Tento email byl již použit");
            return;
        }

        if (checkUser !== "") {
            setError("Toto uživatelské jméno je již použito");
            return;
        }

        //checks if password is written ok
        if (pass.current.value !== passAgain.current.value) {
            setError("Hesla se neshoduji");
            return;
        }

        const data = {
            login: username.current.value,
            name: nickname.current.value,
            email: email.current.value,
            pass: pass.current.value
        };

        //post data to database
        axios.post("/api/users/register", data).then(() => {
            return navigate("/login")
        })
    }

    return (
        <>
            <div className={"register"}>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h1>Registrace</h1>
                            </Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Row className={"mb-3"}>
                                    <Col>
                                        <Form.Label className={"mb-0"} htmlFor="usernameReg">Uživatelské
                                            jméno</Form.Label>
                                        <Form.Control ref={username} type="text" className={"form-control textarea"}
                                                      name={"usernameReg"}
                                                      placeholder={"Uživatelské jméno"} required/>
                                    </Col>
                                    <Col>
                                        <Form.Label className={"mb-0"} htmlFor="nickname">Přezdívka</Form.Label>
                                        <Form.Control ref={nickname} type="text" className={"form-control textarea"}
                                                      name={"nickname"}
                                                      placeholder={"Přezdívka"}/>
                                    </Col>
                                </Row>

                                <Form.Group className={"mb-3"}>
                                    <Form.Label className={"mb-0"} htmlFor="email">E-mail</Form.Label>
                                    <Form.Control ref={email} type="email" className={"form-control textarea"}
                                                  name={"email"}
                                                  placeholder={"E-mail"} required/>
                                </Form.Group>

                                <Form.Group className={"mb-3"}>
                                    <Form.Label className={"mb-0"} htmlFor="passReg">Heslo</Form.Label>
                                    <Form.Control ref={pass} type="password" className={"form-control textarea"}
                                                  name={"passReg"}
                                                  placeholder={"Heslo"} minLength={8} required/>
                                </Form.Group>

                                <Form.Group className={"mb-3"}>
                                    <Form.Label className={"mb-0"} htmlFor="passAgain">Heslo znovu</Form.Label>
                                    <Form.Control ref={passAgain} type="password" className={"form-control textarea"}
                                                  name={"passAgain"} placeholder={"Heslo znovu"} required/>
                                </Form.Group>

                                <span className={"d-flex justify-content-end"}>
                                        <Button type="submit" className="btn mt-3">Zaregistrovat</Button>
                                    </span>
                            </Form>

                            {error !== null ? <Alert variant='danger'>{error}</Alert> : ""}
                        </Card.Body>
                    </Card>
                </Col>

                <Col style={{textAlign: "center", color: "var(--c1)"}}>
                    <h1>Zaregistruj se</h1>
                    <h2>Užívej kopce</h2>
                    <h3>Komunikuj</h3>
                </Col>
            </div>
        </>
    )
}

export default RegisterPage;
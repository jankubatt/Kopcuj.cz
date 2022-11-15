//IMPORTS
import React, {useRef} from 'react';
import '../App.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Button, Form} from "react-bootstrap";

function RegisterPage() {
    //Ref for storing form values
    const username = useRef();
    const nickname = useRef();
    const email = useRef();
    const pass = useRef();
    const passAgain = useRef();

    const navigate = useNavigate();

    //handles submit button
    const handleSubmit = (event) => {
        event.preventDefault(); //prevent reload of page

        //get request to check, if email isn't already used
        axios.get("http://localhost:8082/api/users/checkEmail/" + email.current.value).then(res => {
            if (res.data != null) {
                alert("Tento email je již použit");
            } else {
                //get request to check if login isn't already used
                axios.get("http://localhost:8082/api/users/checkName/" + username.current.value).then(res => {
                    if (res.data != null) {
                        alert("Toto uživatelské jméno je již použito");
                    } else {
                        //checks if password is written ok
                        if (pass.current.value !== passAgain.current.value) {
                            alert("Hesla se neshoduji");
                        } else {
                            //form data
                            const data = {
                                login: username.current.value,
                                name: nickname.current.value,
                                email: email.current.value,
                                pass: pass.current.value
                            };

                            //post data to database
                            axios.post("http://localhost:8082/api/users/register", data)
                                .then(() => {
                                    return navigate("/login")
                                })
                                .catch(err => {
                                    console.log("Error in register user!\n" + err);
                                });
                        }
                    }
                })
            }
        });
    }

    return (
        <div className={"container-fluid"}>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="username">Uživatelské jméno</Form.Label>
                <Form.Control ref={username} type="text" className={"form-control"} name={"username"}
                              placeholder={"Uživatelské jméno"} required/>

                <Form.Label htmlFor="nickname">Přezdívka</Form.Label>
                <Form.Control ref={nickname} type="text" className={"form-control"} name={"nickname"}
                              placeholder={"Přezdívka"}/>

                <Form.Label htmlFor="email">E-mail</Form.Label>
                <Form.Control ref={email} type="email" className={"form-control"} name={"email"}
                              placeholder={"E-mail"} required/>

                <Form.Label htmlFor="pass">Heslo</Form.Label>
                <Form.Control ref={pass} type="password" className={"form-control"} name={"pass"}
                              placeholder={"Heslo"} minLength={8} required/>

                <Form.Label htmlFor="passAgain">Heslo znovu</Form.Label>
                <Form.Control ref={passAgain} type="password" className={"form-control"} name={"passAgain"}
                              placeholder={"Heslo znovu"} required/>

                <Button type="submit" className="btn btn-primary">Zaregistrovat</Button>
            </Form>

        </div>
    )
}

export default RegisterPage;
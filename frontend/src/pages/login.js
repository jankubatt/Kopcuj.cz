import React, {useRef} from 'react';
import '../App.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Button, Form} from "react-bootstrap";

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
        <div className='container'>
            <Form onSubmit={handleSubmit}>

                <Form.Label htmlFor="username">Uživatelské jméno</Form.Label><br/>
                <Form.Control ref={username} type="text" name={"username"}
                              placeholder={"Uživatelské jméno"}/>


                <Form.Label htmlFor="pass">Heslo</Form.Label><br/>
                <Form.Control ref={password} type="password" name={"pass"}
                              placeholder={"Heslo"}/>

                <br/><a href='/forgot-password'>Zapomenuté heslo</a><br/>

                <Button type="submit">Přihlásit</Button>
            </Form>
        </div>
    )
}

export default LoginPage;
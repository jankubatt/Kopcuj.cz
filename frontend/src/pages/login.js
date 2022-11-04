import React, {useState, useRef} from 'react';
import '../App.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

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
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <div className='input'>
                    <label htmlFor="username">Uživatelské jméno</label><br />
                    <input ref={username} type="text" name={"username"}
                        placeholder={"Uživatelské jméno"}/>
                </div>

                <div className='input'>
                    <label htmlFor="pass">Heslo</label><br/>
                    <input ref={password} type="password" name={"pass"}
                        placeholder={"Heslo"}/>
                </div>

                <br/><a href='/forgot-password'>Zapomenuté heslo</a><br/>

                <button className='btn-hoverable' type="submit">Přihlásit</button>
            </form>
        </div>
    )
}

export default LoginPage;
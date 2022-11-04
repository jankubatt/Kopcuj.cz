import React, {useState, useRef} from 'react';
import '../App.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

axios.defaults.withCredentials = true;

function ForgotPassword() {
    //Ref for storing form values
    const email = useRef();

    let navigate = useNavigate();

    //handles submit button
    const handleSubmit = (event) => {
        event.preventDefault(); //prevent reload of page

        //post data to database
        axios.post("http://localhost:8082/api/users/forgot-password", email.current.value)
            .then(() => {
            })
            .catch(err => {
                console.log("Error in register user!\n" + err);
            });
    }

    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <div className='input'>
                    <label htmlFor="email">E-Mail</label><br />
                    <input ref={email} type="text" name={"email"}
                        placeholder={"E-Mail"}/>
                </div>

                <button className='btn-hoverable' type="submit">Odeslat</button>
            </form>
        </div>
    )
}

export default ForgotPassword;
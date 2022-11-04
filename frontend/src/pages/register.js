//IMPORTS
import React, {useRef} from 'react';
import '../App.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

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
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Uživatelské jméno</label>
                <input ref={username}  type="text" className={"form-control"} name={"username"}
                       placeholder={"Uživatelské jméno"} required/>

                <label htmlFor="nickname">Přezdívka</label>
                <input ref={nickname}  type="text" className={"form-control"} name={"nickname"}
                       placeholder={"Přezdívka"}/>

                <label htmlFor="email">E-mail</label>
                <input ref={email}  type="email" className={"form-control"} name={"email"}
                       placeholder={"E-mail"} required/>

                <label htmlFor="pass">Heslo</label>
                <input ref={pass}  type="password" className={"form-control"} name={"pass"}
                       placeholder={"Heslo"} minLength={8} required/>

                <label htmlFor="passAgain">Heslo znovu</label>
                <input ref={passAgain}  type="password" className={"form-control"} name={"passAgain"}
                       placeholder={"Heslo znovu"} required/>

                <button type="submit" className="btn btn-primary">Zaregistrovat</button>
            </form>

        </div>
    )
}

export default RegisterPage;
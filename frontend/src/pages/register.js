//IMPORTS
import React, {useState} from 'react';
import '../App.css';
import axios from "axios";

function Register() {
    //State for storing form values
    const [state, setState] = useState({username: null, nickname: null, email: null, pass: null, passAgain: null});

    //function that handles changes in input boxes, when input changes, it gets written into state variable
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setState({...state, [name]: value});
    };

    //handles submit button
    const handleSubmit = (event) => {
        event.preventDefault(); //prevent reload of page

        //get request to check, if email isn't already used
        axios.get("http://localhost:8082/api/users/checkEmail/" + state.email).then(res => {
            if (res.data != null) {
                alert("Tento email je již použit");
            } else {
                //get request to check if login isn't already used
                axios.get("http://localhost:8082/api/users/checkName/" + state.username).then(res => {
                    if (res.data != null) {
                        alert("Toto uživatelské jméno je již použito");
                    } else {
                        //checks if password is written ok
                        if (state.pass !== state.passAgain) {
                            alert("Hesla se neshoduji");
                        } else {
                            //form data
                            const data = {
                                login: state.username,
                                name: state.nickname,
                                email: state.email,
                                pass: state.pass
                            };

                            //post data to database
                            axios.post("http://localhost:8082/api/users/register", data)
                                .then(() => {
                                    //redirect
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
                <input onChange={handleChange} type="text" className={"form-control"} name={"username"}
                       placeholder={"Uživatelské jméno"} required/>

                <label htmlFor="nickname">Přezdívka</label>
                <input onChange={handleChange} type="text" className={"form-control"} name={"nickname"}
                       placeholder={"Přezdívka"}/>

                <label htmlFor="email">E-mail</label>
                <input onChange={handleChange} type="email" className={"form-control"} name={"email"}
                       placeholder={"E-mail"} required/>

                <label htmlFor="pass">Heslo</label>
                <input onChange={handleChange} type="password" className={"form-control"} name={"pass"}
                       placeholder={"Heslo"} minLength={8} required/>

                <label htmlFor="passAgain">Heslo znovu</label>
                <input onChange={handleChange} type="password" className={"form-control"} name={"passAgain"}
                       placeholder={"Heslo znovu"} required/>

                <button type="submit" className="btn btn-primary">Zaregistrovat</button>
            </form>

        </div>
    )
}

export default Register;
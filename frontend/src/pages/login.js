import React, {useState} from 'react';
import '../App.css';
import '../Login.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

axios.defaults.withCredentials = true;

function LoginPage() {
    //State for storing form values
    const [state, setState] = useState({username: null, pass: null});
    let navigate = useNavigate();

    //function that handles changes in input boxes, when input changes, it gets written into state variable
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setState({...state, [name]: value});
    };

    //handles submit button
    const handleSubmit = (event) => {
        event.preventDefault(); //prevent reload of page

        const data = {
            login: state.username,
            pass: state.pass
        };

        //post data to database
        axios.post("http://localhost:8082/api/users/login", data)
            .then(() => {
                return navigate("/");
            })
            .catch(err => {
                console.log("Error in register user!\n" + err);
            });
    }


    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <div className='input'>
                    <label htmlFor="username">Uživatelské jméno</label><br />
                    <input onChange={handleChange} type="text" name={"username"}
                        placeholder={"Uživatelské jméno"}/>
                </div>

                <div className='input'>
                    <label htmlFor="pass">Heslo</label><br/>
                    <input onChange={handleChange} type="password" name={"pass"}
                        placeholder={"Heslo"}/>
                </div>

                <button type="submit">Přihlásit</button>
            </form>

        </div>
    )
}

export default LoginPage;
import React, {useState} from 'react';
import '../App.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

axios.defaults.withCredentials = true;

function ChangePassword() {
    //State for storing form values
    const [state, setState] = useState({username: null, pass: null});
    let navigate = useNavigate();
    const qs = require('query-string');
    const parsed = qs.parse(document.location.search);
    console.log(parsed);

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
            pass: state.pass,
            passAgain: state.passAgain,
            token: parsed.token
        };

        if (data.pass === data.passAgain) {
            //post data to database
            axios.post("http://localhost:8082/api/users/change-password", data)
            .then(() => {
                return navigate("/login");
            })
            .catch(err => {
                console.log("Error in change password user!\n" + err);
            });
        }
        else {
            alert("Hesla se neshodují!");
        }
    }

    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
            <div className='input'>
                    <label htmlFor="pass">Heslo</label><br/>
                    <input onChange={handleChange} type="password" name={"pass"}
                        placeholder={"Heslo"}/>
                </div>

                <div className='input'>
                    <label htmlFor="passAgain">Heslo znovu</label><br/>
                    <input onChange={handleChange} type="password" name={"passAgain"}
                        placeholder={"Heslo znovu"}/>
                </div>

                <button className='btn-hoverable' type="submit">Změnit</button>
            </form>

        </div>
    )
}

export default ChangePassword;
import React, {useState} from 'react';
import '../App.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

axios.defaults.withCredentials = true;

function ForgotPassword() {
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
            email: state.email,
        };
        console.log(data);
        //post data to database
        axios.post("http://localhost:8082/api/users/forgot-password", data)
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
                    <input onChange={handleChange} type="text" name={"email"}
                        placeholder={"E-Mail"}/>
                </div>

                <button className='btn-hoverable' type="submit">Odeslat</button>
            </form>
        </div>
    )
}

export default ForgotPassword;
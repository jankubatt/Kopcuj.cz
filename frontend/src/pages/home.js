import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from "axios";


function HomePage() {
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
        <>
           <div className='container'>
                <div className='navbar'>
                    <div className='navbrand'>Kopcuj.cz</div>
                    <div>
                        <div className='navbar-item btn'>Přihlásit</div>
                        <div className='navbar-item btn'>Zaregistrovat</div>
                    </div>
                </div>

                <div className='header'>
                    <div className='header-content'>
                        <div className='header-content-heading'>Poznávej kopce českého středohoří!</div>
                        <div className='header-content-text'>S naší aplikací to jde snadno a rychle. Stačí se zaregistrovat.</div>
                    </div>
                    <div className='register-form'>
                        <form onSubmit={handleSubmit}>
                            <input onChange={handleChange} type="text" className={"form-control"} name={"username"}
                                placeholder={"Uživatelské jméno"} required/>

                            <input onChange={handleChange} type="text" className={"form-control"} name={"nickname"}
                                placeholder={"Přezdívka"}/>

                            <input onChange={handleChange} type="email" className={"form-control"} name={"email"}
                                placeholder={"E-mail"} required/>

                            <input onChange={handleChange} type="password" className={"form-control"} name={"pass"}
                                placeholder={"Heslo"} minLength={8} required/>

                            <input onChange={handleChange} type="password" className={"form-control"} name={"passAgain"}
                                placeholder={"Heslo znovu"} required/>

                            <br />
                            <button type="submit" className="btn btn-primary">Zaregistrovat</button>
                        </form>
                    </div>
                </div>
           </div>
        </>
    )
}

export default HomePage;
import React from 'react';
import '../App.css';

function Login() {
    return (
        <div className={"container-fluid"}>
            <form>
                <label htmlFor="username">Uživatelské jméno</label>
                <input type="text" className={"form-control"} id={"username"} placeholder={"Uživatelské jméno"}/>

                <label htmlFor="pass">Heslo</label>
                <input type="password" className={"form-control"} id={"pass"} placeholder={"Heslo"}/>

                <button type="submit" className="btn btn-primary">Přihlásit</button>
            </form>

        </div>
    )
}

export default Login;
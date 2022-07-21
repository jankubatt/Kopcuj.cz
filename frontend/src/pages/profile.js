import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from "axios";
import Cookies from 'js-cookie';
import pfp from "../components/pfp.jpeg"

axios.defaults.withCredentials = true;

function Profile() {
    const [user, getUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:8082/api/users/token/' + Cookies.get('authToken'));
            return response.data;
        }
        fetchData()
            .then((res) => {
                getUser(res)
            })
            .catch((e) => {
                console.log(e.message)
            })
    }, [])


    return (
        <>
            <div className={"container text-center"}>
                <img src={pfp} alt={"profile"} className={"pfp mt-5"}/>

                <h1 className={"mt-5"}>{(user.name) ? user.name : user.login}</h1>
                <small className={"text-muted"}>{user.email}</small>

                <p className={"mt-5 align-left text-left w-50 text-"}>
                    {user.description}
                </p>
            </div>
        </>
    )
}

export default Profile;
import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from "axios";
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

function ProfilePage() {
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
            <h1>{user.name}</h1>
            <p>
                {JSON.stringify(user)}
            </p>
        </>
    )
}

export default ProfilePage;
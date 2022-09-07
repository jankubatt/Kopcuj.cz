import React, {useEffect, useState} from 'react';
import '../App.css';
import '../Profile.css';
import axios from "axios";
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

function ProfilePage() {
    const [user, getUser] = useState([]);
    const [hills, getHills] = useState([]);
    let climbedHills = [];
    let notClimbedHills = [];

    const fetchUser = async () => {
        const response = await axios.get('http://localhost:8082/api/users/token/' + Cookies.get('authToken'));
        return response.data;
    }

    const fetchHills = async () => {
        const response = await axios.get('http://localhost:8082/api/hills/');
        return response.data;
    }

    useEffect(() => {
        fetchUser()
            .then((res) => {
                getUser(res)
            })
            .catch((e) => {
                console.log(e.message)
            })

        fetchHills()
            .then((res) => {
                getHills(res)
            })
            .catch((e) => {
                console.log(e.message)
            })
    }, [])

    user.hills?.map((hillId) => {
        hills?.map((hill) => {
            if (hillId === hill._id) {
                climbedHills.push(hill);
            }
        })
    })

    let a;
    hills.map((hill) => {
        a = true;
        climbedHills.map((cHill) => {
            if (hill._id === cHill._id)
                a = false;
        })

        if (a)
            notClimbedHills.push(hill);
    });

    let uniqueNotClimbedHills;
    uniqueNotClimbedHills = [...new Set(notClimbedHills)];

    return (
        <>
            <div className={'container'}>
                <div className={'border border-dark rounded userInfo'}>
                    <h1>{user.name}</h1>
                    <p>
                        <b>login: </b> {user.login} <br/>
                        <b>email: </b> {user.email} <br/>
                        <b>description: </b> {user.description}
                    </p>
                </div>

                <div className={'border border-dark rounded climbed'}>
                    <b>Pokorene kopce: </b><br/>
                    {climbedHills.map(hill => <li key={hill._id}>{hill.name}</li>)}
                </div>

                <div className={'border border-dark rounded notClimbed'}>
                    <b>Zbyvajici kopce: </b><br/>
                    {uniqueNotClimbedHills.map(hill => <li key={hill._id}>{hill.name}</li>)}
                </div>

                <a href="/">
                    <button type="button" className="btn btn-primary">Domov</button>
                </a>
            </div>
        </>
    )
}

export default ProfilePage;
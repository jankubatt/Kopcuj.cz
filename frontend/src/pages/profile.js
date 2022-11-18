import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from "axios";
import Cookies from 'js-cookie';
import {Button, Card} from "react-bootstrap";

axios.defaults.withCredentials = true;

function ProfilePage() {
    const [user, getUser] = useState([]);
    const [hills, getHills] = useState([]);
    const [climbedHills, setClimbedHills] = useState([]);
    const [notClimbedHills, setNotClimbedHills] = useState([]);

    const fetchUser = async () => {
        const response = await axios.get('http://localhost:8082/api/users/token/' + Cookies.get('authToken'));
        return response.data;
    }

    const fetchHills = async () => {
        const response = await axios.get('http://localhost:8082/api/hills/');
        return response.data;
    }

    useEffect(() => {
        fetchUser().then((res) => {
            getUser(res)
        })

        fetchHills().then((res) => {
            getHills(res)
        })

        let cHills = [];
        hills?.forEach((hill) => {
            if (user.hills.includes(hill._id)) {
                cHills.push(hill);
            }
        })
        setClimbedHills(cHills);

        let ncHills = hills;
        climbedHills.forEach((hill) => {
            ncHills.remove(hill);
        })

        console.log(ncHills)
        setNotClimbedHills(ncHills);
    }, [])


    return (
        <>
            {notClimbedHills ? <div className={'container profile'}>

                <h1 className={"d-inline-block"}>{user.login}</h1>&nbsp;<small
                className={"d-inline-block"}>({user.name})</small>

                <Card className={"mb-3"}>
                    <Card.Body>
                        <Card.Text>
                            {user.description}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className={"mb-3"}>
                    <Card.Header>
                        <h2>Pokořené kopce</h2>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text className={"hills"}>
                            {climbedHills?.map(hill => <li key={hill._id}>{hill.name}</li>)}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className={"mb-3"}>
                    <Card.Header>
                        <h2>Zbývající kopce</h2>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text className={"hills"}>
                            {notClimbedHills?.map(hill => <li key={hill._id}>{hill.name}</li>)}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <a href="/"><Button type="button" className="btn">Domov</Button></a>
            </div> : "Loading..."}

        </>
    )
}

export default ProfilePage;

Array.prototype.remove = function () {
    let what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
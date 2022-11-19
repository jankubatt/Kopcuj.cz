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
    }, [])

    useEffect(() => {
        let cHills = [];
        hills?.forEach((hill) => {
            if (user.hills.filter(uHill => uHill._id === hill._id)[0] !== undefined) {
                cHills.push(hill);
            }
        })
        setClimbedHills(cHills);


    }, [hills])

    useEffect(() => {
        let ncHills = hills;

        climbedHills.forEach((hill) => {
            ncHills.splice(ncHills.indexOf(hill), 1)
        })

        setNotClimbedHills(ncHills);
    }, [climbedHills])

    return (
        <>
            {notClimbedHills !== undefined ? <div className={'container profile'}>

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
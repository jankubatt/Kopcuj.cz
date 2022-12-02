import React, {useEffect, useRef, useState} from 'react';
import '../App.css';
import axios from "axios";
import Cookies from 'js-cookie';
import {Alert, Button, Card, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

axios.defaults.withCredentials = true;

function ProfilePage() {
    const [user, setUser] = useState([]);
    const [hills, getHills] = useState([]);
    const [climbedHills, setClimbedHills] = useState([]);
    const [notClimbedHills, setNotClimbedHills] = useState([]);
    const [descVisible, setDescVisible] = useState('none');
    const [descBtn, setDscBtn] = useState(false);

    const desc = useRef();

    const fetchUserClimbedHills = async () => {
        const response = await axios.get(`/api/users/${Cookies.get('authToken')}/climbedHills`);
        return response.data;
    }

    const fetchUser = async () => {
        const response = await axios.get('/api/users/' + Cookies.get('authToken'));
        return response.data[0];
    }

    const fetchHills = async () => {
        const response = await axios.get(`/api/hills/`);
        return response.data;
    }

    const changeDesc = async () => {
        const response = await axios.post(`/api/users/description`, {
            desc: desc.current.value,
            authToken: Cookies.get('authToken')
        });

        setDscBtn(!descBtn);
        setDescVisible('none');

        return response.data;
    }

    const handleDesc = () => {
        if (descVisible === 'none')
            setDescVisible('block')
        else
            setDescVisible('none')
    }

    useEffect(() => {

        fetchUser().then((res) => {
            setUser(res)
        })

    }, [descBtn])

    useEffect(() => {
        fetchUser().then((res) => {
            setUser(res)
        })

        fetchHills().then((res) => {
            getHills(res)

            fetchUserClimbedHills().then((res) => {
                setClimbedHills(res);
            })
        })
    }, [])

    useEffect(() => {
        let ncHills = hills;

        climbedHills.forEach((hill) => {
            ncHills = ncHills.filter(item => item.id !== hill.id)
        })

        setNotClimbedHills(ncHills);
    }, [climbedHills])

    if (user === undefined) return "Loading"

    return (
        <>
            <div className={'container profile'}>
                <h1 className={"d-inline-block"}>{user.login}</h1>&nbsp;<small
                className={"d-inline-block"}>({user.name})</small>

                <div className={"mb-3 border-line"}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Card.Text>
                            {user.description === null ? "Popisek..." : user.description}
                        </Card.Text>
                        <div onClick={handleDesc}><FontAwesomeIcon icon="fa-solid fa-pen"/></div>
                    </div>
                </div>

                <div className={"mb-3"} style={{display: descVisible}}>
                    <Form.Control as={'textarea'} ref={desc} className={"textarea1"}></Form.Control>
                    <div className={"w-100 mt-1"} style={{display: "flex", justifyContent: "flex-end"}}><Button
                        onClick={changeDesc} className={'btn1'}>Změnit</Button></div>
                </div>

                <Card className={"mb-3"}>
                    <Card.Header>
                        <h2>Pokořené kopce</h2>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text className={"hills"}>
                            {climbedHills ? climbedHills?.map(hill => <li key={hill.id}>{hill.name}</li> ) : "Načítání..."}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className={"mb-3"}>
                    <Card.Header>
                        <h2>Zbývající kopce</h2>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text className={"hills"}>
                            {notClimbedHills ? notClimbedHills?.map(hill => <li key={100+hill.id}>{hill.name}</li>) : "Načítání..."}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <a href="/"><Button type="button" className="btn1">Domov</Button></a>

                {user.isVerified === false ?
                    <Alert className={"mt-3"} variant='info'>Email s ověřením účtu byl odeslán na email!</Alert> : ""}
            </div>

        </>
    )
}

export default ProfilePage;
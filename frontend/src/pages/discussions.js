import React, {useEffect, useRef, useState} from 'react';
import '../App.css';
import Discussion from '../components/Discussion';
import axios from "axios";
import Cookies from 'js-cookie';
import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function DiscussionsPage() {
    const [user, setUser] = useState([]);
    const [discussions, setDiscussions] = useState([]);
    const [btn, setBtn] = useState(false);
    const [loading, setLoading] = useState(false);
    const subject = useRef();
    const text = useRef();
    const navigate = useNavigate();

    //Check if user is logged in. If not, redirect user to login page
    let authToken = Cookies.get('authToken');
    if (authToken === '' || authToken === undefined || authToken === null) {
        document.location.replace(document.location + 'login');
    }

    const fetchUser = async () => {
        const response = await axios.get(`/api/users/${Cookies.get('authToken')}`);
        return response.data[0];
    }

    const fetchDiscussions = async () => {
        const response = await axios.get(`/api/discussions/`);
        return response.data;
    }

    useEffect(() => {
        fetchUser().then((res) => {
            setUser(res)
        })

        fetchDiscussions().then((res) => {
            setDiscussions(res);
        })
    }, [])

    useEffect(() => {
        fetchDiscussions().then((res) => {
            setDiscussions(res);
            setLoading(false)
        })
    }, [btn])

    const createDiscussion = async () => {
        await axios.post("/api/discussions/create", {
            id_user: user.id,
            subject: subject.current.value,
            text: text.current.value
        });

        setBtn(!btn);
        setLoading(true)
    }

    return (
        <>
            <div className='navbar'>
                <div className='navbrand' onClick={() => navigate("/")}>Kopcuj.cz</div>
                <div className='navbrand' style={{marginRight: "20px"}}>Diskuze</div>
            </div>

            <div className={'container'}>
                <h1>Vytvořit diskuzi</h1>

                <Form.Group>
                    <Form.Label className={"m-0"}>Téma</Form.Label>
                    <Form.Control as="input" ref={subject} placeholder="Téma" className={"textarea"}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label className={"m-0"}>Myšlenka</Form.Label>
                    <Form.Control as="textarea" ref={text} placeholder="Myšlenka" rows={5} className={"textarea"}/><br/>
                </Form.Group>

                <div className={"d-flex justify-content-end"}>
                    <Button onClick={createDiscussion} className={"btn1"}>Vytvořit</Button>
                </div>

                <hr/>

                {loading && <h2>Loading...</h2>}

                {discussions?.map((discussion) => <Discussion key={discussion.id} discussion={discussion}/>)}
            </div>
        </>
    )
}

export default DiscussionsPage;
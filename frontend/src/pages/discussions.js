import React, {useEffect, useRef, useState} from 'react';
import '../App.css';
import Discussion from '../components/Discussion';
import axios from "axios";
import Cookies from 'js-cookie';
import {Button, Form} from "react-bootstrap";

function DiscussionsPage() {
    const [user, setUser] = useState([]);
    const [discussions, setDiscussions] = useState([]);
    const [btn, setBtn] = useState(false);
    const subject = useRef();
    const text = useRef();

    //Check if user is logged in. If not, redirect user to login page
    let authToken = Cookies.get('authToken');
    if (authToken === '' || authToken === undefined || authToken === null) {
        document.location.replace(document.location + 'login');
    }

    const fetchUser = async () => {
        const response = await axios.get(`http://localhost:8082/api/users/token/${Cookies.get('authToken')}`);
        return response.data;
    }

    const fetchDiscussions = async () => {
        const response = await axios.get(`http://localhost:8082/api/discussions/`);
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
        })

        console.log("update")
    }, [btn])

    const createDiscussion = async () => {
        await axios.post("http://localhost:8082/api/discussions/create", {
            user: user,
            subject: subject.current.value,
            text: text.current.value
        });

        setBtn(!btn);
    }

    return (
        <>
            <div className='navbar'>
                <div className='navbrand'>Kopcuj.cz</div>
                <div className='navbrand' style={{marginRight: "20px"}}>Diskuze</div>
            </div>

            <div className={'container'} maxWidth="lg">
                <div className='formDiscussion'>
                    <h1>Vytvořit diskuzi</h1>

                    <Form.Control inputRef={subject} placeholder="Téma"/><br/>
                    <Form.Control as="textarea" inputRef={text} placeholder="Myšlenka"
                                  style={{marginTop: "10px"}}/><br/>
                    <Button style={{marginTop: "10px"}} onClick={createDiscussion}>Vytvořit</Button>
                </div>

                <hr/>

                {discussions?.map((discussion) => <Discussion data={discussion}/>)}
            </div>
        </>
    )
}

export default DiscussionsPage;
import React, {useEffect, useRef, useState} from 'react';
import '../App.css';
import Discussion from '../components/Discussion';
import {Button, Container} from '@mui/material';
import axios from "axios";
import Cookies from 'js-cookie';

function DiscussionsPage() {
    const [user, setUser] = useState([]);
    const [discussions, setDiscussions] = useState([]);
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

    const createDiscussion = () => {
        console.log(text.current)
        axios.post("http://localhost:8082/api/discussions/create", {
            id_user: user._id,
            user: {
                login: user.login,
                name: user.name,
                pfp: user.pfp,
                isAdmin: user.isAdmin
            },
            subject: subject.current.value,
            text: text.current.value
        });
    }

    return (
        <>
            <div className='navbar'>
                <div className='navbrand'>Kopcuj.cz</div>
                <div className='navbrand' style={{marginRight: "20px"}}>Diskuze</div>
            </div>

            <Container maxWidth="lg">
                <div className='formDiscussion'>
                    <h1>Vytvořit diskuzi</h1>

                    <input ref={subject} id="outlined-basic" style={{width: "50%"}} label="Téma"
                           variant="outlined"/><br/>
                    <input ref={text} label="Myšlenka" multiline rows={10}
                           style={{marginTop: "10px", width: "100%"}}/><br/>
                    <Button variant="contained" style={{marginTop: "10px"}} onClick={createDiscussion}>Vytvořit</Button>
                </div>

                <hr/>

                {discussions?.map((discussion) => <Discussion data={discussion}/>)}
            </Container>
        </>
    )
}

export default DiscussionsPage;
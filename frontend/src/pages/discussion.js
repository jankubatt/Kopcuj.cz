import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import {Button, Container} from '@mui/material'
import Cookies from "js-cookie";

const DiscussionPage = () => {
    const qs = require('query-string');
    const parsed = qs.parse(document.location.search);

    const [discussion, setDiscussion] = useState([]);
    const [user, setUser] = useState([]);
    const [replies, setReplies] = useState([]);
    const [btn, setBtn] = useState(false);
    const reply = useRef();

    //Check if user is logged in. If not, redirect user to login page
    let authToken = Cookies.get('authToken');
    if (authToken === '' || authToken === undefined || authToken === null) {
        document.location.replace(document.location + 'login');
    }

    const fetchUser = async () => {
        const response = await axios.get(`http://localhost:8082/api/users/token/${Cookies.get('authToken')}`);
        return response.data;
    }

    const fetchDiscussion = async () => {
        const response = await axios.get(`http://localhost:8082/api/discussions/${parsed.id}`);
        return response.data;
    }

    useEffect(() => {
        fetchDiscussion().then((res) => {
            setDiscussion(res);
            setReplies(res.replies);
            console.log(res.replies)
        })

        fetchUser().then((res) => {
            setUser(res);
        })
    }, [])

    useEffect(() => {
        fetchDiscussion().then((res) => {
            setDiscussion(res);
            setReplies(res.replies);
        })


    }, [btn])

    const SendReply = async () => {
        await axios.post('http://localhost:8082/api/discussions/reply', {
            id_discussion: discussion._id,
            reply: {
                user: user._id,
                text: reply.current.value,
                date_added: `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`
            }
        })

        setBtn(!btn);
    }

    return (
        <>
            {discussion !== undefined ?
                <Container>
                    <h1>{discussion.subject}</h1>
                    <p>{discussion.text}</p>
                    <input ref={reply} placeholder={'Odpovědět'}/>
                    <Button variant="contained" style={{marginTop: "10px"}} onClick={SendReply}>Odpovědět</Button>

                    {replies?.map((reply) => <div><h2>{reply.user}</h2><p>{reply.text}</p></div>)}
                </Container>
                : "Loading..."}


        </>


    )
}

export default DiscussionPage;
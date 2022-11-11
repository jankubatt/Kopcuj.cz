import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import {Button, Card, CardContent, Container, TextField, Typography} from '@mui/material'
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
                user: user,
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
                    <TextField inputRef={reply} minRows={8} multiline style={{width: "100%"}}></TextField><br/>
                    <Button variant="contained" style={{marginTop: "10px"}} onClick={SendReply}>Odpovědět</Button>

                    <div style={{marginTop: "20px"}}>
                        {replies?.map((reply) => <Card sx={{marginTop: "10px"}}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {reply.user.name}
                                </Typography>
                                <Typography variant="body2">
                                    {reply.text}
                                </Typography>
                            </CardContent>
                        </Card>)}
                    </div>
                </Container>
                : "Loading..."}


        </>


    )
}

export default DiscussionPage;
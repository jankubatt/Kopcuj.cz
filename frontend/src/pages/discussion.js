import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import Cookies from "js-cookie";
import Reply from "../components/Reply";
import {Button, Card, Form} from "react-bootstrap";

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
        fetchUser().then((res) => {
            setUser(res);
        })

        fetchDiscussion().then((res) => {
            setDiscussion(res);
            setReplies(res.replies);
        })
    }, [])

    useEffect(() => {
        fetchDiscussion().then((res) => {
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
        }).then(() => {
            setBtn(!btn)
        })
    }

    const SendUpvote = async (replyId) => {
        await axios.post('http://localhost:8082/api/discussions/reply/upvote', {
            id_discussion: discussion._id,
            id_reply: replyId,
            userId: user._id
        }).then(() => {
            setBtn(!btn)
        })
    }

    const SendDownvote = async (replyId) => {
        await axios.post('http://localhost:8082/api/discussions/reply/downvote', {
            id_discussion: discussion._id,
            id_reply: replyId,
            userId: user._id
        }).then(() => {
            setBtn(!btn)
        })
    }

    return (
        <>
            <div className='navbar'>
                <div className='navbrand'>Kopcuj.cz</div>
                <a href={"http://localhost:3000/discussions"}>
                    <div className='navbrand' style={{marginRight: "20px"}}>Diskuze</div>
                </a>
            </div>

            {discussion !== undefined ?
                <div className={'container'}>
                    <h1>{discussion.subject}</h1>

                    <Card>
                        <Card.Body>
                            <Card.Text>
                                {discussion.user !== undefined ? discussion.user.name : "Loading..."}
                            </Card.Text>
                            <Card.Text variant="body2">
                                {discussion.text}
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <hr/>

                    <div style={{marginTop: "20px"}}>
                        {replies?.map((reply) => <Reply key={reply._id} upVote={() => {
                            SendUpvote(reply._id)
                        }} downVote={() => {
                            SendDownvote(reply._id)
                        }} reply={reply}/>)}
                    </div>

                    <hr/>

                    <Form.Control as="textarea" rows={5} ref={reply}></Form.Control>
                    <Button className={"mb-5"} onClick={SendReply}>Odpovědět</Button>
                </div>
                : "Loading..."}
        </>


    )
}

export default DiscussionPage;
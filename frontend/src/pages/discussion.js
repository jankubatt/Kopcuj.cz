import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import Cookies from "js-cookie";
import Reply from "../components/Reply";
import {Badge, Button, Card, Form} from "react-bootstrap";

const DiscussionPage = () => {
    const qs = require('query-string');
    const parsed = qs.parse(document.location.search);

    const [discussion, setDiscussion] = useState([]);
    const [user, setUser] = useState([]);
    const [replies, setReplies] = useState([]);
    const [btn, setBtn] = useState(false);
    const [loading, setLoading] = useState(false);
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
            setLoading(false);
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
            setLoading(true);
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
                    <Card>
                        <Card.Header>
                            <div className={"d-flex justify-content-between"}>
                                <b>{discussion.subject}</b>{discussion.user !== undefined ?
                                <b>{discussion.user.name || discussion.user.login} {((discussion.user.isAdmin) ?
                                    <Badge pill bg="danger">Admin</Badge> : '')}</b> : "Loading..."}
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {discussion.text}
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <hr/>

                    <div>
                        {replies?.map((reply) => <Reply key={reply._id} upVote={() => {
                            SendUpvote(reply._id)
                        }} downVote={() => {
                            SendDownvote(reply._id)
                        }} reply={reply}/>)}
                    </div>

                    <hr/>

                    {loading && <h2>Loading...</h2>}

                    <Form.Control placeholder={"Odpověď"} className={"textarea"} as="textarea" rows={5}
                                  ref={reply}></Form.Control>
                    <div className={"d-flex justify-content-end"}>
                        <Button className={"mt-3 btn1"} onClick={SendReply}>Odpovědět</Button>
                    </div>
                </div>
                : "Loading..."}
        </>
    )
}

export default DiscussionPage;
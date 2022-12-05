import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import Cookies from "js-cookie";
import Reply from "../components/Reply";
import {Button, Card, Form} from "react-bootstrap";
import Username from "../components/Username";

const DiscussionPage = () => {
    const qs = require('query-string');
    const parsed = qs.parse(document.location.search);

    const [discussion, setDiscussion] = useState([]);
    const [user, setUser] = useState([]);
    const [replies, setReplies] = useState();
    const [btn, setBtn] = useState(false);
    const [loading, setLoading] = useState(false);
    const reply = useRef();

    //Check if user is logged in. If not, redirect user to login page
    let authToken = Cookies.get('authToken');
    if (authToken === '' || authToken === undefined || authToken === null) {
        document.location.replace(document.location + 'login');
    }

    const fetchUser = async () => {
        const response = await axios.get(`/api/users/${Cookies.get('authToken')}`);
        return response.data[0];
    }

    const fetchDiscussion = async () => {
        const response = await axios.get(`/api/discussions/${parsed.id}`);
        return response.data[0];
    }

    const fetchReplies = async () => {
        const response = await axios.get(`/api/discussions/${parsed.id}/replies`);
        return response.data;
    }

    useEffect(() => {
        fetchUser().then((res) => {
            setUser(res);
        })

        fetchDiscussion().then((res) => {
            setDiscussion(res);
        })

        fetchReplies().then((res) => {
            setReplies(res);
        })
    }, [])

    useEffect(() => {
        fetchReplies().then((res) => {
            setReplies(res);
            setLoading(false);
        })
    }, [btn])

    const SendReply = async () => {
        await axios.post('/api/discussions/reply', {
            discussion: discussion.id,
            user: user.id,
            text: reply.current.value
        }).then(() => {
            setBtn(!btn)
            setLoading(true);
        })
    }

    return (
        <>
            <div className='navbar'>
                <a href={"/"}>
                    <div className='navbrand'>Kopcuj.cz</div>
                </a>
                <a href={"http://localhost:3000/discussions"}>
                    <div className='navbrand' style={{marginRight: "20px"}}>Diskuze</div>
                </a>
            </div>

            {discussion !== undefined ?
                <div className={'container'}>
                    <Card>
                        <Card.Header>
                            <div className={"d-flex justify-content-between"}>
                                <b>{discussion.subject}</b>
                                <div>{discussion.user !== undefined ?
                                    <Username user={discussion.user}></Username> : "Loading..."}</div>
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
                        {replies?.map((reply) => <Reply key={reply.id} reply={reply} discussion={discussion}
                                                        user={user}/>)}
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
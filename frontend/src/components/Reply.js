import React, {useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Username from "./Username";
import axios from "axios";
//test
const Reply = (props) => {
    const [rating, setRating] = useState();
    const [btn, setBtn] = useState(false);

    const fetchRating = async () => {
        const response = await axios.get(`/api/discussions/reply/${props.discussion.id}/rating`)
        return response.data;
    }

    const SendUpvote = async () => {
        await axios.post('/api/discussions/reply/upvote', {
            discussion: props.discussion.id,
            user: props.user.id,
        }).then(() => {
            setBtn(!btn)
        })
    }

    const SendDownvote = async () => {
        await axios.post('/api/discussions/reply/downvote', {
            discussion: props.discussion.id,
            user: props.user.id,
        }).then(() => {
            setBtn(!btn)
        })
    }

    useEffect(() => {
        fetchRating().then((res) => {
            setRating(res.upvotes - res.downvotes);
        })
    }, [])

    useEffect(() => {
        fetchRating().then((res) => {
            setRating(res.upvotes - res.downvotes);
        })
    }, [btn])

    return (
        <Card>
            <Card.Header>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div>
                        <Username user={props.reply.user}/>
                    </div>

                    <div style={{alignSelf: "flex-end"}}>
                        <FontAwesomeIcon onClick={SendUpvote} icon="fa-solid fa-chevron-up"/>
                        {<span
                            style={((rating < 0) ? {color: "red"} : (rating === 0) ? {color: "gray"} : {color: "green"})}> {rating} </span>}
                        <FontAwesomeIcon onClick={SendDownvote} icon="fa-solid fa-chevron-down"/>
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {props.reply.text}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Reply;
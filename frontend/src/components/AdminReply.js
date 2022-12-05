import {Card} from "react-bootstrap";
import axios from "axios";
import React, {useEffect, useState} from "react";

const AdminReply = (props) => {
    const [discussion, setDiscussion] = useState();
    const [rating, setRating] = useState();
    const [loading, setLoading] = useState(true);

    const fetchDiscussion = async () => {
        const response = await axios.get(`/api/discussions/${props.reply.discussion}`);
        return response.data[0];
    }

    const fetchRating = async () => {
        const response = await axios.get(`/api/discussions/reply/${props.reply.discussion}/rating`)
        return response.data;
    }

    useEffect(() => {
        fetchRating().then((res) => {
            setRating(res.upvotes - res.downvotes);
        })

        fetchDiscussion().then((res) => {
            setDiscussion(res);
            setLoading(false);
        })
    }, [])

    if (loading) return "Loading...";

    return (
        <Card>
            <Card.Header className={"d-flex justify-content-between"}>
                <span>{discussion.subject}</span>
                <span
                    style={((rating < 0) ? {color: "red"} : (rating === 0) ? {color: "gray"} : {color: "green"})}> {rating} </span>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {props.reply.text}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <div className={"d-flex justify-content-end"}>
                    <div>{DateTime(props.reply.created)}</div>
                </div>
            </Card.Footer>
        </Card>
    )
}

function DateTime(dateTime) {
    let dt = new Date(dateTime);

    if (isNaN(dt)) return "Wrong date";

    return (
        `${(dt.getDate() < 10) ? '0' + dt.getDate() : dt.getDate()}.${(dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1)}.${dt.getFullYear()} 
        [${(dt.getHours()) < 10 ? '0' + dt.getHours() : dt.getHours()}:${(dt.getMinutes() < 10) ? '0' + dt.getMinutes() : dt.getMinutes()}:${(dt.getSeconds() < 10) ? '0' + dt.getSeconds() : dt.getSeconds()}]`)
}

export default AdminReply;
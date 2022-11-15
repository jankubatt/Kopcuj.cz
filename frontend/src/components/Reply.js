import React from "react";
import {Badge, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Reply = (props) => {

    let rating = props.reply.upVotes.length - props.reply.downVotes.length;

    return (
        <Card sx={{marginTop: "10px"}}>
            <Card.Body sx={{display: "flex", justifyContent: "space-between"}}>
                <Card.Text>
                    {props.reply.user !== undefined ?
                        <b>{props.reply.user.name || props.review.user.login}&nbsp;</b> : "Loading..."}
                    {((props.reply.user.isAdmin) ? <Badge pill bg="danger">Admin</Badge> : '')}
                </Card.Text>
                <Card.Text>
                    {props.reply.text}
                </Card.Text>

                <div style={{alignSelf: "flex-end"}}>
                    <FontAwesomeIcon onClick={props.upVote} icon="fa-solid fa-chevron-up"/>
                    {<span
                        style={((rating < 0) ? {color: "red"} : (rating === 0) ? {color: "gray"} : {color: "green"})}> {rating} </span>}
                    <FontAwesomeIcon onClick={props.downVote} icon="fa-solid fa-chevron-down"/>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Reply;
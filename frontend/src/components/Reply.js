import React from "react";
import {Badge, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Reply = (props) => {

    let rating = props.reply.upVotes.length - props.reply.downVotes.length;

    return (
        <Card>
            <Card.Header>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    {props.reply.user !== undefined ?
                        <b>{props.reply.user.name || props.reply.user.login} {((props.reply.user !== undefined && props.reply.user.isAdmin) ?
                            <Badge pill bg="danger">Admin</Badge> : '')}</b> : "Loading..."}

                    <div style={{alignSelf: "flex-end"}}>
                        <FontAwesomeIcon onClick={props.upVote} icon="fa-solid fa-chevron-up"/>
                        {<span
                            style={((rating < 0) ? {color: "red"} : (rating === 0) ? {color: "gray"} : {color: "green"})}> {rating} </span>}
                        <FontAwesomeIcon onClick={props.downVote} icon="fa-solid fa-chevron-down"/>
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
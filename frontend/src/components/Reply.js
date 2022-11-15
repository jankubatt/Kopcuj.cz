import React from "react";
import {Button, Card} from "react-bootstrap";

const Reply = (props) => {

    let rating = props.reply.upVotes.length - props.reply.downVotes.length;

    return (
        <Card sx={{marginTop: "10px"}}>
            <Card.Body sx={{display: "flex", justifyContent: "space-between"}}>
                <div>
                    <Card.Text variant="h5" component="div">
                        {props.reply.user !== undefined ? props.reply.user.name : "Loading..."}
                    </Card.Text>
                    <Card.Text variant="body2">
                        {props.reply.text}
                    </Card.Text>
                </div>
                <div style={{alignSelf: "flex-end"}}>
                    <span variant="body2">
                        <Button onClick={props.upVote}>up</Button>
                        {<span
                            style={((rating < 0) ? {color: "red"} : (rating === 0) ? {color: "gray"} : {color: "green"})}>{rating}</span>}
                        <Button onClick={props.downVote}>down</Button>
                    </span>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Reply;
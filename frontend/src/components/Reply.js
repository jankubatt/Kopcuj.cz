import {Card, CardContent, IconButton, Typography} from "@mui/material";
import React from "react";
import {KeyboardArrowDown, KeyboardArrowUp} from "@mui/icons-material";

const Reply = (props) => {

    let rating = props.reply.upVotes.length - props.reply.downVotes.length;

    return (
        <Card sx={{marginTop: "10px"}}>
            <CardContent sx={{display: "flex", justifyContent: "space-between"}}>
                <div>
                    <Typography variant="h5" component="div">
                        {props.reply.user !== undefined ? props.reply.user.name : "Loading..."}
                    </Typography>
                    <Typography variant="body2">
                        {props.reply.text}
                    </Typography>
                </div>
                <div style={{alignSelf: "flex-end"}}>
                    <Typography variant="body2">
                        <IconButton onClick={props.upVote}><KeyboardArrowUp/></IconButton>
                        {<span
                            style={((rating < 0) ? {color: "red"} : (rating === 0) ? {color: "gray"} : {color: "green"})}>{rating}</span>}
                        <IconButton onClick={props.downVote}><KeyboardArrowDown/></IconButton>
                    </Typography>
                </div>
            </CardContent>
        </Card>
    )
}

export default Reply;
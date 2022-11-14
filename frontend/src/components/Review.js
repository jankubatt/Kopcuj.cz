import {Card, CardContent, Chip, IconButton, Rating} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import React from "react";

const Review = (props) => {
    return (
        <div key={props.review._id}>
            <Card className='card'>
                <CardContent>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <b style={{fontSize: '1.25em'}}>{props.review.user.name || props.review.user.login}</b>&nbsp;
                            {((props.review.user.isAdmin) ? <Chip color="error" label="Admin"/> : '')}
                        </div>
                        <div><Rating name="read-only" value={props.review.stars} readOnly/></div>
                    </div>

                    <div>
                        {props.review.text}
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: "10px"}}>
                        <IconButton style={{alignSelf: "flex-end"}} onClick={() => {
                            props.helpfulClicked(props.review._id)
                        }} aria-label="thumbs up" disabled={false}><ThumbUpIcon/>{props.review.helpful.length}
                        </IconButton>
                        <div style={{
                            color: 'GrayText',
                            alignSelf: "flex-end"
                        }}>{new Date(props.review.date_added).getDate()}.{new Date(props.review.date_added).getMonth() + 1}.{new Date(props.review.date_added).getFullYear()}</div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Review
import React, {useEffect, useState} from "react";
import {Button, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Username from "./Username";
import axios from "axios";

const Review = (props) => {
    const [likeCount, setLikeCount] = useState(0);

    const getLikeCount = async () => {
        const response = await axios.get(`http://localhost:8082/api/reviews/likeCount/${props.review.id}`);
        return response.data;
        console.log(response.data)
    }

    useEffect(() => {
        setLikeCount(getLikeCount())
    }, [])

    if (likeCount === undefined) return;

    return (
        <div key={props.review.id}>
            <Card className='card'>
                <Card.Body>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <Username user={props.review.user}></Username>
                        </div>
                        <div>
                            {[...Array(props.review.stars)].map((x, i) =>
                                <FontAwesomeIcon icon="fa-solid fa-star" key={i}/>
                            )}
                        </div>
                    </div>

                    <div>
                        {props.review.text}
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: "10px"}}>
                        <Button className={"btn2"} style={{alignSelf: "flex-end"}} onClick={() => {
                            props.helpfulClicked(props.review.id)
                        }} aria-label="thumbs up" disabled={false}><FontAwesomeIcon
                            icon="fa-solid fa-thumbs-up"/>
                            {/*{likeCount}*/}
                        </Button>
                        <div style={{
                            color: 'GrayText',
                            alignSelf: "flex-end"
                        }}>{new Date(props.review.added).getDate()}.{new Date(props.review.added).getMonth() + 1}.{new Date(props.review.added).getFullYear()}</div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Review
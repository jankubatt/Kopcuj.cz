import React, {useEffect, useState} from "react";
import {Button, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Username from "./Username";
import axios from "axios";

const Fault = (props) => {
    const [likeCount, setLikeCount] = useState(0);
    const [btnLike, setBtnLike] = useState(false);

    const getLikeCount = async () => {
        const response = await axios.get(`/api/faults/likeCount/${props.fault.id}`);
        return response.data[0].count;
    }

    const helpfulClicked = async () => {
        await axios.post(`/api/faults/like`, {
            user: props.user.id,
            fault: props.fault.id
        })

        setBtnLike(!btnLike);
    }

    useEffect(() => {
        getLikeCount().then((res) => {
            setLikeCount(res)
        })
    }, [])

    useEffect(() => {
        getLikeCount().then((res) => {
            setLikeCount(res)
        })
    }, [btnLike])

    if (likeCount === undefined) return "Loading";

    return (
        <div key={props.fault.id}>
            <Card className='card'>
                <Card.Body>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <Username user={props.fault.user}></Username>
                        </div>
                    </div>
                    <div>
                        {props.fault.text}
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: "10px"}}>
                        <Button className={"btn2"} style={{alignSelf: "flex-end"}} onClick={helpfulClicked}
                                aria-label="thumbs up" disabled={false}>
                            <FontAwesomeIcon icon="fa-solid fa-thumbs-up"/>&nbsp;{likeCount}
                        </Button>
                        <div style={{
                            color: 'GrayText',
                            alignSelf: "flex-end"
                        }}>{new Date(props.fault.created).getDate()}.{new Date(props.fault.created).getMonth() + 1}.{new Date(props.fault.created).getFullYear()}</div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Fault
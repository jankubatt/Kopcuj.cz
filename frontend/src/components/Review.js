import React from "react";
import {Button, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Review = (props) => {
    return (
        <div key={props.review._id}>
            <Card className='card'>
                <Card.Body>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <b style={{fontSize: '1.25em'}}>{props.review.user.name || props.review.user.login}</b>&nbsp;
                            {((props.review.user.isAdmin) ? <span color="error" label="Admin"/> : '')}
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
                        <Button style={{alignSelf: "flex-end"}} onClick={() => {
                            props.helpfulClicked(props.review._id)
                        }} aria-label="thumbs up" disabled={false}>Helpful{props.review.helpful.length}
                        </Button>
                        <div style={{
                            color: 'GrayText',
                            alignSelf: "flex-end"
                        }}>{new Date(props.review.date_added).getDate()}.{new Date(props.review.date_added).getMonth() + 1}.{new Date(props.review.date_added).getFullYear()}</div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Review
import {Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

function ellipsify(str) {
    if (str.length > 10) {
        return (str.substring(0, 10) + "...");
    } else {
        return str;
    }
}

const AdminReview = (props) => {
    return (
        <Card key={props.review._id} className='card'>
            <Card.Body>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        {[...Array(props.review.stars)].map((x, i) =>
                            <FontAwesomeIcon icon="fa-solid fa-star" key={i}/>
                        )}
                    </div>
                </div>
                <div>
                    {ellipsify(props.review.text)}
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div style={{color: 'GrayText'}}>
                        {props.review.user.login}
                    </div>
                    <div style={{color: 'GrayText'}}>
                        {props.review.hill.name}
                    </div>
                    <div style={{color: 'GrayText'}}>
                        {new Date(props.review.date_added).getDate()}.{new Date(props.review.date_added).getMonth() + 1}.{new Date(props.review.date_added).getFullYear()}
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default AdminReview;
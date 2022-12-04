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

function DateTime(dateTime) {
    let dt = new Date(dateTime);
    return (
        `${(dt.getDate() < 10) ? '0' + dt.getDate() : dt.getDate()}.${(dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1)}.${dt.getFullYear()} 
        [${(dt.getHours()) < 10 ? '0' + dt.getHours() : dt.getHours()}:${(dt.getMinutes() < 10) ? '0' + dt.getMinutes() : dt.getMinutes()}:${(dt.getSeconds() < 10) ? '0' + dt.getSeconds() : dt.getSeconds()}]`)
}


const AdminReview = (props) => {
    return (
        <Card key={props.review.id} className='card'>
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
                        {props.review.hill_name}&nbsp;
                    </div>
                    <div style={{color: 'GrayText'}}>
                        {DateTime(props.review.added)}
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default AdminReview;
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Form} from "react-bootstrap";
import Review from "./Review";
import React from "react";

const Rating = (props) => {
    return (
        <>
            <h1>Rating</h1>

            <div className={'rating'}>
                <FontAwesomeIcon icon="fa-regular fa-star" onClick={() => {
                    props.setRating(1);
                    props.setTxtArea('block')
                }}/>
                <FontAwesomeIcon icon="fa-regular fa-star" onClick={() => {
                    props.setRating(2);
                    props.setTxtArea('block')
                }}/>
                <FontAwesomeIcon icon="fa-regular fa-star" onClick={() => {
                    props.setRating(3);
                    props.setTxtArea('block')
                }}/>
                <FontAwesomeIcon icon="fa-regular fa-star" onClick={() => {
                    props.setRating(4);
                    props.setTxtArea('block')
                }}/>
                <FontAwesomeIcon icon="fa-regular fa-star" onClick={() => {
                    props.setRating(5);
                    props.setTxtArea('block')
                }}/>

                <div style={{display: props.txtArea}}>
                    <Form.Check ref={props.chbDifficulty} label={"Obtížné"}/>
                    <Form.Check ref={props.chbPath} label={"Dostupná cesta"}/>
                    <Form.Check ref={props.chbStroller} label={"Vhodné pro kočárky"}/>
                    <Form.Check ref={props.chbParking} label={"Parkoviště"}/>
                    <Form.Check ref={props.chbFood} label={"Občerstvení"}/>
                </div>

                <Form.Control as="textarea" rows={3} ref={props.reviewText}
                              style={{display: props.txtArea}}></Form.Control>
                <Button type="button" className="btn" onClick={props.sendRating}>Odeslat</Button>
                <hr/>
                <div id='reviews'>
                    {props.reviews?.map((review) => ((review.text !== null) ?
                        <Review key={review._id} review={review} helpfulClicked={props.helpfulClicked}/>
                        : 'Loading...'))}
                </div>
            </div>
        </>
    )
}

export default Rating
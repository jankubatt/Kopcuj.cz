import {Button, Form} from "react-bootstrap";
import Review from "./Review";
import React from "react";
import Rating from '@mui/material/Rating';

const Reviews = (props) => {
    return (
        <>
            <div className={"border-line"}>
                <h1>Rating</h1>
                <div className={'rating'}>
                    <Rating
                        name="simple-controlled"
                        value={props.rating}
                        onChange={(event, newValue) => {
                            props.setRating(newValue);
                            props.setTxtArea('block');
                        }}
                    />

                    <div style={{display: props.txtArea}}>
                        <Form.Check ref={props.chbDifficulty} label={"Obtížné"}/>
                        <Form.Check ref={props.chbPath} label={"Dostupná cesta"}/>
                        <Form.Check ref={props.chbStroller} label={"Vhodné pro kočárky"}/>
                        <Form.Check ref={props.chbParking} label={"Parkoviště"}/>
                        <Form.Check ref={props.chbFood} label={"Občerstvení"}/>
                    </div>

                    <Form.Control as="textarea" rows={3} ref={props.reviewText}
                                  style={{display: props.txtArea}} className={"textarea"}></Form.Control>
                    <div className={"d-flex justify-content-end"}>
                        <Button type="button" className="btn1 mt-2" onClick={props.sendRating}>Odeslat</Button>
                    </div>

                </div>
            </div>

            <hr/>
            <div id='reviews'>
                {props.reviews?.map((review) => ((review.text !== null) ?
                    <Review key={review._id} review={review} helpfulClicked={props.helpfulClicked}/>
                    : 'Loading...'))}
            </div>

        </>
    )
}

export default Reviews
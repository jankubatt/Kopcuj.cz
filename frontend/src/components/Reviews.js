import {Button, Form} from "react-bootstrap";
import Review from "./Review";
import React, {useEffect, useRef, useState} from "react";
import Rating from '@mui/material/Rating';
import axios from "axios";

const Reviews = (props) => {
    const chbDifficulty = useRef();
    const chbPath = useRef();
    const chbStroller = useRef();
    const chbParking = useRef();
    const chbFood = useRef();
    const reviewText = useRef();

    const [rating, setRating] = useState();
    const [reviews, setReviews] = useState()
    const [btnReview, setBtnReview] = useState(true)

    useEffect(() => {
        fetchReviews().then((res) => {
            setReviews(res);
        })
    }, [])

    useEffect(() => {
        fetchReviews().then((res) => {
            setReviews(res);
        })
    }, [btnReview])

    const fetchReviews = async () => {
        const response = await axios.get(`http://localhost:8082/api/reviews/${props.currentHill.id}`);
        return response.data;
    }

    const sendRating = async () => {
        await axios.post(`http://localhost:8082/api/review/addReview`, {
            stars: rating,
            hill: props.currentHill,
            user: props.user,
            text: reviewText.current.value,
            difficulty: chbDifficulty.current.value.includes("on") ? props.user.id : null,
            path: chbPath.current.value.includes("on") ? props.user.id : null,
            stroller: chbStroller.current.value.includes("on") ? props.user.id : null,
            parking: chbParking.current.value.includes("on") ? props.user.id : null,
            food: chbFood.current.value.includes("on") ? props.user.id : null
        }).then(() => {
            setBtnReview(!btnReview);
            reviewText.current.value = "";
        });
    }

    const helpfulClicked = async (review) => {
        await axios.post(`http://localhost:8082/api/reviews/addHelpful`, {
            hillId: props.currentHill.id,
            userId: props.user.id,
            reviewId: review
        }).then(async (res) => {
            if (res.data === 'remove') {
                await axios.post(`http://localhost:8082/api/reviews/removeHelpful`, {
                    hillId: props.currentHill.id,
                    userId: props.user.id,
                    reviewId: review
                })
            }
        });

        setBtnReview(!props.btnHelpful);
    }

    return (
        <>
            <div className={"border-line"}>
                <h1>Rating</h1>
                <div className={'rating'}>
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                    />

                    <div>
                        <Form.Check ref={chbDifficulty} label={"Obtížné"}/>
                        <Form.Check ref={chbPath} label={"Dostupná cesta"}/>
                        <Form.Check ref={chbStroller} label={"Vhodné pro kočárky"}/>
                        <Form.Check ref={chbParking} label={"Parkoviště"}/>
                        <Form.Check ref={chbFood} label={"Občerstvení"}/>
                    </div>

                    <Form.Control as="textarea" rows={3} ref={reviewText} className={"textarea"}></Form.Control>
                    <div className={"d-flex justify-content-end"}>
                        <Button type="button" className="btn1 mt-2" onClick={sendRating}>Odeslat</Button>
                    </div>
                </div>
            </div>

            <hr/>
            <div id='reviews'>
                {reviews?.map((review) => ((review.text !== null) ?
                    <Review key={review.id} review={review} helpfulClicked={helpfulClicked}/>
                    : 'Loading...'))}
            </div>
        </>
    )
}

export default Reviews
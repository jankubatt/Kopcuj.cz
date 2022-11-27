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
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        const response = await axios.get(`http://localhost:8082/api/reviews/${props.currentHill.id}`);
        return response.data;
    }

    const sendReview = async () => {
        await axios.post(`http://localhost:8082/api/reviews/addReview`, {
            stars: rating,
            hill: props.currentHill.id,
            user: props.user.id,
            text: reviewText.current.value,
            difficulty: chbDifficulty.current.value.includes("on") ? 1 : null,
            path: chbPath.current.value.includes("on") ? 1 : null,
            stroller: chbStroller.current.value.includes("on") ? 1 : null,
            parking: chbParking.current.value.includes("on") ? 1 : null,
            food: chbFood.current.value.includes("on") ? 1 : null
        }).then(() => {
            setBtnReview(!btnReview);
            reviewText.current.value = "";
        });
    }

    const getRating = () => {
        if (reviews === undefined) return 3;
        let value = 0;

        reviews?.forEach((review) => {
            value += review.stars;
        })
        return Math.floor(value / reviews.length);
    }

    useEffect(() => {
        fetchReviews().then((res) => {
            setReviews(res);
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        fetchReviews().then((res) => {
            setReviews(res);
        })
    }, [btnReview])

    useEffect(() => {
        setRating(getRating())
    }, [reviews])

    if (loading) return "Loading...";

    return (
        <>
            <div className={"border-line"}>
                <h1>Rating</h1>
                <div className={'rating'}>
                    <Rating
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
                        <Button type="button" className="btn1 mt-2" onClick={sendReview}>Odeslat</Button>
                    </div>
                </div>
            </div>

            <hr/>
            <div id='reviews'>
                {reviews?.map((review) => ((review.text !== null) ?
                    <Review key={review.id} review={review} user={props.user}/>
                    : 'Loading...'))}
            </div>
        </>
    )
}

export default Reviews
import {Button, Form} from "react-bootstrap";
import Review from "./Review";
import React, {useEffect, useRef, useState} from "react";
import Rating from '@mui/material/Rating';
import axios from "axios";

const Reviews = (props) => {
    const [chbDifficulty, setChbDifficulty] = useState(false);
    const [chbPath, setChbPath] = useState(false);
    const [chbStroller, setChbStroller] = useState(false);
    const [chbParking, setChbParking] = useState(false);
    const [chbFood, setChbFood] = useState(false);
    const reviewText = useRef();

    const [rating, setRating] = useState(1);
    const [reviews, setReviews] = useState()
    const [btnReview, setBtnReview] = useState(true)
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        const response = await axios.get(`/api/reviews/${props.currentHill.id}`);
        return response.data;
    }

    const sendReview = async () => {
        await axios.post(`/api/reviews/addReview`, {
            stars: rating === 0 ? 1 : rating,
            hill: props.currentHill.id,
            user: props.user.id,
            text: reviewText.current.value,
            difficulty: chbDifficulty,
            path: chbPath,
            stroller: chbStroller,
            parking: chbParking,
            food: chbFood
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
                        <Form.Check onClick={() => setChbDifficulty(!chbDifficulty)} label={"Obtížné"}/>
                        <Form.Check onClick={() => setChbPath(!chbPath)} label={"Dostupná cesta"}/>
                        <Form.Check onClick={() => setChbStroller(!chbStroller)} label={"Vhodné pro kočárky"}/>
                        <Form.Check onClick={() => setChbParking(!chbParking)} label={"Parkoviště"}/>
                        <Form.Check onClick={() => setChbFood(!chbFood)} label={"Občerstvení"}/>
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
import axios from "axios";
import Cookies from 'js-cookie';
import {Button, Checkbox, Rating} from "@mui/material";
import React, {useRef} from 'react';
import Review from "./Review";

const Sidebar = (props) => {
    const chbDifficulty = useRef();
    const chbPath = useRef();
    const chbStroller = useRef();
    const chbParking = useRef();
    const chbFood = useRef();
    const reviewText = useRef();

    const tryHillImage = () => {
        try {
            return require(`../img/hills/${processHillName(props.currentHill.name)}-${props.currentHill.elevation}.webp`);
        } catch (err) {
            return require(`../img/nohill.webp`);
        }
    };

    const addHill = async () => {
        await axios.post('http://localhost:8082/api/users/addHill', {
            authToken: Cookies.get('authToken'),
            hillId: props.currentHill._id
        });

        props.setBtnClimb(!props.btnClimb)
    }

    const sendRating = async () => {
        await axios.post(`http://localhost:8082/api/review/addReview`, {
            stars: props.rating,
            hill: props.currentHill,
            user: props.user,
            text: reviewText.current.value,
            difficulty: chbDifficulty.current.className.includes("Mui-checked") ? props.user._id : null,
            path: chbPath.current.className.includes("Mui-checked") ? props.user._id : null,
            stroller: chbStroller.current.className.includes("Mui-checked") ? props.user._id : null,
            parking: chbParking.current.className.includes("Mui-checked") ? props.user._id : null,
            food: chbFood.current.className.includes("Mui-checked") ? props.user._id : null
        }).then(() => {
            props.setTxtArea('none')
            props.setBtnReview(!props.btnReview);
            reviewText.current.value = "";
        });
    }

    const helpfulClicked = async (review) => {
        await axios.post(`http://localhost:8082/api/review/addHelpful`, {
            hillId: props.currentHill._id,
            userId: props.user._id,
            reviewId: review
        }).then(async (res) => {
            if (res.data === 'remove') {
                await axios.post(`http://localhost:8082/api/review/removeHelpful`, {
                    hillId: props.currentHill._id,
                    userId: props.user._id,
                    reviewId: review
                })
            }
        });

        props.setBtnHelpful(!props.btnHelpful);
    }

    return (
        <div className={'sidebar'}>
            <div className={'hill'}>
                <h1>{props.currentHill.name}<small style={{fontSize: 'medium'}}>({props.currentHill.elevation}m)</small></h1>
                
                <hr/>
                
                <div style={{
                    width: "100%",
                    height: "200px",
                    backgroundImage: `url(${tryHillImage()})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                    }}></div>
                    
                <h2>Informace</h2>
                    
                <div>
                    {props.currentHill.lat}<br/>
                    {props.currentHill.lon}<br/>
                    {props.currentHill.prominence}<br/>
                    {props.currentHill.isolation}<br/>
                    {props.currentHill.material}<br/>
                    {props.currentHill.basin}<br/>
                    {props.currentHill.district}<br/>
                    {props.currentHill.location}<br/>
                </div>
            </div>

            {props.currentHill.difficulty.length > 0 ? "Obtížné " : ""}
            {props.currentHill.path.length > 0 ? "Dostupná cesta " : ""}
            {props.currentHill.food.length > 0 ? "Vhodné pro kočárky " : ""}
            {props.currentHill.parking.length > 0 ? "Parkoviště " : ""}
            {props.currentHill.stroller.length > 0 ? "Občerstvení " : ""}<br />

            <div style={{textAlign: 'center'}}>
                <button id={'btnClaimHill'} type="button" className="btn" onClick={addHill}
                        disabled={props.climbed}>Pokořit
                </button>
            </div>

            <hr/>

            <h1>Rating</h1>

            <div className={'rating'}>
                <Rating name="size-large simple-controlled" value={props.rating || 0} onChange={(event, newValue) => {
                    props.setRating(newValue);
                    props.setTxtArea('block')
                }} size={'large'}
                /><br/>

                <Button type="button" className="btn" onClick={sendRating}>Odeslat</Button><br/>

                <div style={{display: props.txtArea}}>
                    <Checkbox ref={chbDifficulty}/> Obtížné <br/>
                    <Checkbox ref={chbPath}/> Dostupná cesta <br/>
                    <Checkbox ref={chbStroller}/> Vhodné pro kočárky <br/>
                    <Checkbox ref={chbParking}/> Parkoviště <br/>
                    <Checkbox ref={chbFood}/> Občerstvení <br/>
                </div>

                <textarea ref={reviewText} style={{'width': '20vw', height: '20vh', display: props.txtArea}}></textarea><br/>
                    
                <div id='reviews'>
                    {props.reviews?.map((review) => ((review.text !== null) ?
                        <Review review={review} helpfulClicked={helpfulClicked}/> : 'Loading...'))}
                    </div>
                </div>
            </div>
    )
}

function processHillName(name) {
    let hill = name.toLowerCase();
    hill = hill.replace(" ", "-");
    hill = hill.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    return hill;
}

export default Sidebar;
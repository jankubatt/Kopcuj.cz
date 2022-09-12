import React from 'react';
import '../App.css';
import axios from "axios";
import Cookies from "js-cookie";
import {Rating} from "@mui/material";

const Sidebar = (props) => {
    const hill = props.hill;
    let hillRating = 0;


    async function addHill() {
        await axios.post('http://localhost:8082/api/users/addHill', {
            authToken: Cookies.get('authToken'),
            hillId: props.hill._id
        });
    }

    function setRating(value) {
        hillRating = value;
        console.log(hillRating);
    }

    async function sendRating() {
        await axios.post(`http://localhost:8082/api/review/`, {
            stars: hillRating,
            hillId: props.hill._id,
            userId: props.user._id,
            text: null
        });
    }

    return (
        <>{props.hill && <div className={'sidebar'}>
            <div className={'hill'}>
                {hill.name}<br/>
                {hill.elevation}<br/>
                {hill.lat}<br/>
                {hill.lon}<br/>
                {hill.prominence}<br/>
                {hill.isolation}<br/>
                {hill.material}<br/>
                {hill.basin}<br/>
                {hill.district}<br/>
                {hill.location}<br/>
            </div>

            <button id={'btnClaimHill'} type="button" className="btn btn-success" onClick={addHill}
                    disabled={props.climbed}>Pokořit
            </button>

            <div className={'bottom'}>
                <button type="button" className="btn btn-primary"><a href="">Settings</a></button>
                <a href="/profile">
                    <button type="button" className="btn btn-primary">Profile</button>
                </a>
                <button type="button" className="btn btn-primary"><a href="">Collapse</a></button>

                <hr/>

            </div>

            <hr/>

            <h1>Rating</h1>
            <div className={'rating'}>
                <Rating name="size-large" defaultValue={hillRating} size="large" onChange={(event, newValue) => {
                    setRating(newValue);
                }}/>
                <button type="button" className="btn btn-warning" onClick={sendRating}>Odeslat</button>
            </div>
        </div>
        }</>
    )
};

export default Sidebar;
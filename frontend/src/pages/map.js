import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from "axios";
import {KeyboardControl, Map, Marker, MarkerLayer, MouseControl, ZoomControl} from 'react-mapycz'
import Cookies from 'js-cookie';
import '../Map.css';
import {Rating} from "@mui/material";

axios.defaults.withCredentials = true;

function MapPage() {
    const [hills, getHills] = useState([]);
    const [user, setUser] = useState([]);
    const [currentHill, setCurrentHill] = useState();
    const [center, setCenter] = useState(true)
    const [climbed, setClimbed] = useState(true);
    const [rating, setRating] = useState(0);

    //Check if user is logged in. If not, redirect user to login page
    let authToken = Cookies.get('authToken');
    if (authToken === '' || authToken === undefined || authToken === null) {
        document.location.replace(document.location + 'login');
    }

    async function addHill() {
        await axios.post('http://localhost:8082/api/users/addHill', {
            authToken: Cookies.get('authToken'),
            hillId: currentHill._id
        });
    }

    async function sendRating() {
        await axios.post(`http://localhost:8082/api/review/`, {
            stars: rating,
            hillId: currentHill._id,
            userId: user._id,
            text: null
        });
    }

    const fetchUser = async () => {
        const response = await axios.get(`http://localhost:8082/api/users/token/${Cookies.get('authToken')}`);
        return response.data;
    }

    const fetchHills = async () => {
        const response = await axios.get('http://localhost:8082/api/hills/');
        return response.data;
    }

    useEffect(() => {
        setCenter(true)
        fetchHills()
            .then((res) => {
                getHills(res)
                setCurrentHill(hills[0]);
            })
            .catch((e) => {
                console.log(e.message)
            })

        fetchUser()
            .then((res) => {
                setUser(res)
            })
            .catch((e) => {
                console.log(e.message)
            })
    }, [])

    async function mapClicked(e) {
        if (e.target.toString() === '[object HTMLImageElement]') {
            setCenter(false);
            setClimbed(false);
            let hillName = e.target.title;
            const clickedHill = await axios.get(`http://localhost:8082/api/hills/name/${hillName}`);

            const hillReviews = await axios.get(`http://localhost:8082/api/review/${clickedHill.data[0]._id}`);
            let starMath = 0;
            hillReviews.data.map((review) => {
                console.log(review.stars)
                starMath += review.stars;
            })
            await setRating(Math.floor(starMath / hillReviews.data.length));

            {
                user.hills
                    .filter(hill => {
                        return (
                            hill === clickedHill.data[0]._id
                        );
                    })
                    .map(() => {
                        setClimbed(true);
                    })
            }

            fetchUser()
                .then((res) => {
                    setUser(res)
                })
                .catch((e) => {
                    console.log(e.message)
                })

            await setCurrentHill(clickedHill.data[0]);
        }
    }

    // noinspection JSValidateTypes
    return (
        <>
            {currentHill && <div className={'sidebar'}>
                <div className={'hill'}>
                    {currentHill.name}<br/>
                    {currentHill.elevation}<br/>
                    {currentHill.lat}<br/>
                    {currentHill.lon}<br/>
                    {currentHill.prominence}<br/>
                    {currentHill.isolation}<br/>
                    {currentHill.material}<br/>
                    {currentHill.basin}<br/>
                    {currentHill.district}<br/>
                    {currentHill.location}<br/>
                </div>

                <button id={'btnClaimHill'} type="button" className="btn btn-success" onClick={addHill}
                        disabled={climbed}>Pokořit
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
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                    />
                    <button type="button" className="btn btn-warning" onClick={sendRating}>Odeslat</button>
                </div>
            </div>
            }

            {user.isAdmin ? <a href={'/admin'}>
                <button type="button" className="btn btn-success btnAdmin">Admin</button>
            </a> : null}

            <div className={"clickMap"} onClick={mapClicked}>
                <Map className={'map'} height={"100vh"} center={center ? {lat: 50.555, lng: 13.931} : null} zoom={14}>
                    <KeyboardControl/>
                    <ZoomControl/>
                    <MouseControl zoom={true} pan={true} wheel={true}/>
                    <MarkerLayer>
                        {hills.map((hill) => <Marker key={hill._id} options={{title: hill.name}}
                                                     coords={{lat: hill.lat, lng: hill.lon}}/>)}
                    </MarkerLayer>
                </Map>
            </div>
        </>
    )
}

export default MapPage;
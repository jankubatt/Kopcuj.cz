import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from "axios";
import {KeyboardControl, Map, Marker, MarkerLayer, MouseControl, ZoomControl} from 'react-mapycz'
import Cookies from 'js-cookie';
import '../Map.css';
import {Card, CardContent, Rating, Typography} from "@mui/material";

axios.defaults.withCredentials = true;

function MapPage() {
    //Hill variables
    const [hills, getHills] = useState([]);
    const [currentHill, setCurrentHill] = useState();
    const [climbed, setClimbed] = useState(true);

    //Misc variables
    const [center, setCenter] = useState(true)
    const [user, setUser] = useState([]);

    //Rating variables
    const [rating, setRating] = useState(0);
    const [txtArea, setTxtArea] = useState('none');
    const [text, setText] = useState(null);
    const [hillReviews, setHillReviews] = useState([])

    //Check if user is logged in. If not, redirect user to login page
    let authToken = Cookies.get('authToken');
    if (authToken === '' || authToken === undefined || authToken === null) {
        document.location.replace(document.location + 'login');
    }

    //Functions
    const addHill = async () => {
        await axios.post('http://localhost:8082/api/users/addHill', {
            authToken: Cookies.get('authToken'),
            hillId: currentHill._id
        });
    }

    const sendRating = async () => {
        await axios.post(`http://localhost:8082/api/review/`, {
            stars: rating,
            hillId: currentHill._id,
            userId: user._id,
            text: text
        });

        setTxtArea('none')
    }

    const fetchUser = async () => {
        const response = await axios.get(`http://localhost:8082/api/users/token/${Cookies.get('authToken')}`);
        return response.data;
    }

    const fetchHills = async () => {
        const response = await axios.get('http://localhost:8082/api/hills/');
        return response.data;
    }

    const mapClicked = async (e) => {
        if (e.target.toString() === '[object HTMLImageElement]') {
            setCenter(false);
            setClimbed(false);
            setTxtArea('none')
            setText(null);

            let hillName = e.target.title;
            let clickedHill = await axios.get(`http://localhost:8082/api/hills/name/${hillName}`);
            clickedHill = clickedHill.data[0];

            const response = await axios.get(`http://localhost:8082/api/review/${clickedHill._id}`);
            setHillReviews(response.data);
            let starValue = 0;
            hillReviews.map((review) => {
                starValue += review.stars;
            })
            await setRating(Math.floor(starValue / hillReviews.length));

            user.hills.filter(hill => {
                return (hill === clickedHill._id);
            }).map(() => {
                setClimbed(true);
            })

            fetchUser().then((res) => {
                setUser(res)
            })

            await setCurrentHill(clickedHill);
        }
    }

    useEffect(() => {
        setCenter(true)

        fetchHills().then((res) => {
            getHills(res)
            setCurrentHill(hills[0]);
        })

        fetchUser().then((res) => {
            setUser(res)
        })
    }, [])

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
                    <Rating name="size-large simple-controlled" value={rating} onChange={(event, newValue) => {
                        setRating(newValue);
                        setTxtArea('block')
                    }} size={'large'}/><br/>
                    <button type="button" className="btn btn-warning" onClick={sendRating}>Odeslat</button>
                    <br/>
                    <textarea style={{'width': '20vw', height: '20vh', display: txtArea}} onChange={(e) => {
                        setText(e.target.value)
                    }} value={text || ''}></textarea>


                    {hillReviews.map((review) => <><Card>
                        <CardContent>
                            <Typography variant="body2">
                                {review.text}
                            </Typography>
                        </CardContent>
                    </Card><br/></>)}

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
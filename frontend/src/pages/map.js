import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from "axios";
import {KeyboardControl, Map, Marker, MarkerLayer, MouseControl, ZoomControl} from 'react-mapycz'
import Cookies from 'js-cookie';
import '../Map.css';
import {Card, CardContent, Chip, Rating, Typography} from "@mui/material";

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
    const [allReviews, setAllReviews] = useState([])
    const [reviews, setReviews] = useState([])

    //Check if user is logged in. If not, redirect user to login page
    let authToken = Cookies.get('authToken');
    if (authToken === '' || authToken === undefined || authToken === null) {
        document.location.replace(document.location + 'login');
    }

    useEffect(() => {
        setCenter(true)

        fetchHills().then((res) => {
            getHills(res)
            setCurrentHill(hills[1]);
        })

        fetchUser().then((res) => {
            setUser(res)
        })

        fetchReviews().then((res) => {
            setAllReviews(res);
        })
    }, [])

    //Functions
    const addHill = async () => {
        await axios.post('http://localhost:8082/api/users/addHill', {
            authToken: Cookies.get('authToken'),
            hillId: currentHill._id
        });
    }

    const sendRating = async () => {
        await axios.post(`http://localhost:8082/api/review/addReview`, {
            stars: rating,
            hillId: currentHill._id,
            userId: user._id,
            text: text
        });

        await fetchReviews().then((res) => {
            setAllReviews(res); 
        })

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

    const fetchReviews = async () => {
        const response = await axios.get(`http://localhost:8082/api/review/`);
        return response.data;
    }

    const mapClicked = async (e) => {
        if (e.target.toString() === '[object HTMLImageElement]') {
            setCurrentHill(undefined);
            setCenter(false);
            setClimbed(false);
            setTxtArea('none')
            setText(null);

            let hillName = e.target.title;
            let clickedHill = await axios.get(`http://localhost:8082/api/hills/name/${hillName}`);
            clickedHill = clickedHill.data[0];

            let currentHillReviews = [];
            let starValue = 0;
            allReviews?.forEach((review) => {
                if (clickedHill._id === review.id_hill) {
                    starValue += review.stars;
                    console.log(review.stars);
                    currentHillReviews.push(review);
                }
            })

            await setReviews(currentHillReviews);
            await setRating(Math.floor(starValue / reviews.length));

            user.hills.filter(hill => {
                return (hill === clickedHill._id);
            }).forEach(() => {
                setClimbed(true);
            })

            await setCurrentHill(clickedHill);
        }
    }

    // noinspection JSValidateTypes
    return (
        <>
            {currentHill && <div className={'sidebar'}>
                {console.log(currentHill)}
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
                    <button type="button" className="btn btn-primary">Settings</button>
                    <a href="/profile">
                        <button type="button" className="btn btn-primary">Profile</button>
                    </a>
                    <button type="button" className="btn btn-primary">Collapse</button>

                    <hr/>

                </div>

                <hr/>

                <h1>Rating</h1>
                <div className={'rating'}>
                    <Rating name="size-large simple-controlled" value={rating || 0} onChange={(event, newValue) => {
                        setRating(newValue);
                        setTxtArea('block')
                    }} size={'large'}/><br/>
                    <button type="button" className="btn btn-warning" onClick={sendRating}>Odeslat</button>
                    <br/>
                    <textarea style={{'width': '20vw', height: '20vh', display: txtArea}} onChange={(e) => {
                        setText(e.target.value)
                    }} value={text || ''}></textarea>

                    <br/>

                    {reviews?.map((review) => ((review.text !== null) ? <><Card className='card' key={review._id}>
                        <CardContent>
                            {review.user.name || review.user.login}&nbsp;
                            {console.log(review.user.isAdmin)}
                            {((review.user.isAdmin === true) ? <Chip color="error" label="Admin"/> : '')}
                            <Typography variant="body2">
                                {review.text}
                            </Typography>
                        </CardContent>
                    </Card></> : ''))}

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
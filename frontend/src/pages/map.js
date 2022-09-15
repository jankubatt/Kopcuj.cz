import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from "axios";
import {KeyboardControl, Map, Marker, MarkerLayer, MouseControl, ZoomControl} from 'react-mapycz'
import Cookies from 'js-cookie';
import '../Map.css';
import {Card, CardContent, Chip, Rating, Typography} from "@mui/material";
import { fontSize } from '@mui/system';

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
    const [btnReview, setBtnReview] = useState(false);

    //Check if user is logged in. If not, redirect user to login page
    let authToken = Cookies.get('authToken');
    if (authToken === '' || authToken === undefined || authToken === null) {
        document.location.replace(document.location + 'login');
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

        fetchReviews().then((res) => {
            setAllReviews(res);
        })
    }, [])

    useEffect(() => {
        let starValue = 0;
        allReviews?.forEach((review) => {
            if (currentHill._id === review.id_hill) {
                starValue += review.stars;
            }
        })
        setRating(Math.floor(starValue / reviews.length));
    }, [reviews])

    useEffect(() => {
        fetchReviews().then((res) => {
            setAllReviews(res);

            if (currentHill !== undefined) {
                let a = []
                let starValue = 0
                res.forEach((review) => {
                    if (review.id_hill === currentHill._id) {
                        a.push(review);
                        starValue += review.stars;
                    }
                })
                setReviews(a);
            }
            
        })

        
    }, [btnReview]);

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

        setTxtArea('none')
        setBtnReview(!btnReview);
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

            user.hills.filter(hill => {
                return (hill === clickedHill._id);
            }).forEach(() => {
                setClimbed(true);
            })

            setCurrentHill(clickedHill);

            let currentHillReviews = [];
            
            allReviews?.forEach((review) => {
                if (clickedHill._id === review.id_hill) {
                    currentHillReviews.push(review);
                }
            })
            
            setReviews(currentHillReviews);
        }
    }

    return (
        <>
            {
                (user === '' || user === undefined || user === null) ?
                    document.location.replace(document.location + 'login') : null
                
            }
            {currentHill && <div className={'sidebar'}>
                <div className={'hill'}>
                    <h1>{currentHill.name}<small style={{fontSize: 'medium'}}>({currentHill.elevation}m)</small></h1>
                    <hr />

                    <a className="btn btn-primary" data-bs-toggle="collapse" href='info' role="button" aria-expanded="false" aria-controls='info'>
                        Informace
                    </a>
                    <div className="collapse" id='info'>
                        {currentHill.lat}<br/>
                        {currentHill.lon}<br/>
                        {currentHill.prominence}<br/>
                        {currentHill.isolation}<br/>
                        {currentHill.material}<br/>
                        {currentHill.basin}<br/>
                        {currentHill.district}<br/>
                        {currentHill.location}<br/>
                    </div>
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
                    
                    <div id='reviews'>
                        {reviews?.map((review) => ((review.text !== null) ? <><Card className='card' key={review._id}>
                            <CardContent>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div>
                                        <b style={{fontSize: '1.25em'}}>{review.user.name || review.user.login}</b>&nbsp;
                                        {((review.user.isAdmin) ? <Chip color="error" label="Admin"/> : '')}
                                    </div>
                                    <div><Rating name="read-only" value={review.stars} readOnly /></div>
                                </div>

                                <div>
                                    {review.text}
                                </div>

                                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <div style={{color: 'GrayText'}}>{new Date(review.date_added).getDate()}.{new Date(review.date_added).getMonth()+1}.{new Date(review.date_added).getFullYear()}</div>
                                </div>
                            </CardContent>
                        </Card></> : ''))}
                    </div>
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
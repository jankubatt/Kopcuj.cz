import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from "axios";
import {KeyboardControl, Map, Marker, MarkerLayer, MouseControl, ZoomControl} from 'react-mapycz'
import Cookies from 'js-cookie';
import {Card, CardContent, Chip, Rating} from "@mui/material";
import pfp from '../img/pfp-default.png';

axios.defaults.withCredentials = true;

function MapPage() {
    //Hill variables
    const [hills, getHills] = useState([]);
    const [currentHill, setCurrentHill] = useState();
    const [climbed, setClimbed] = useState(true);
    const [imgUrl, setImgUrl] = useState("");

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
                let currentReviews = []
                res.forEach((review) => {
                    if (review.id_hill === currentHill._id) {
                        currentReviews.push(review);
                    }
                })
                setReviews(currentReviews);
            }
        })
    }, [btnReview, currentHill]);

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

            if (user.hills.includes(clickedHill._id)) setClimbed(true);

            setCurrentHill(clickedHill);
            console.log(currentHill);

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
                    <hr/>
                    <div style={{
                        width: "100%",
                        height: "200px",
                        backgroundImage: `url(${require(`../img/hills/${processHillName(currentHill.name)}-${currentHill.elevation}.webp`)})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}>

                    </div>
                    <h2>Informace</h2>
                    <div>
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

                <div style={{textAlign: 'center'}}>
                    <button id={'btnClaimHill'} type="button" className="btn" onClick={addHill}
                            disabled={climbed}>Pokořit
                    </button>
                </div>

                <hr/>

                <h1>Rating</h1>
                <div className={'rating'}>
                    <Rating name="size-large simple-controlled" value={rating || 0} onChange={(event, newValue) => {
                        setRating(newValue);
                        setTxtArea('block')
                    }} size={'large'}/><br/>

                    <button type="button" className="btn" onClick={sendRating}>Odeslat</button><br/>

                    <textarea style={{'width': '20vw', height: '20vh', display: txtArea}} onChange={(e) => {
                        setText(e.target.value)
                    }} value={text || ''}></textarea><br/>
                    
                    <div id='reviews'>
                        {reviews?.map((review) => ((review.text !== null) ? <div key={review._id}><Card className='card'>
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
                        </Card></div> : ''))}
                    </div>
                </div>
            </div>
            }

            <div className={'bottom'}>
                <div className='bottomItems'>
                    <button type="button" className="btn">Settings</button>
                    <a href={'/profile'}><img className='btn-profile' src={pfp}></img></a>
                    <button type="button" className="btn">Collapse</button>
                </div>
            </div>
            
            {user.isAdmin ? <a href={'/admin'}>
                <button type="button" className="btn btn-admin">Admin</button>
            </a> : null}

            <div className={"clickMap"} onClick={mapClicked}>
                <Map id={'map'} height={'100vh'} center={center ? {lat: 50.555, lng: 13.931} : null} zoom={14}>
                    <KeyboardControl/>
                    <ZoomControl/>
                    <MouseControl zoom={true} pan={true} wheel={true}/>
                    <MarkerLayer>
                        {hills?.map((hill) => {
                            if (user.hills.includes(hill._id)) {
                                return (
                                    <Marker key={hill._id} options={{title: hill.name, url: "https://api.mapy.cz/img/api/marker/drop-blue.png"}}
                                    coords={{lat: hill.lat, lng: hill.lon}}/>
                                )
                            }
                            else {
                                return (
                                    <Marker key={hill._id} options={{title: hill.name}}
                                            coords={{lat: hill.lat, lng: hill.lon}}/>
                                )
                            }
                        })}
                    </MarkerLayer>
                </Map>
            </div>
        </>
    )
}

function processHillName(name) {
    let hill = name.toLowerCase();
    hill = hill.replace(" ", "-");
    hill = hill.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    return hill;
}

export default MapPage;
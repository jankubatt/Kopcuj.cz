import React, {useEffect, useState, useRef} from 'react';
import '../App.css';
import axios from "axios";
import Map from '../components/Map'
import Cookies from 'js-cookie';
import pfp from '../img/pfp-default.png';
import Searchbar from '../components/Searchbar';
import Sidebar from '../components/Sidebar';

axios.defaults.withCredentials = true;

function MapPage() {
    //Hill variables
    const [hills, getHills] = useState([]);
    const [currentHill, setCurrentHill] = useState();
    const [climbed, setClimbed] = useState(true);
    const [btnClimb, setBtnClimb] = useState(false);


    //Misc variables
    const [center, setCenter] = useState(true)
    const [centerValue, setCenterValue] = useState(null)
    const [user, setUser] = useState([]);

    //Rating variables
    const [rating, setRating] = useState(0);
    const [txtArea, setTxtArea] = useState('none');
    const [allReviews, setAllReviews] = useState([])
    const [reviews, setReviews] = useState([])
    const [btnReview, setBtnReview] = useState(false);
    const [btnHelpful, setBtnHelpful] = useState(false);
    const reviewText = useRef();
    const chbDifficulty = useRef();
    const chbPath = useRef();
    const chbStroller = useRef();
    const chbParking = useRef();
    const chbFood = useRef();

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
        if (currentHill !== undefined) {
            let starValue = 0;
            allReviews?.forEach((review) => {
                if (currentHill._id === review.id_hill) {
                    starValue += review.stars;
                }
            })
            setRating(Math.floor(starValue / reviews.length));
        }
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
    }, [btnReview, currentHill, btnHelpful]);

    useEffect(() => {
        fetchHills().then((res) => {
            getHills(res);
            setClimbed(true);
        })

        fetchUser().then((res) => {
            setUser(res)
        })
    }, [btnClimb])

    //Functions
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

            let hillName = e.target.title;
            let clickedHill = await axios.get(`http://localhost:8082/api/hills/name/${hillName}`);
            clickedHill = clickedHill.data[0];

            if (user.hills.includes(clickedHill._id)) setClimbed(true);

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

            <Searchbar hills={hills} setCenter={setCenter} setCenterValue={setCenterValue} />

            {currentHill && <Sidebar    currentHill={currentHill}
                                        setBtnClimb={setBtnClimb}
                                        btnClimb={btnClimb}
                                        rating={rating}
                                        user={user}
                                        reviewText={reviewText}
                                        chbDifficulty={chbDifficulty}
                                        chbPath={chbPath}
                                        chbStroller={chbStroller}
                                        chbParking={chbParking}
                                        chbFood={chbFood}
                                        setTxtArea={setTxtArea}
                                        setBtnReview={setBtnReview}
                                        btnReview={btnReview}
                                        btnHelpful={btnHelpful}
                                        setBtnHelpful={setBtnHelpful}
                                        climbed={climbed}
                                        setRating={setRating}
                                        txtArea={txtArea}
                                        reviews={reviews} />
            // <div className={'sidebar'}>
            //     <div className={'hill'}>
            //         <h1>{currentHill.name}<small style={{fontSize: 'medium'}}>({currentHill.elevation}m)</small></h1>
            //         <hr/>
            //         <div style={{
            //             width: "100%",
            //             height: "200px",
            //             backgroundImage: `url(${tryHillImage()})`,
            //             backgroundSize: "cover",
            //             backgroundPosition: "center"
            //         }}>

            //         </div>
            //         <h2>Informace</h2>
            //         <div>
            //             {currentHill.lat}<br/>
            //             {currentHill.lon}<br/>
            //             {currentHill.prominence}<br/>
            //             {currentHill.isolation}<br/>
            //             {currentHill.material}<br/>
            //             {currentHill.basin}<br/>
            //             {currentHill.district}<br/>
            //             {currentHill.location}<br/>
            //         </div>
            //     </div>

            //     {currentHill.difficulty.length > 0 ? "Obtížné " : ""}
            //     {currentHill.path.length > 0 ? "Dostupná cesta " : ""}
            //     {currentHill.food.length > 0 ? "Vhodné pro kočárky " : ""}
            //     {currentHill.parking.length > 0 ? "Parkoviště " : ""}
            //     {currentHill.stroller.length > 0 ? "Občerstvení " : ""}<br />

            //     <div style={{textAlign: 'center'}}>
            //         <button id={'btnClaimHill'} type="button" className="btn" onClick={addHill}
            //                 disabled={climbed}>Pokořit
            //         </button>
            //     </div>

            //     <hr/>

            //     <h1>Rating</h1>
            //     <div className={'rating'}>
            //         <Rating name="size-large simple-controlled" value={rating || 0} onChange={(event, newValue) => {
            //             setRating(newValue);
            //             setTxtArea('block')
            //         }} size={'large'}/><br/>

            //         <button type="button" className="btn" onClick={sendRating}>Odeslat</button><br/>

            //         <div style={{display: txtArea}}>
            //             <Checkbox ref={chbDifficulty} /> Obtížné <br/>
            //             <Checkbox ref={chbPath} /> Dostupná cesta <br/>
            //             <Checkbox ref={chbStroller} /> Vhodné pro kočárky <br/>
            //             <Checkbox ref={chbParking} /> Parkoviště <br/>
            //             <Checkbox ref={chbFood} /> Občerstvení <br/>
            //         </div>

            //         <textarea ref={reviewText} style={{'width': '20vw', height: '20vh', display: txtArea}}></textarea><br/>
                    
            //         <div id='reviews'>
            //             {reviews?.map((review) => ((review.text !== null) ? <div key={review._id}><Card className='card'>
            //                 <CardContent>
            //                     <div style={{display: 'flex', justifyContent: 'space-between'}}>
            //                         <div>
            //                             <b style={{fontSize: '1.25em'}}>{review.user.name || review.user.login}</b>&nbsp;
            //                             {((review.user.isAdmin) ? <Chip color="error" label="Admin"/> : '')}
            //                         </div>
            //                         <div><Rating name="read-only" value={review.stars} readOnly /></div>
            //                     </div>

            //                     <div>
            //                         {review.text}
            //                     </div>

            //                     <div style={{display: 'flex', justifyContent: 'space-between', marginTop: "10px"}}>
            //                         <IconButton style={{alignSelf: "flex-end"}} onClick={() => {helpfulClicked(review._id)}} aria-label="thumbs up" disabled={false}><ThumbUpIcon />{review.helpful.length}</IconButton>
            //                         <div style={{color: 'GrayText', alignSelf: "flex-end"}}>{new Date(review.date_added).getDate()}.{new Date(review.date_added).getMonth()+1}.{new Date(review.date_added).getFullYear()}</div>
            //                     </div>
            //                 </CardContent>
            //             </Card></div> : 'Loading...'))}
            //         </div>
            //     </div>
            // </div>
            }

            <div className={'bottom'}>
                <div className='bottomItems'>
                    <button type="button" className="btn">Settings</button>
                    <a href={'/profile'}><img alt={"profile picture"} className='btn-profile' src={pfp}></img></a>
                    <button type="button" className="btn">Collapse</button>
                </div>
            </div>
            
            {user.isAdmin ? <a href={'/admin'}>
                <button type="button" className="btn btn-admin">Admin</button>
            </a> : null}

            <div className={"clickMap"} onClick={mapClicked}>
                {user.hills ? <Map center={center} centerValue={centerValue} user={user} hills={hills} /> : "Loading map..."}
            </div>
        </>
    )
}

export default MapPage;
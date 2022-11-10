import React, {useEffect, useState} from 'react';
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
                                        setTxtArea={setTxtArea}
                                        setBtnReview={setBtnReview}
                                        btnReview={btnReview}
                                        btnHelpful={btnHelpful}
                                        setBtnHelpful={setBtnHelpful}
                                        climbed={climbed}
                                        setRating={setRating}
                                        txtArea={txtArea}
                                        reviews={reviews} />
            }

            <div className={'bottom'}>
                <div className='bottomItems'>
                    <button type="button" className="btn">Settings</button>
                    <a href={'/profile'}><img alt={"profile"} className='btn-profile' src={pfp}></img></a>
                    <a href={'/discussions'}>
                        <button type="button" className="btn">Diskuze</button>
                    </a>
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
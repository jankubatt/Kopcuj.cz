import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from "axios";
import Map from '../components/Map'
import Cookies from 'js-cookie';
import pfp from '../img/pfp-default.png';
import Searchbar from '../components/Searchbar';
import Sidebar from '../components/Sidebar';
import {Button, Dropdown, DropdownButton} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

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

    //Reviews variables
    const [rating, setRating] = useState(0);
    const [txtArea, setTxtArea] = useState('none');
    const [allReviews, setAllReviews] = useState([])
    const [reviews, setReviews] = useState([])
    const [btnReview, setBtnReview] = useState(false);
    const [btnHelpful, setBtnHelpful] = useState(false);

    const navigate = useNavigate();

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

        console.log(hills, user, allReviews)
    }, [])

    useEffect(() => {
        if (currentHill !== undefined) {
            let starValue = 0;
            allReviews?.forEach((review) => {
                if (currentHill._id === review.hill._id) {
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
                    if (review.hill._id === currentHill._id) {
                        currentReviews.push(review);
                    }
                })
                currentReviews.sort((a, b) => a.helpful.length < b.helpful.length ? 1 : b.helpful.length < a.helpful.length ? -1 : 0);
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
        const response = await axios.get(`http://localhost:8082/api/reviews/`);
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

            if (user.hills.filter(uHill => uHill._id === clickedHill._id)[0] !== undefined) setClimbed(true);

            setCurrentHill(clickedHill);

            let currentHillReviews = [];

            allReviews?.forEach((review) => {
                if (clickedHill._id === review.hill._id) {
                    currentHillReviews.push(review);
                }
            })

            setReviews(currentHillReviews);
        }
    }

    const logout = () => {
        Cookies.remove("authToken");
        navigate("/login");
    }

    return (
        <>
            {
                (user === '' || user === undefined || user === null) ?
                    document.location.replace(document.location + 'login') : null
            }

            <Searchbar hills={hills} setCenter={setCenter} setCenterValue={setCenterValue}/>

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


            <div className='bottomItems'>


                <DropdownButton
                    drop={"up"}
                    title={<img alt={"profile"} className='btn-profile' src={pfp}></img>}
                    variant={""}
                >
                    <Dropdown.Item eventKey="1" onClick={() => navigate("/profile")}>Profil</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={logout}>Odhlásit se</Dropdown.Item>
                </DropdownButton>

                <a><Button type="button" className="btn1">Settings</Button></a>
                <a href={'/discussions'}><Button type="button" className="btn1">Diskuze</Button></a>

                {user.isAdmin ? <a href={'/admin'}>
                    <Button type="button" className="btn1">Admin</Button>
                </a> : null}
            </div>


            <div className={"clickMap"} onClick={mapClicked}>
                {user.hills !== undefined ?
                    <Map center={center} centerValue={centerValue} user={user} hills={hills}/> : "Loading map..."}
            </div>
        </>
    )
}

export default MapPage;
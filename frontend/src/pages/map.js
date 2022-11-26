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
    //USER
    const [userClimbedHills, setUserClimbedHills] = useState([]);

    //Hill variables
    const [hills, setHills] = useState([]);
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

    //Functions
    const fetchUser = async () => {
        const response = await axios.get(`http://localhost:8082/api/users/${Cookies.get('authToken')}`);
        return response.data;
    }

    const fetchUserClimbedHills = async () => {
        const response = await axios.get(`http://localhost:8082/api/users/${Cookies.get('authToken')}/climbedHills`);
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

    const logout = () => {
        Cookies.remove("authToken");
        navigate("/login");
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

            if (userClimbedHills.filter(uHill => uHill.id === clickedHill.id)[0] !== undefined) setClimbed(true);

            setCurrentHill(clickedHill);

            let currentHillReviews = await axios.get(`http://localhost:8082/api/reviews/${clickedHill.id}`)
            setReviews(currentHillReviews.data);
        }
    }

    useEffect(() => {
        fetchUser().then((res) => {
            setUser(res);
        })

        fetchUserClimbedHills().then((res) => {
            setUserClimbedHills(res);
        })
    }, [])

    useEffect(() => {
        fetchHills().then((res) => {
            setHills(res);
        })
    }, [])

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
                {userClimbedHills !== undefined ?
                    <Map center={center} centerValue={centerValue} userClimbedHills={userClimbedHills}
                         hills={hills}/> : "Loading map..."}
            </div>
        </>
    )
}

export default MapPage;
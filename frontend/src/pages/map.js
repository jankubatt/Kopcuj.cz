import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from "axios";
import {KeyboardControl, Map, Marker, MarkerLayer, MouseControl, ZoomControl} from 'react-mapycz'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

function MapPage() {
    const [hills, getHills] = useState([]);
    const [user, getUser] = useState([]);
    const [windowSize, setWindowSize] = useState(getWindowSize());
    let isClimbed = false;

    //Check if user is logged in. If not, redirect user to login page
    let authToken = Cookies.get('authToken');
    if (authToken === '') {
        document.location.replace(document.location + 'login');
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:8082/api/hills/');
            return response.data;
        }
        fetchData()
            .then((res) => {
                getHills(res)
            })
            .catch((e) => {
                console.log(e.message)
            })
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:8082/api/users/token/${Cookies.get('authToken')}`);
            return response.data;
        }
        fetchData()
            .then((res) => {
                getUser(res)
            })
            .catch((e) => {
                console.log(e.message)
            })
    }, [])

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <>
            <Map className={'map'} height={"100vh"} center={{lat: 50.555, lng: 13.931}} zoom={14}>
                <KeyboardControl/>
                <ZoomControl/>
                <MouseControl zoom={true} pan={true} wheel={true}/>
                <MarkerLayer>
                    {hills.map((hill) => <><Marker key={hill._id} coords={{lat: hill.lat, lng: hill.lon}} card={{
                        header: () => <>
                            <h1 className={'d-inline'}>{hill.name}</h1>
                            <p className={'float-end d-inline'}>{hill.elevation}m</p>
                        </>,

                        body: () => <>
                            <p>Zeměpisná šířka: {hill.lat}<br/>
                                Zeměpisná délka: {hill.lon}<br/>
                                Prominence: {hill.prominence}<br/>
                                Izolace: {hill.isolation}<br/>
                                Materiál: {hill.material}<br/>
                                Povodí: {hill.basin}</p>

                            <hr/>

                            {user.hills.map((climbedHill) => {
                                console.log(climbedHill)
                                if (climbedHill === hill._id) {
                                    <a>Pokoreno</a>
                                } else {
                                    <a href={`http://localhost:8082/api/users/addHill/${authToken}/${hill._id}`}>Pokorit</a>
                                }
                            })}

                            <hr/>

                            <p>Rating</p>
                            <p>Komentáře</p>
                        </>,

                        footer: () => <>
                            <small className={'text-muted'}>{hill.location}</small>
                            <small className={'text-muted float-end'}>{hill.district}</small>
                        </>,
                        options: {
                            width: windowSize.innerWidth / 2,
                            height: windowSize.innerHeight / 2,
                        }
                    }}>
                        <button className={'btnHill'} onClick={() => {
                            console.log('pica');
                        }}>Pokorit
                        </button>
                    </Marker></>)}
                </MarkerLayer>
            </Map>

            <a href={'/profile'}>
                <div className={'btnProfile'}>
                    <FontAwesomeIcon icon="fa-solid fa-user fa-xs"/>
                </div>
            </a>
        </>
    )
}

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}

export default MapPage;
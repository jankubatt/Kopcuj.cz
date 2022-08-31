import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from "axios";
import {KeyboardControl, Map, Marker, MarkerLayer, MouseControl, ZoomControl} from 'react-mapycz'

axios.defaults.withCredentials = true;

function MapPage() {
    const [hills, getHills] = useState([]);
    const [windowSize, setWindowSize] = useState(getWindowSize());

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
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <Map height={"100vh"} center={{lat: 50.555, lng: 13.931}} zoom={14}>
            <KeyboardControl/>
            <ZoomControl/>
            <MouseControl zoom={true} pan={true} wheel={true}/>
            <MarkerLayer>
                {hills.map((hill) => <Marker key={hill._id} coords={{lat: hill.lat, lng: hill.lon}} card={{
                    header: () => <>
                        <h1 className={'d-inline'}>{hill.name}</h1>
                        <p className={'float-end d-inline'}>{hill.elevation}m</p>
                    </>,

                    body: () => <>
                        <p>Zeměpisná šířka: &nbsp;{hill.lat}<br/>
                            Zeměpisná délka:        &nbsp;{hill.lon}<br/>
                            Prominence:             &nbsp;&nbsp;&nbsp;{hill.prominence}<br/>
                            Izolace:                &nbsp;&nbsp;&nbsp;{hill.isolation}<br/>
                            Materiál:               &nbsp;&nbsp;&nbsp;{hill.material}<br/>
                            Povodí:                 &nbsp;&nbsp;&nbsp;{hill.basin}</p>

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
                }}></Marker>)}
            </MarkerLayer>
        </Map>
    )
}

function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}

export default MapPage;
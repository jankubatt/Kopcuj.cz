import React, {useEffect, useState} from 'react';
import './App.css';
import {KeyboardControl, Map, Marker, MarkerLayer, MouseControl, ZoomControl} from "react-mapycz";
import axios from "axios";

function App() {
    const [hills, getHills] = useState([]);

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

    return (
        <Map height={"100vh"} center={{lat: 50.555, lng: 13.931}} zoom={14}>
            <KeyboardControl/>
            <ZoomControl/>
            <MouseControl zoom={true} pan={true} wheel={true}/>
            <MarkerLayer>
                {hills.map((hill) => <Marker key={hill._id} coords={{lat: hill.lat, lng: hill.lon}} card={{
                    header: () => <strong>{hill.name}</strong>,
                    body: () => <><p>{hill.elevation}m</p></>,
                    footer: `${hill.location}`,
                    options: {
                        width: 300,
                        height: 300,
                    }
                }}></Marker>)}
            </MarkerLayer>
        </Map>
    );
}

export default App;

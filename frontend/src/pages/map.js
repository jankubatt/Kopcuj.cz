import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from "axios";
import {KeyboardControl, Map, Marker, MarkerLayer, MouseControl, ZoomControl} from 'react-mapycz'

axios.defaults.withCredentials = true;

function Login() {
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
        <Map height={"100vh"} center={{lat: 55.60501000000001, lng: 8.97171}}>
            <KeyboardControl/>
            <ZoomControl/>
            <MouseControl zoom={true} pan={true} wheel={true}/>
            <MarkerLayer>
                {hills.map((hill) => <Marker key={hill._id} coords={{lat: hill.lat, lng: hill.lon}}/>)}
                <Marker coords={{lat: 55.60501000000001, lng: 8.97171}}/>
                <Marker coords={{lat: 55.547290000000004, lng: 8.897590000000001}}/>
            </MarkerLayer>
        </Map>
    )
}

export default Login;
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
        <Map height={"100vh"} center={{lat: 50.555, lng: 13.931666666666667}}>
            <KeyboardControl/>
            <ZoomControl/>
            <MouseControl zoom={true} pan={true} wheel={true}/>
            <MarkerLayer>
                {
                    hills.map((hill) =>
                        <Marker key={hill._id}
                                options={{title: hill.name, url: "https://api.mapy.cz/img/api/marker/drop-red.png"}}
                                coords={{lat: hill.lat, lng: hill.lon}}/>
                    )
                }
            </MarkerLayer>
        </Map>
    )
}

export default Login;
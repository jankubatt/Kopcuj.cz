import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from "axios";
import {KeyboardControl, Map, Marker, MarkerLayer, MouseControl, ZoomControl} from 'react-mapycz'
import Cookies from 'js-cookie';
import Sidebar from "../components/Sidebar";

axios.defaults.withCredentials = true;

function MapPage() {
    const [hills, getHills] = useState([]);
    const [user, setUser] = useState([]);
    const [currentHill, setCurrentHill] = useState();
    const [center, setCenter] = useState(true)
    const [climbed, setClimbed] = useState(true);

    //Check if user is logged in. If not, redirect user to login page
    let authToken = Cookies.get('authToken');
    if (authToken === '' || authToken === undefined || authToken === null) {
        document.location.replace(document.location + 'login');
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:8082/api/hills/');
            return response.data;
        }
        setCenter(true)
        console.log(center)
        fetchData()
            .then((res) => {
                getHills(res)
                setCurrentHill(hills[0]);
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
                setUser(res)
            })
            .catch((e) => {
                console.log(e.message)
            })
    }, [])

    async function mapClicked(e) {
        setCenter(false);
        setClimbed(true);
        let counter = 0;
        if (e.target.toString() === '[object HTMLImageElement]') {
            let hillName = e.target.title;
            const clickedHill = await axios.get(`http://localhost:8082/api/hills/name/${hillName}`);

            {
                user.hills
                    .filter(hill => {
                        return (
                            hill === clickedHill.data[0]._id
                        );
                    })
                    .map(() => {
                        setClimbed(true);
                        counter++;
                    })
            }

            if (counter === 0) {
                setClimbed(false);
            }

            await setCurrentHill(clickedHill.data[0]);
        }
    }

    // noinspection JSValidateTypes
    return (
        <>
            <Sidebar hill={currentHill} climbed={climbed}></Sidebar>

            <div className={"clickMap"} onClick={mapClicked}>
                <Map className={'map'} height={"100vh"} center={center ? {lat: 50.555, lng: 13.931} : null} zoom={14}>
                    <KeyboardControl/>
                    <ZoomControl/>
                    <MouseControl zoom={true} pan={true} wheel={true}/>
                    <MarkerLayer>
                        {hills.map((hill) => <Marker key={hill._id} options={{title: hill.name}}
                                                     coords={{lat: hill.lat, lng: hill.lon}}/>)}
                    </MarkerLayer>
                </Map>
            </div>
        </>
    )
}

export default MapPage;
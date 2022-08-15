import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";

axios.defaults.withCredentials = true;

function Login() {
    const [hills, getHills] = useState([]);
    const [hill, setHill] = useState({name: 'ahoj'});
    const [isMapLoaded, setMapLoaded] = useState(false);

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

    // Pokud ještě nebyl script tag vložen
    if (!document.getElementById("map-loader-script")) {
        // Vytvoříme script tag s odkazem na SMap API
        const script = document.createElement("script");
        script.src = "https://api.mapy.cz/loader.js";
        script.id = "map-loader-script";

        // Po načtení scriptu nastavíme callback
        script.onLoad = () => {
            // Nastavíme asynchronní zpracování
            window.Loader.async = true;
            // Po načtení map nastavíme state a vykreslíme mapu
            window.Loader.load(
                null,
                null,
                setMapLoaded(true)
            );
        };
        // Script tag přidáme do hlavičky
        document.head.append(script);
    }

    const Map = () => {
        let map = null;

        map = new window.SMap(
            JAK.gel("map"),
            // Vysvětlení metody fromWGS84 je níže v sekci "Práce se souřadnicemi"
            SMap.Coords.fromWGS84(50, 14),
            9,
        );
        // Přidáme výchozí vrstvu a zapneme jí
        map.addDefaultLayer(window.SMap.DEF_BASE).enable();

        return (
            <div id="map"/>
        )
    };

    const changeHill = (e) => {
        console.log(e);
    }

    return (
        <>
            <Sidebar hill={hill}/>

            {isMapLoaded
                ? <p>Loading...</p>
                : <Map/>
            }
        </>
    )
}

export default Login;
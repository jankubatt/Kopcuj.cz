import React from 'react';
import '../App.css';

const Map = () => {
    let map = null;

    map = new window.SMap(
        JAK.gel("map"),
        // Vysvětlení metody fromWGS84 je níže v sekci "Práce se souřadnicemi"
        SMap.Coords.fromWGS84(50, 14),
        9,
    );
    // Přidáme výchozí vrstvu a zapneme jí
    this.map.addDefaultLayer(window.SMap.DEF_BASE).enable();

    return (
        <div id="map"/>
    )
};

export default Map;
import {KeyboardControl, Map, Marker, MarkerLayer, MouseControl, ZoomControl} from 'react-mapycz'

const MapComponent = (props) => {
    return (
        <Map id={'map'} height={'100vh'} center={props.center ? {lat: 50.555, lng: 13.931} : props.centerValue} zoom={14}>
            <KeyboardControl/>
            <ZoomControl/>
            <MouseControl zoom={true} pan={true} wheel={true}/>
            <MarkerLayer>

                {props.hills?.map((hill) => {
                    if (props.user.hills.filter(uHill => uHill._id === hill._id)[0] !== undefined) {
                        return (
                            <Marker key={hill._id} options={{
                                title: `${hill.name}-${hill.elevation}m`,
                                url: "https://api.mapy.cz/img/api/marker/drop-blue.png"
                            }}
                                    coords={{lat: hill.lat, lng: hill.lon}}/>
                        )
                    } else {
                        return (
                            <Marker key={hill._id} options={{title: `${hill.name}-${hill.elevation}m`}}
                                    coords={{lat: hill.lat, lng: hill.lon}}/>
                        )
                    }


                })}
            </MarkerLayer>
        </Map>
    )
}

export default MapComponent;
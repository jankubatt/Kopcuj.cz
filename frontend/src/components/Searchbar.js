import {useRef} from 'react';
import {Form} from "react-bootstrap";

const Searchbar = (props) => {
    const searchTerm = useRef();


    const searchHill = (n) => {
        let name = n.split("-")[0];
        let elevation = n.split("-")[1].replace('m', '')
        console.log(n);
        props.hills.forEach((hill) => {
            console.log(hill.elevation == elevation)
            if (hill.name.includes(name) && hill.elevation == elevation) {
                props.setCenterValue({lat: hill.lat, lng: hill.lon})
                props.setCenter(false);
            }
        })
    }

    return (
        <div className={'searchBar'}>
            <Form.Control ref={searchTerm}/>
            <div className={'btn'} onClick={() => {
                searchHill(searchTerm.current.value)
            }}>Hledat
            </div>
            </div>
    )
}

export default Searchbar;
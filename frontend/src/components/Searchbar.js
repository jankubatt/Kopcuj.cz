import {useEffect, useState} from 'react';
import {Form} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";

const Searchbar = (props) => {
    const [singleSelections, setSingleSelections] = useState([]);

    const searchHill = (n) => {
        let name = n.split("-")[0];
        let elevation = n.split("-")[1].replace('m', '')

        props.hills.forEach((hill) => {
            if (hill.name.includes(name) && hill.elevation == elevation) {
                props.setCenterValue({lat: hill.lat, lng: hill.lng})
                props.setCenter(false);
            }
        })
    }

    useEffect(() => {
        if (singleSelections[0] !== undefined)
            searchHill(singleSelections[0])
    }, [singleSelections])

    return (

        <div className={'searchBar'}>
            <Form.Group>
                <Typeahead
                    id="basic-typeahead-single"
                    labelKey="name"
                    onChange={setSingleSelections}
                    options={props.hills.map(hill => `${hill.name}-${hill.elevation}m`)}
                    placeholder="Vyhledat kopec"
                    selected={singleSelections}
                />
            </Form.Group>
        </div>
    )
}

export default Searchbar;
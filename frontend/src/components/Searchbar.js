import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useState} from 'react';

const Searchbar = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [inputSearchValue, setInputSearchValue] = useState('');

    const searchHill = (name) => {
        name = name.split(" ")[0];
        props.hills.forEach((hill) => {
            if (hill.name.includes(name)) {
                props.setCenterValue({lat: hill.lat, lng: hill.lon})
                props.setCenter(false);
            }
        })
    }

    return (
        <div className={'searchBar'}>
                <Autocomplete
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    value={searchTerm}
                    onChange={(event, newValue) => {
                        setSearchTerm(newValue);
                    }}
                    inputValue={inputSearchValue}
                    onInputChange={(event, newInputValue) => {
                        setInputSearchValue(newInputValue);
                    }}
                    options={props.hills.map(hill => `${hill.name} ${hill.elevation}m`)}
                    sx={{width: 300, backgroundColor: "white"}}
                    renderInput={(params) => <TextField {...params} label={'Hledat'}/>}
                />
                <div className={'btn'} onClick={() => {
                    searchHill(searchTerm)
                }}>Hledat
                </div>
            </div>
    )
}

export default Searchbar;
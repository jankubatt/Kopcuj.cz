import {useState} from 'react';

const Searchbar = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [inputSearchValue, setInputSearchValue] = useState('');

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
                <input
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    value={searchTerm}
                    onChange={(event, newValue) => {
                        setSearchTerm(newValue);
                    }}
                    inputValue={inputSearchValue}
                    onInputChange={(event, newInputValue) => {
                        setInputSearchValue(newInputValue);
                    }}
                    options={props.hills.map(hill => `${hill.name}-${hill.elevation}m`)}
                    sx={{width: 300, backgroundColor: "white"}}
                    renderInput={(params) => <input {...params} label={'Hledat'}/>}
                />
                <div className={'btn'} onClick={() => {
                    searchHill(searchTerm)
                }}>Hledat
                </div>
            </div>
    )
}

export default Searchbar;
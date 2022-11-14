import React, {useEffect, useState} from "react";
import axios from "axios";

function createData(name, rating, food, difficulty, parking, path, stroller) {
    return {name, rating, food, difficulty, parking, path, stroller};
}

function processHillName(name) {
    let hill = name.toLowerCase();
    hill = hill.replace(" ", "-");
    hill = hill.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    return hill;
}

const FilterPage = () => {
    const [type, setType] = useState('asc');
    const [rowData, setRowData] = useState([]);
    const [filter, setFilter] = useState('name');
    const [refresh, setRefresh] = useState(false);

    const handleChange = async () => {
        await setRowData(sortArray(rowData, type, filter));
        setRefresh(!refresh)
    }

    const handleType = (event) => {
        setType(event.target.value);
    }

    const handleFilter = (event) => {
        setFilter(event.target.value);
    }

    const sortArray = (arr, orderBy, orderType) => {
        switch (orderBy) {
            case "asc":
            default:
                if (orderType === 'name') {
                    return arr.sort((a, b) =>
                        processHillName(a.name) > processHillName(b.name) ? 1 : processHillName(b.name) > processHillName(a.name) ? -1 : 0
                    );
                }
                if (orderType === 'rating') {
                    return arr.sort((a, b) =>
                        a.rating > b.rating ? 1 : b.rating > a.rating ? -1 : 0
                    );
                }
                if (orderType === 'food') {
                    return arr.sort((a, b) =>
                        a.food > b.food ? 1 : b.food > a.food ? -1 : 0
                    );
                }
                if (orderType === 'difficulty') {
                    return arr.sort((a, b) =>
                        a.difficulty > b.difficulty ? 1 : b.difficulty > a.difficulty ? -1 : 0
                    );
                }
                if (orderType === 'parking') {
                    return arr.sort((a, b) =>
                        a.parking > b.parking ? 1 : b.parking > a.parking ? -1 : 0
                    );
                }
                if (orderType === 'path') {
                    return arr.sort((a, b) =>
                        a.path > b.path ? 1 : b.path > a.path ? -1 : 0
                    );
                }
                if (orderType === 'stroller') {
                    return arr.sort((a, b) =>
                        a.stroller > b.stroller ? 1 : b.stroller > a.stroller ? -1 : 0
                    );
                }
            case "desc":
                if (orderType === 'name') {
                    return arr.sort((a, b) =>
                        processHillName(a.name) < processHillName(b.name) ? 1 : processHillName(b.name) < processHillName(a.name) ? -1 : 0
                    );
                }
                if (orderType === 'rating') {
                    return arr.sort((a, b) =>
                        a.rating < b.rating ? 1 : b.rating < a.rating ? -1 : 0
                    );
                }
                if (orderType === 'food') {
                    return arr.sort((a, b) =>
                        a.food < b.food ? 1 : b.food < a.food ? -1 : 0
                    );
                }
                if (orderType === 'difficulty') {
                    return arr.sort((a, b) =>
                        a.difficulty < b.difficulty ? 1 : b.difficulty < a.difficulty ? -1 : 0
                    );
                }
                if (orderType === 'parking') {
                    return arr.sort((a, b) =>
                        a.parking < b.parking ? 1 : b.parking < a.parking ? -1 : 0
                    );
                }
                if (orderType === 'path') {
                    return arr.sort((a, b) =>
                        a.path < b.path ? 1 : b.path < a.path ? -1 : 0
                    );
                }
                if (orderType === 'stroller') {
                    return arr.sort((a, b) =>
                        a.stroller < b.stroller ? 1 : b.stroller < a.stroller ? -1 : 0
                    );
                }
        }
    };

    const fetchReviews = async () => {
        const response = await axios.get('http://localhost:8082/api/review/');
        return response.data;
    }

    const fetchHills = async () => {
        const response = await axios.get('http://localhost:8082/api/hills');
        return response.data;
    }

    useEffect(() => {
        fetchHills().then((hills) => {
            fetchReviews().then((reviews) => {
                let tmp = [];

                hills.forEach((hill) => {
                    let starValue = 0;
                    let counter = 0;

                    reviews.forEach((review) => {
                        if (hill._id === review.hill._id) {
                            starValue += review.stars;
                            counter++;
                        }
                    })

                    if (counter === 0) counter = 1

                    tmp.push(createData(
                        `${hill.name} ${hill.elevation}m`,
                        Math.floor(starValue / counter),
                        hill.food.length,
                        hill.difficulty.length,
                        hill.parking.length,
                        hill.path.length,
                        hill.stroller.length
                    ))


                })

                setRowData(tmp);
            })
        })
    }, [])

    return (
        <>
            {rowData !== undefined ? <>
                <FormControl sx={{width: "10vw"}}>
                    <InputLabel id="filter-label">Filtr</InputLabel>
                    <Select
                        labelId="filter-label"
                        id="filter"
                        value={filter}
                        label="Filtr"
                        onChange={handleFilter}
                    >
                        <MenuItem value={'name'}>Name</MenuItem>
                        <MenuItem value={'rating'}>Rating</MenuItem>
                        <MenuItem value={'food'}>Food</MenuItem>
                        <MenuItem value={'difficulty'}>Difficulty</MenuItem>
                        <MenuItem value={'parking'}>Parking</MenuItem>
                        <MenuItem value={'path'}>Path</MenuItem>
                        <MenuItem value={'stroller'}>Stroller</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{width: "10vw"}}>
                    <InputLabel id="filter-label2">Typ</InputLabel>
                    <Select
                        labelId="filter-label2"
                        id="filter2"
                        value={type}
                        label="Filtr"
                        onChange={handleType}
                    >
                        <MenuItem value={'asc'}>Vzestupne</MenuItem>
                        <MenuItem value={'desc'}>Zestupne</MenuItem>
                    </Select>
                </FormControl>

                <Button onClick={handleChange}>Seradit</Button>

                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" aria-describedby={refresh}>
                                    <b>Jméno</b>
                                </TableCell>

                                <TableCell align="center">
                                    <b>Hodnocení</b>
                                </TableCell>

                                <TableCell align="center">
                                    <b>Jídlo</b>
                                </TableCell>

                                <TableCell align="center">
                                    <b>Obtížnost</b>
                                </TableCell>

                                <TableCell align="center">
                                    <b>Parkování</b>
                                </TableCell>

                                <TableCell align="center">
                                    <b>Cesta</b>
                                </TableCell>

                                <TableCell align="center">
                                    <b>Kočárek</b>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowData?.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row" align="center">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">{row.rating}</TableCell>
                                    <TableCell align="center">{row.food}</TableCell>
                                    <TableCell align="center">{row.difficulty}</TableCell>
                                    <TableCell align="center">{row.parking}</TableCell>
                                    <TableCell align="center">{row.path}</TableCell>
                                    <TableCell align="center">{row.stroller}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer></> : "Loading..."
            }

        </>
    );
}

export default FilterPage
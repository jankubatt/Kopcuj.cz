import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel
} from "@mui/material";

function createData(name, rating, food, difficulty, parking, path, stroller) {
    return {name, rating, food, difficulty, parking, path, stroller};
}

const FilterPage = () => {
    const [type, setType] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [orderName, setOrderName] = useState("asc");
    const [orderRating, setOrderRating] = useState("asc");
    const [orderFood, setOrderFood] = useState("asc");
    const [orderDifficulty, setOrderDifficulty] = useState("asc");
    const [orderParking, setOrderParking] = useState("asc");
    const [orderPath, setOrderPath] = useState("asc");
    const [orderStroller, setOrderStroller] = useState("asc");
    const [filter, setFilter] = React.useState('');

    const handleChange = () => {
        console.log("btn")
        setRowData(sortArray(rowData, type, filter));

        if (filter === 'name') {
            setOrderName(type)
            setOrderPath('')
            setOrderDifficulty('')
            setOrderStroller('')
            setOrderRating('')
            setOrderParking('')
            setOrderFood('')
        }

        if (filter === 'path') {
            setOrderName('')
            setOrderPath(type)
            setOrderDifficulty('')
            setOrderStroller('')
            setOrderRating('')
            setOrderParking('')
            setOrderFood('')
        }

        if (filter === 'difficulty') {
            setOrderName('')
            setOrderPath('')
            setOrderDifficulty(type)
            setOrderStroller('')
            setOrderRating('')
            setOrderParking('')
            setOrderFood('')
        }

        if (filter === 'stroller') {
            setOrderName('')
            setOrderPath('')
            setOrderDifficulty('')
            setOrderStroller(type)
            setOrderRating('')
            setOrderParking('')
            setOrderFood('')
        }

        if (filter === 'rating') {
            setOrderName('')
            setOrderPath('')
            setOrderDifficulty('')
            setOrderStroller('')
            setOrderRating(type)
            setOrderParking('')
            setOrderFood('')
        }

        if (filter === 'parking') {
            setOrderName('')
            setOrderPath('')
            setOrderDifficulty('')
            setOrderStroller('')
            setOrderRating('')
            setOrderParking(type)
            setOrderFood('')
        }

        if (filter === 'food') {
            setOrderName('')
            setOrderPath('')
            setOrderDifficulty('')
            setOrderStroller('')
            setOrderRating('')
            setOrderParking('')
            setOrderFood(type)
        }
    };

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
                        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
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
                        a.name < b.name ? 1 : b.name < a.name ? -1 : 0
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
                        `${hill.name}-${hill.elevation}m`,
                        Math.floor(starValue / counter),
                        hill.food.length,
                        hill.difficulty.length,
                        hill.parking.length,
                        hill.path.length,
                        hill.stroller.length
                    ))


                })

                setRowData(tmp);
                console.log(rowData)
            })
        })


    }, [])

    return (
        <>
            {rowData !== undefined ? <>
                <FormControl>
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
                <FormControl>
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
                                <TableCell align="center">
                                    <TableSortLabel active={true} direction={orderName}>
                                        Name
                                    </TableSortLabel>
                                </TableCell>

                                <TableCell align="center">
                                    <TableSortLabel active={true} direction={orderRating}>
                                        Rating
                                    </TableSortLabel>
                                </TableCell>

                                <TableCell align="center">
                                    <TableSortLabel active={true} direction={orderFood}>
                                        Food
                                    </TableSortLabel>
                                </TableCell>

                                <TableCell align="center">
                                    <TableSortLabel active={true} direction={orderDifficulty}>
                                        Difficulty
                                    </TableSortLabel>
                                </TableCell>

                                <TableCell align="center">
                                    <TableSortLabel active={true} direction={orderParking}>
                                        Parking
                                    </TableSortLabel>
                                </TableCell>

                                <TableCell align="center">
                                    <TableSortLabel active={true} direction={orderPath}>
                                        Path
                                    </TableSortLabel>
                                </TableCell>

                                <TableCell align="center">
                                    <TableSortLabel active={true} direction={orderStroller}>
                                        Stroller
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowData.map((row) => (
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
                </TableContainer></> : "Lopading.,."
            }

        </>
    );
}

export default FilterPage
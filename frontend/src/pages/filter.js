import React, {useEffect, useState} from "react";
import axios from "axios";
import {
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
    const [hills, setHills] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [orderName, setOrderName] = useState("asc");
    const [orderRating, setOrderRating] = useState("asc");
    const [orderFood, setOrderFood] = useState("asc");
    const [orderDifficulty, setOrderDifficulty] = useState("asc");
    const [orderParking, setOrderParking] = useState("asc");
    const [orderPath, setOrderPath] = useState("asc");
    const [orderStroller, setOrderStroller] = useState("asc");
    const [filter, setFilter] = React.useState('');

    const handleChange = (event) => {
        setFilter(event.target.value);

        setRowData(sortArray(rowData, "asc"));
        setOrderFood(orderFood === "asc" ? "desc" : "asc");
    };

    const sortArray = (arr, orderBy) => {
        switch (orderBy) {
            case "asc":
            default:
                return arr.sort((a, b) =>
                    a.food > b.food ? 1 : b.food > a.food ? -1 : 0
                );
            case "desc":
                return arr.sort((a, b) =>
                    a.food < b.food ? 1 : b.food < a.food ? -1 : 0
                );
        }
    };

    useEffect(() => {
        fetchHills().then((res) => {
            setHills(res)
            let tmp = [];
            hills.map((hill) => {
                tmp = rowData;

                let starValue = 0;
                hill.rating.forEach((rating) => {
                    starValue += rating.stars
                })

                tmp.push(createData(`${hill.name} - ${hill.elevation}m`, Math.floor(starValue / hill.rating.length), hill.food.length, hill.difficulty.length, hill.parking.length, hill.path.length, hill.stroller.length))
                setRowData(tmp);

                tmp = []
                console.log(rowData)
            })


        })
    }, [])

    const fetchHills = async () => {
        const response = await axios.get('http://localhost:8082/api/hills/');
        return response.data;
    }

    return (
        <>
            {rowData !== undefined ? <>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Filtr</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filter}
                        label="Filtr"
                        onChange={handleChange}
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
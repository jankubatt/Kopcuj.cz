import React, {useEffect, useState} from "react";
import axios from "axios";
import {Form, Table} from "react-bootstrap";

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
        handleChange();
    }

    const handleFilter = (event) => {
        setFilter(event.target.value);
        handleChange();
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
                <Form.Select
                    id="filter"
                    value={filter}
                    label="Filtr"
                    onChange={handleFilter}
                >
                    <option value={'name'}>Name</option>
                    <option value={'rating'}>Rating</option>
                    <option value={'food'}>Food</option>
                    <option value={'difficulty'}>Difficulty</option>
                    <option value={'parking'}>Parking</option>
                    <option value={'path'}>Path</option>
                    <option value={'stroller'}>Stroller</option>
                </Form.Select>
                <Form.Select
                    id="filter2"
                    value={type}
                    label="Filtr"
                    onChange={handleType}
                >
                    <option value={'asc'}>Vzestupne</option>
                    <option value={'desc'}>Zestupne</option>
                </Form.Select>

                <div className={'container'}>
                    <Table aria-label="simple table">
                        <thead>
                        <tr>
                            <td align="center" aria-describedby={refresh}>
                                <b>Jméno</b>
                            </td>

                            <td align="center">
                                <b>Hodnocení</b>
                            </td>

                            <td align="center">
                                <b>Jídlo</b>
                            </td>

                            <td align="center">
                                <b>Obtížnost</b>
                            </td>

                            <td align="center">
                                <b>Parkování</b>
                            </td>

                            <td align="center">
                                <b>Cesta</b>
                            </td>

                            <td align="center">
                                <b>Kočárek</b>
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        {rowData?.map((row) => (
                            <tr key={row.name}>
                                <td component="th" scope="row" align="center">
                                    {row.name}
                                </td>
                                <td align="center">{row.rating}</td>
                                <td align="center">{row.food}</td>
                                <td align="center">{row.difficulty}</td>
                                <td align="center">{row.parking}</td>
                                <td align="center">{row.path}</td>
                                <td align="center">{row.stroller}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </> : "Loading..."
            }

        </>
    );
}

export default FilterPage
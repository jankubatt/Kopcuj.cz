import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../App.css';
import axios from "axios";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {
    Card,
    CardContent,
    CssBaseline,
    Paper,
    Rating,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material/';

//Main table columns
const columns = [
    {id: 'id_user', label: 'ID', minWidth: 170},
    {id: 'login', label: 'Login', minWidth: 100},
    {id: 'name', label: 'Nickname', minWidth: 100},
    {id: 'email', label: 'E-Mail', minWidth: 100},
    {id: 'desc', label: 'Desc', minWidth: 100},
    {id: 'hills', label: 'Hills', minWidth: 200},
    {id: 'comments', label: 'Comments', minWidth: 100},
    {id: 'reviews', label: 'Reviews', minWidth: 100},
    {id: 'date_registered', label: 'Registered', minWidth: 100},
    {id: 'date_lastLogin', label: 'LL', minWidth: 100},
    {id: 'isAdmin', label: 'Admin', minWidth: 100},
];

//formats pushable row into table
function createData(id_user, login, name, email, desc, hills, comments, reviews, date_registered, date_lastLogin, isAdmin) {
  return { id_user, login, name, email, desc, hills, comments, reviews, date_registered, date_lastLogin, isAdmin };
}

//dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

axios.defaults.withCredentials = true;

function AdminPage() {
    const [users, getUsers] = useState([]);                     //All users
    const [hills, getHills] = useState([]);                     //All hills
    const [allReviews, getAllReviews] = useState([]);           //All reviews
    const [userHills, setUserHills] = useState([]);             //Array where hill is assigned to user
    const [page, setPage] = React.useState(0);                  //Page of a table
    const [rowsPerPage, setRowsPerPage] = React.useState(10);   //Row per page of a table
    const [rows, setRows] = useState([]);                       //Rows of a table

    //State for storing form values
    const [state, setState] = useState({});
    let navigate = useNavigate();

    //function that handles changes in input boxes, when input changes, it gets written into state variable
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setState({...state, [name]: value});
    };

    //handles submit button
    const handleSubmit = (event) => {
        event.preventDefault(); //prevent reload of page

        const data = {
            name: state.name,
            elevation: state.elevation,
            lat: state.lat,
            lon: state.lon,
            prominence: state.prominence,
            isolation: state.isolation,
            material: state.material,
            basin: state.basin,
            district: state.district,
            location: state.location
        };

        //post data to database
        axios.post("http://localhost:8082/api/hills/create", data)
            .then(() => {
                return navigate("/");
            })
            .catch(err => {
                console.log("Error in register user!\n" + err);
            });
    }

    //Handle page change of a table
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    //Handle rows per page of a table
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //Fetch users from database
    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:8082/api/users/');
        return response.data;
    }

    //Fetch hills from database
    const fetchHills = async () => {
        const response = await axios.get('http://localhost:8082/api/hills/');
        return response.data;
    }

    //Fetch reviews from database
    const fetchReviews = async () => {
        const response = await axios.get(`http://localhost:8082/api/review/`);
        return response.data;
    }

    //Fetching data
    useEffect(() => {
        fetchUsers().then((res) => {getUsers(res)})
        fetchHills().then((res) => {getHills(res)})
        fetchReviews().then((res) => {getAllReviews(res)})
    }, [])

    //Assign hills to each user
    useEffect(() => {
        let temp = [];
        users.forEach((user) => {
            user.hills.forEach((userHills) => {
                hills.forEach((aHill) => {
                    if (userHills === aHill._id) {
                        temp.push({user: user.login, hill: aHill})
                    }
                })
            })
        })

        setUserHills(temp);
    }, [hills, users])

    //Fill table with data
    useEffect(() => {
        let tempRows = [];

        users.map((user) => {
            let userClimbed = [];
            let userReviews = [];

            userHills.map((hill) => {
                if (hill.user === user.login) {
                    userClimbed.push(<li>{hill.hill.name}</li>);
                }
            })

            allReviews.map((review) => {
                if (review.user.login === user.login) {
                    userReviews.push(
                        <Card key={review._id} className='card'>
                            <CardContent>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div>
                                        <Rating name="read-only" value={review.stars} readOnly />
                                    </div>
                                </div>
                                <div>
                                    {ellipsify(review.text)}
                                </div>
                                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <div style={{color: 'GrayText'}}>
                                        {new Date(review.date_added).getDate()}.{new Date(review.date_added).getMonth()+1}.{new Date(review.date_added).getFullYear()}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                }
            })

            tempRows.push(createData(user._id, user.login, user.name, user.email, user.description, userClimbed, "In Progress", userReviews, DateTime(user.date_registered), DateTime(user.date_lastLogin), ((user.isAdmin) ? 'true' : 'false')))
            
            userClimbed = [];
            userReviews = [];
        })
        
        setRows(tempRows);
    }, [users, userHills])

    return (
        <>
            <ThemeProvider theme={darkTheme}>
            <CssBaseline />
                <div className={'container-fluid'}>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number' ? column.format(value): value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>

                <h2>Přidat kopec</h2>
                <form onSubmit={handleSubmit}>
                    <input onChange={handleChange} placeholder='Jméno' name='name'></input><br/>
                    <input onChange={handleChange} placeholder='Výška' name='elevation'></input><br/>
                    <input onChange={handleChange} placeholder='Lat' name='lat'></input><br/>
                    <input onChange={handleChange} placeholder='Lon' name='lon'></input><br/>
                    <input onChange={handleChange} placeholder='Prominence' name='prominence'></input><br/>
                    <input onChange={handleChange} placeholder='Izolace' name='isolation'></input><br/>
                    <input onChange={handleChange} placeholder='Materiál' name='material'></input><br/>
                    <input onChange={handleChange} placeholder='Povodí' name='basin'></input><br/>
                    <input onChange={handleChange} placeholder='Okres' name='district'></input><br/>
                    <input onChange={handleChange} placeholder='Lokace' name='location'></input><br/>
                    <br/>
                    <button type="submit">Pridat kopec</button>
                </form>
            </ThemeProvider>
        </>
    )
}

function DateTime(dateTime) {
    let dt = new Date(dateTime);
    return (
        `${(dt.getDate() < 10) ? '0' + dt.getDate() : dt.getDate()}.${(dt.getMonth()+1 < 10 ? '0' + (dt.getMonth()+1) : dt.getMonth()+1)}.${dt.getFullYear()} 
        [${(dt.getHours()) < 10 ? '0' + dt.getHours() : dt.getHours()}:${(dt.getMinutes() < 10) ? '0' + dt.getMinutes() : dt.getMinutes()}:${(dt.getSeconds() < 10) ? '0' + dt.getSeconds() : dt.getSeconds()}]`)
}

function ellipsify(str) {
    if (str.length > 10) {
        return (str.substring(0, 10) + "...");
    }
    else {
        return str;
    }
}

export default AdminPage;
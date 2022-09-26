import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from "axios";
import {Card, CardContent, Chip, Rating} from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'id_user', label: 'ID', minWidth: 170 },
  { id: 'login', label: 'Login', minWidth: 100 },
  { id: 'name', label: 'Nickname', minWidth: 100 },
  { id: 'email', label: 'E-Mail', minWidth: 100 },
  { id: 'desc', label: 'Desc', minWidth: 100 },
  { id: 'hills', label: 'Hills', minWidth: 100 },
  { id: 'comments', label: 'Comments', minWidth: 100 },
  { id: 'reviews', label: 'Reviews', minWidth: 100 },
  { id: 'date_registered', label: 'Registered', minWidth: 100 },
  { id: 'date_lastLogin', label: 'LL', minWidth: 100 },
  { id: 'isAdmin', label: 'Admin', minWidth: 100 },
];

function createData(id_user, login, name, email, desc, hills, comments, reviews, date_registered, date_lastLogin, isAdmin) {
  return { id_user, login, name, email, desc, hills, comments, reviews, date_registered, date_lastLogin, isAdmin };
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

axios.defaults.withCredentials = true;

function AdminPage() {
    const [users, getUsers] = useState([]);
    const [hills, getHills] = useState([]);
    const [allReviews, getAllReviews] = useState([]);
    const [userHills, setUserHills] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    let count = 0;

    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:8082/api/users/');
        return response.data;
    }

    const fetchHills = async () => {
        const response = await axios.get('http://localhost:8082/api/hills/');
        return response.data;
    }

    const fetchReviews = async () => {
        const response = await axios.get(`http://localhost:8082/api/review/`);
        return response.data;
    }

    useEffect(() => {
        fetchUsers().then((res) => {getUsers(res)})
        fetchHills().then((res) => {getHills(res)})
        fetchReviews().then((res) => {getAllReviews(res)})
    }, [])

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

    useEffect(() => {
        let tempRows = [];
        let userClimbed = [];

        users.map((user) => {
            userHills.map((hill) => {
                if (hill.user === user.login) {
                    console.log(hill);
                    userClimbed.push(hill.hill.name + '\n');
                }
            })

            tempRows.push(createData(user._id, user.login, user.name, user.email, user.description, userClimbed, 'test', 'test', DateTime(user.date_registered), DateTime(user.date_lastLogin), ((user.isAdmin) ? 'true' : 'false')))
            userClimbed = [];
        })
        
        setRows(tempRows);
    }, [users, userHills])

    return (
        <>
        <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <div className={'container-fluid'}>
        <a href="#sidebar" data-bs-target="#sidebar" data-bs-toggle="collapse" className="border rounded-3 p-1 text-decoration-none"><i className="bi bi-list bi-lg py-2 p-1"></i> Menu</a>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
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
                                {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
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

export default AdminPage;
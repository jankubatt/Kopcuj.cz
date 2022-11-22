import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../App.css';
import axios from "axios";
import {Button, Card, Collapse, Form, Nav, Tab, Table} from "react-bootstrap";

//formats pushable row into table
function createData(id_user, login, name, email, desc, hills, comments, reviews, date_registered, date_lastLogin, isAdmin, isVerified) {
    return {
        id_user,
        login,
        name,
        email,
        desc,
        hills,
        comments,
        reviews,
        date_registered,
        date_lastLogin,
        isAdmin,
        isVerified
    };
}

axios.defaults.withCredentials = true;

function AdminPage() {
    const [users, getUsers] = useState([]);                     //All users
    const [hills, getHills] = useState([]);                     //All hills
    const [allReviews, getAllReviews] = useState([]);           //All reviews
    const [userHills, setUserHills] = useState([]);             //Array where hill is assigned to user
    const [rows, setRows] = useState([]);                       //Rows of a table

    //State for storing form values
    const [state, setState] = useState({});
    const [collapse, setCollapse] = useState({});
    let navigate = useNavigate();

    //function that handles changes in input boxes, when input changes, it gets written into state variable
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setState({...state, [name]: value});
    };

    const handleCollapse = (event) => {
        console.log(collapse)
        setCollapse({...collapse, [event.target.value]: !collapse.event.target.value})
    }

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
        fetchUsers().then((res) => {
            getUsers(res)
        })
        fetchHills().then((res) => {
            getHills(res)
        })
        fetchReviews().then((res) => {
            getAllReviews(res)
        })
    }, [])

    useEffect(() => {
        let temp = [];
        users?.forEach((user) => {
            temp.push({[user._id]: false})
        })

        setCollapse(temp)
    }, [users])

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
                            <Card.Body>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <div>
                                        {/*<Rating name="read-only" value={review.stars} readOnly />*/}
                                    </div>
                                </div>
                                <div>
                                    {ellipsify(review.text)}
                                </div>
                                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <div style={{color: 'GrayText'}}>
                                        {new Date(review.date_added).getDate()}.{new Date(review.date_added).getMonth() + 1}.{new Date(review.date_added).getFullYear()}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    );
                }
            })

            tempRows.push(createData(user._id, user.login, user.name, user.email, user.description, userClimbed, "In Progress", userReviews, DateTime(user.date_registered), DateTime(user.date_lastLogin), user.isAdmin ? 'true' : 'false', user.isVerified ? 'true' : 'false'))
            
            userClimbed = [];
            userReviews = [];
        })
        
        setRows(tempRows);
    }, [users, userHills])

    return (
        <>
            <div style={{overflowX: "scroll !important"}}>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <div className={"d-flex flex-row"}>
                        <div style={{borderRight: "1px solid var(--c2)"}}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first" className={"btn1"}
                                              style={{borderRadius: "0"}}>Hodnocení</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second" className={"btn1"}
                                              style={{borderRadius: "0"}}>Závady</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>

                        <div className={"w-100"}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <Table stickyHeader aria-label="sticky table">
                                        <thead>
                                        <tr>
                                            <td>ID</td>
                                            <td>Login</td>
                                            <td>Name</td>
                                            <td>Email</td>
                                            <td>Desc</td>
                                            <td>Hills</td>
                                            <td>Comments</td>
                                            <td>Reviews</td>
                                            <td>Registration</td>
                                            <td>Last Login</td>
                                            <td>Admin</td>
                                            <td>Verified</td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {rows?.map((row) => {
                                            return (
                                                <tr>
                                                    <td>{row.id_user}</td>
                                                    <td>{row.login}</td>
                                                    <td>{row.name}</td>
                                                    <td>{row.email}</td>
                                                    <td>
                                                        <Button
                                                            onClick={handleCollapse}
                                                            aria-controls="example-collapse-text"
                                                            aria-expanded={false}
                                                            value={row.id_user}
                                                        >
                                                            Desc
                                                        </Button>
                                                        <Collapse in={false}>
                                                            <div id="example-collapse-text">
                                                                {row.desc}
                                                            </div>
                                                        </Collapse>
                                                    </td>
                                                    <td>{row.hills}</td>
                                                    <td>{row.comments}</td>
                                                    <td>{row.reviews}</td>
                                                    <td>{row.date_registered}</td>
                                                    <td>{row.date_lastLogin}</td>
                                                    <td>{row.isAdmin}</td>
                                                    <td>{row.isVerified}</td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </Table>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <Card className={"mx-5"}>
                                        <Card.Body>
                                            <Card.Title><h2>Přidat kopec</h2></Card.Title>

                                            <Form onSubmit={handleSubmit}>
                                                <Form.Control onChange={handleChange} placeholder='Jméno' name='name'
                                                              className={"textarea"}></Form.Control><br/>
                                                <Form.Control onChange={handleChange} placeholder='Výška'
                                                              name='elevation'
                                                              className={"textarea"}></Form.Control><br/>
                                                <Form.Control onChange={handleChange} placeholder='Lat' name='lat'
                                                              className={"textarea"}></Form.Control><br/>
                                                <Form.Control onChange={handleChange} placeholder='Lon' name='lon'
                                                              className={"textarea"}></Form.Control><br/>
                                                <Form.Control onChange={handleChange} placeholder='Prominence'
                                                              name='prominence'
                                                              className={"textarea"}></Form.Control><br/>
                                                <Form.Control onChange={handleChange} placeholder='Izolace'
                                                              name='isolation'
                                                              className={"textarea"}></Form.Control><br/>
                                                <Form.Control onChange={handleChange} placeholder='Materiál'
                                                              name='material'
                                                              className={"textarea"}></Form.Control><br/>
                                                <Form.Control onChange={handleChange} placeholder='Povodí' name='basin'
                                                              className={"textarea"}></Form.Control><br/>
                                                <Form.Control onChange={handleChange} placeholder='Okres'
                                                              name='district'
                                                              className={"textarea"}></Form.Control><br/>
                                                <Form.Control onChange={handleChange} placeholder='Lokace'
                                                              name='location'
                                                              className={"textarea"}></Form.Control><br/>

                                                <Button className={"btn2"} type="submit">Pridat kopec</Button>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </Tab.Pane>
                            </Tab.Content>
                        </div>
                    </div>
                </Tab.Container>
            </div>


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
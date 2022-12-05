import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import '../App.css';
import axios from "axios";
import {Button, Card, Col, Form, Nav, Row, Tab, Table} from "react-bootstrap";
import AdminRow from "../components/AdminRow";
import AdminReview from "../components/AdminReview";
import AdminDiscussion from "../components/AdminDiscussion";
import AdminReply from "../components/AdminReply";

//formats pushable row into table
function createData(id_user, login, name, email, desc, hills, discussions, replies, reviews, date_registered, date_lastLogin, isAdmin, isVerified) {
    return {
        id_user,
        login,
        name,
        email,
        desc,
        hills,
        discussions,
        replies,
        reviews,
        date_registered,
        date_lastLogin,
        isAdmin,
        isVerified,
    };
}

axios.defaults.withCredentials = true;

function AdminPage() {
    const [users, setUsers] = useState([]);                     //All users
    const [reviews, setReviews] = useState([]);           //All reviews
    const [rows, setRows] = useState();                       //Rows of a table
    const [discussions, setDiscussions] = useState([]);
    const [usersClimbedHills, setUsersClimbedHills] = useState([]);
    const [replies, setReplies] = useState([]);

    //State for storing form values
    const [state, setState] = useState({});
    let navigate = useNavigate();

    //function that handles changes in input boxes, when input changes, it gets written into state variable
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setState({...state, [name]: value});
    }

    //handles submit button
    const handleSubmit = (event) => {
        event.preventDefault(); //prevent reload of page

        const data = {
            name: state.name,
            elevation: state.elevation,
            lat: state.lat,
            lng: state.lng,
            prominence: state.prominence,
            isolation: state.isolation,
            material: state.material,
            basin: state.basin,
            district: state.district,
            location: state.location
        };

        //post data to database
        axios.post("/api/hills/create", data)
            .then(() => {
                return navigate("/");
            })
            .catch(err => {
                console.log("Error in register user!\n" + err);
            });
    }

    //Fetch users from database
    const fetchUsers = async () => {
        const response = await axios.get('/api/users/');
        return response.data;
    }

    //Fetch reviews from database
    const fetchReviews = async () => {
        const response = await axios.get(`/api/reviews/`);
        return response.data;
    }

    const fetchDiscussions = async () => {
        const response = await axios.get(`/api/discussions`);
        return response.data;
    }

    const fetchReplies = async () => {
        const response = await axios.get(`/api/discussions/replies`);
        return response.data;
    }

    const fetchUsersClimbedHills = async () => {
        const response = await axios.get(`/api/users/climbedHills`);
        return response.data;
    }

    //Fetching data
    useEffect(() => {
        fetchUsers().then((res) => {
            setUsers(res)
        })
        fetchReviews().then((res) => {
            setReviews(res)
        })
        fetchDiscussions().then((res) => {
            setDiscussions(res)
        })
        fetchReplies().then((res) => {
            setReplies(res);
            console.log(res)
        })
        fetchUsersClimbedHills().then((res) => {
            setUsersClimbedHills(res);
        })
    }, [])

    //Fill table with data
    useEffect(() => {
        let tempRows = [];

        users.map((user) => {
            let userClimbed = [];
            let userReviews = [];
            let userDiscussions = [];
            let userReplies = [];

            usersClimbedHills.map((hill) => {
                if (hill.user === user.id)
                    userClimbed.push(<li>{hill.name}</li>);
            })

            reviews.map((review) => {
                if (review.user === user.id) {
                    userReviews.push(
                        <AdminReview key={review.id} review={review}></AdminReview>
                    );
                }
            })

            discussions.map((discussion) => {
                if (user.id === discussion.user) {
                    userDiscussions.push(<AdminDiscussion key={discussion.id}
                                                          discussion={discussion}></AdminDiscussion>)
                }
            })

            replies.map((reply) => {
                if (user.id === reply.user) {
                    userReplies.push(<AdminReply key={reply.id} reply={reply}></AdminReply>)
                }
            })

            tempRows.push(createData(user.id, user.login, user.name, user.email, user.description, userClimbed, userDiscussions, userReplies, userReviews, DateTime(user.registered), DateTime(user.lastLogin), user.isAdmin ? 'true' : 'false', user.isVerified ? 'true' : 'false'))

            userClimbed = [];
            userReviews = [];
        })

        setRows(tempRows);
    }, [users, discussions, reviews, usersClimbedHills, replies])

    return (
        <>
            <div style={{overflowX: "scroll !important"}}>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row className={"d-flex flex-row"}>
                        <Col className={"p-0 admin-sidebar"} sm={2}>
                            <Nav className="flex-column ">
                                <Nav.Item>
                                    <Nav.Link eventKey="first" className={"btn1"}>Admin Panel</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second" className={"btn1"}>CRUD Kopec</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href={"/"} eventKey="third" className={"btn1"}>Domů</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>

                        <Col className={"p-0"}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <Table aria-label="sticky table">
                                        <thead>
                                        <tr>
                                            <td>ID</td>
                                            <td>Login</td>
                                            <td>Name</td>
                                            <td>Email</td>
                                            <td>Desc</td>
                                            <td>Hills</td>
                                            <td>Discussions</td>
                                            <td>Replies</td>
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
                                                <AdminRow key={row.id_user} row={row}></AdminRow>
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
                                                <Form.Control onChange={handleChange} placeholder='Lng' name='lng'
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
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </>
    )
}

function DateTime(dateTime) {
    let dt = new Date(dateTime);

    if (isNaN(dt)) return "Wrong date";

    return (
        `${(dt.getDate() < 10) ? '0' + dt.getDate() : dt.getDate()}.${(dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1)}.${dt.getFullYear()} 
        [${(dt.getHours()) < 10 ? '0' + dt.getHours() : dt.getHours()}:${(dt.getMinutes() < 10) ? '0' + dt.getMinutes() : dt.getMinutes()}:${(dt.getSeconds() < 10) ? '0' + dt.getSeconds() : dt.getSeconds()}]`)
}

export default AdminPage;
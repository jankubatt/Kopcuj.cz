import React, {useEffect, useState} from 'react';
import '../App.css';
import '../Profile.css';
import axios from "axios";
import {Card, CardContent, Chip, Rating} from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ThemeContext, themes } from '../components/ThemeContext';

axios.defaults.withCredentials = true;

function AdminPage() {
    const [users, getUsers] = useState([]);
    const [hills, getHills] = useState([]);
    const [allReviews, getAllReviews] = useState([]);
    const [userHills, setUserHills] = useState([]);
    const [darkMode, setDarkMode] = React.useState(true);

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

    return (
        <>
            <div className={'container-fluid'}>
            <ThemeContext.Consumer>
            {({ changeTheme }) => (
              <button
                color="link"
                onClick={() => {
                  setDarkMode(!darkMode);
                  changeTheme(darkMode ? themes.light : themes.dark);
                  console.log('jsipica');
                }}
              >
                <i className={darkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
                <span className="d-lg-none d-md-block">Switch mode</span>
              </button>
            )}
          </ThemeContext.Consumer>
                <table className="table table-sm">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Login</th>
                        <th scope="col">Email</th>
                        <th scope="col">Name</th>
                        <th scope="col">Desc</th>
                        <th scope="col">Hills</th>
                        <th scope="col">Comments</th>
                        <th scope="col">Reviews</th>
                        <th scope="col">Theme</th>
                        <th scope="col">Reg Date</th>
                        <th scope="col">Last Login</th>
                        <th scope="col">Admin</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            hills && allReviews && users?.map((user) => {
                                return (
                                    <>
                                        <tr>
                                            <td><p>{user._id}</p></td>
                                            <td>{user.login}</td>
                                            <td>{user.email}</td>
                                            <td>{user.name}</td>
                                            
                                            <td>
                                                <a className="btn btn-primary" data-bs-toggle="collapse" href={`#${user.login}description`}
                                                        role="button" aria-expanded="false" aria-controls={`${user.login}description`}>
                                                    <FontAwesomeIcon icon="fa-solid fa-bars" />
                                                </a>
                                                <div className="collapse" id={`${user.login}description`}>
                                                    {user.description}
                                                </div>
                                            </td>
                                            <td>
                                                <a className="btn btn-primary" data-bs-toggle="collapse" href={`#${user.login}Hills`}
                                                        role="button" aria-expanded="false" aria-controls={`${user.login}Hills`}>
                                                    {
                                                        userHills?.map((item) => {
                                                            if (item.user === user.login) {
                                                                count++
                                                            }
                                                            return null
                                                        })
                                                    }
                                                    {count}
                                                </a>
                                                <div className="collapse" id={`${user.login}Hills`}>
                                                    <Card className='card'>
                                                        <CardContent>
                                                            {
                                                                userHills?.map((item) => {
                                                                    count = 0
                                                                    if (item.user === user.login) {
                                                                        return (
                                                                            <div key={item.hill._id}>
                                                                                <b>{item.hill.name}</b>
                                                                                <hr />
                                                                            </div>
                                                                        )
                                                                    }
                                                                    return null
                                                                })
                                                            }
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                                </td>
                                                <td>
                                                    <a className="btn btn-primary" data-bs-toggle="collapse" href={`#${user.login}comment`}
                                                        role="button" aria-expanded="false" aria-controls={`${user.login}commment`}>
                                                        {user.comments.length}
                                                    </a>
                                                    <div className="collapse" id={`${user.login}commment`}>
                                                        {
                                                            user.comments.map((comment) => {
                                                                return comment + '\n'
                                                            })
                                                        }
                                                    </div>
                                                </td>
                                                <td>
                                                    <a className="btn btn-primary" data-bs-toggle="collapse" href={`#${user.login}reviews`}
                                                        role="button" aria-expanded="false" aria-controls={`${user.login}reviews`}>
                                                        {
                                                            allReviews.forEach((review) => {
                                                                if (user._id === review.id_user) {
                                                                    return count++;
                                                                }
                                                            })
                                                        }
                                                        {count}
                                                    </a>
                                                    <div className="collapse" id={`${user.login}reviews`}>
                                                        {
                                                            allReviews.map((review) => {
                                                                if (user._id === review.id_user) {
                                                                    count = 0;
                                                                    return ( 
                                                                        <div key={review._id}>
                                                                            <Card className='card'>
                                                                                <CardContent>
                                                                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                                                        <div>
                                                                                            <b style={{fontSize: '1.25em'}}>{review.user.name || review.user.login}</b>&nbsp;
                                                                                            {((review.user.isAdmin) ? <Chip color="error" label="Admin"/> : '')}
                                                                                        </div>
                                                                                        <div>
                                                                                            <Rating name="read-only" value={review.stars} readOnly />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div>
                                                                                        {review.text}
                                                                                    </div>
                                                                                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                                                                        <div style={{color: 'GrayText'}}>
                                                                                            {new Date(review.date_added).getDate()}.{new Date(review.date_added).getMonth()+1}.{new Date(review.date_added).getFullYear()}
                                                                                        </div>
                                                                                    </div>
                                                                                </CardContent>
                                                                            </Card>
                                                                        </div>
                                                                    )
                                                                }
                                                                return null
                                                            })

                                                        }
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{'backgroundColor': `${user.theme}`, 'height': '20px', 'width': 'auto'}}></div>
                                                </td>
                                                <td>{DateTime(user.date_registered)}</td>
                                                <td>{DateTime(user.date_lastLogin)}</td>
                                                <td>{user.isAdmin ? '✅' : '❌'}</td>
                                        </tr>
                                    </>
                                )   
                            })
                        }
                    </tbody>
                </table>
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

export default AdminPage;
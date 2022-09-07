import React, {useEffect, useState} from 'react';
import '../App.css';
import '../Profile.css';
import axios from "axios";

axios.defaults.withCredentials = true;

function AdminPage() {
    const [users, getUsers] = useState([]);
    const [hills, getHills] = useState([]);
    const [open, setOpen] = useState(false);

    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:8082/api/users/');
        return response.data;
    }

    const fetchHills = async () => {
        const response = await axios.get('http://localhost:8082/api/hills/');
        return response.data;
    }

    useEffect(() => {
        fetchUsers()
            .then((res) => {
                getUsers(res)
            })
            .catch((e) => {
                console.log(e.message)
            })

        fetchHills()
            .then((res) => {
                getHills(res)
            })
            .catch((e) => {
                console.log(e.message)
            })
    }, [])

    return (
        <>
            <div className={'container'}>
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
                    {users?.map((user) => {
                        return (<>
                            <tr key={user.login} id={user.login}>
                                <td>{user._id}</td>
                                <td>{user.login}</td>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>{user.description}</td>
                                <td>
                                    <a className="btn btn-primary" data-bs-toggle="collapse" href={`#${user.login}`}
                                       role="button" aria-expanded="false" aria-controls={user.login}>
                                        Link with href
                                    </a>
                                    <div className="collapse" id={user.login}>
                                        <div className="card card-body">
                                            Some placeholder content for the collapse component. This panel is hidden by
                                            default but revealed when the user activates the relevant trigger.
                                        </div>
                                    </div>
                                </td>
                                <td>{user.comments}</td>
                                <td>{user.reviews}</td>
                                <td>
                                    <div style={{
                                        'backgroundColor': `${user.theme}`,
                                        'height': '20px',
                                        'width': 'auto'
                                    }}></div>
                                </td>
                                <td>{DateTime(user.date_registered)}</td>
                                <td>{DateTime(user.date_lastLogin)}</td>
                                <td>{user.isAdmin ? '✅' : '❌'}</td>
                            </tr>
                        </>)
                    })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

function DateTime(dateTime) {
    let dt = new Date(dateTime);

    return `${dt.getDay()}.${dt.getMonth()}.${dt.getFullYear()} [${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}]`;
}

export default AdminPage;
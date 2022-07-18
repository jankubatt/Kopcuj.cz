import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function ShowHillDetails() {
    const params = useParams();

    const [hill, fetchHill] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:8082/api/hills/' + params.id)
            return response.data;
        }
        fetchData()
            .then((res) => {
                fetchHill(res)
            })
            .catch((e) => {
                console.log(e.message)
            })
    }, [params])

    let hillItem = <div>
        <table className="table table-hover table-dark">
            <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Title</td>
                <td>{hill.title}</td>
            </tr>
            </tbody>
        </table>
    </div>;


    return (
        <div className="ShowHillDetails">
            <div className="container">
                <div className="row">
                    <div className="col-md-10 m-auto">
                        <br/> <br/>
                        <Link to="/" className="btn btn-outline-warning float-left">
                            Show hill List
                        </Link>
                    </div>
                    <br/>
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">{hill.title} Record</h1>
                        <p className="lead text-center">
                            View {hill.title} Info
                        </p>
                        <hr/>
                        <br/>
                    </div>
                </div>
                <div>
                    {hillItem}
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <Link to={`/edit-hill/${hill._id}`} className="btn btn-outline-info btn-lg btn-block">
                            Edit hill
                        </Link>
                        <br/>
                    </div>

                </div>
                {/* <br />
        <button type="button" class="btn btn-outline-info btn-lg btn-block">Edit hill</button>
        <button type="button" class="btn btn-outline-danger btn-lg btn-block">Delete hill</button> */}

            </div>
        </div>
    );
}

export default ShowHillDetails;
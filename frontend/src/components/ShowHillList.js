import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import HillCard from './HillCard';

function ShowHillList() {
    const [hills, fetchHills] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:8082/api/hills/')
            return response.data;
        }
        fetchData()
            .then((res) => {
                fetchHills(res)
            })
            .catch((e) => {
                console.log(e.message)
            })
    }, [])

    let hillList;

    if (!hills) {
        hillList = "there is no hill record!";
    } else {
        hillList = hills.map((hill, k) =>
            <HillCard hill={hill} key={k}/>
        );
    }

    return (
        <div className="ShowHillList">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <br/>
                        <h2 className="display-4 text-center">hills List</h2>
                    </div>

                    <div className="col-md-11">
                        <Link to="/create-hill" className="btn btn-outline-warning float-right">
                            + Add New hill
                        </Link>
                        <br/>
                        <br/>
                        <hr/>
                    </div>

                </div>

                <div className="list">
                    {hillList}
                </div>
            </div>
        </div>
    );
}

export default ShowHillList;
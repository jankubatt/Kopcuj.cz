import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function UpdateHillInfo() {
    const params = useParams();
    let navigate = useNavigate();
    const [hillName, setHillName] = useState('');
    const [hill, fetchHill] = useState([]);

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

    const onSubmit = e => {
        e.preventDefault();

        console.log(e.target.valueOf)

        const data = {
            title: hillName
        };

        axios
            .put('http://localhost:8082/api/hills/' + params.id, data)
            .then(res => {
                return navigate("/show-hill/" + params.id);
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <div className="UpdateHillInfo">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <br/>
                        <Link to="/" className="btn btn-outline-warning float-left">
                            Show hill List
                        </Link>
                    </div>
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Edit {hill.title}</h1>
                        <p className="lead text-center">
                            Update {hill.title} Info
                        </p>
                    </div>
                </div>

                <div className="col-md-8 m-auto">
                    <form noValidate onSubmit={onSubmit}>
                        <div className='form-group'>
                            <label htmlFor="title">Title</label>
                            <input
                                type='text'
                                placeholder={hill.title}
                                name='title'
                                className='form-control'
                                onChange={event => setHillName(event.target.value)}
                                value={hillName}
                            />
                        </div>
                        <br/>

                        <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update hill</button>
                    </form>
                </div>

            </div>
        </div>
    );

}

export default UpdateHillInfo;
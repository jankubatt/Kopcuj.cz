import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class CreateHill extends Component {
    constructor() {
        super();
        this.state = {
            title: ''
        };
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = e => {
        e.preventDefault();

        const data = {
            title: this.state.title
        };

        axios
            .post('http://localhost:8082/api/hills', data)
            .then(res => {
                this.setState({
                    title: ''
                })
                this.props.history.push('/');
            })
            .catch(err => {
                console.log("Error in CreateHill!");
            })
    };

    render() {
        return (
            <div className="CreateHill">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <br/>
                            <Link to="/" className="btn btn-outline-warning float-left">
                                Show Hill List
                            </Link>
                        </div>
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Add Hill</h1>
                            <p className="lead text-center">
                                Create new hill
                            </p>

                            <form noValidate onSubmit={this.onSubmit}>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        placeholder='Title of the Hill'
                                        name='title'
                                        className='form-control'
                                        value={this.state.title}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <br/>

                                <input
                                    type="submit"
                                    className="btn btn-outline-warning btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateHill;
import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

const HillCard = (props) => {
    const hill = props.hill;

    return (
        <div className="card-container">
            <div className="desc">
                <h1>
                    <Link to={`/show-hill/${hill._id}`}>
                        {hill.title}
                    </Link>
                </h1>
            </div>
        </div>
    )
};

export default HillCard;
import {Button, Collapse} from "react-bootstrap";
import React, {useState} from "react";

const AdminRow = (props) => {
    const [desc, setDesc] = useState(false);
    const [reviews, setReviews] = useState(false);
    const [hills, setHills] = useState(false);


    return (
        <tr key={props.row.id_user}>
            <td>{props.row.id_user}</td>
            <td>{props.row.login}</td>
            <td>{props.row.name}</td>
            <td>{props.row.email}</td>
            <td>
                <Button
                    onClick={() => setDesc(!desc)}
                    aria-controls="example-collapse-text"
                    aria-expanded={desc}
                    className={"btn2"}
                >
                    Desc
                </Button>
                <Collapse in={desc}>
                    <div id="example-collapse-text">
                        {props.row.desc}
                    </div>
                </Collapse>
            </td>
            <td>
                <Button
                    onClick={() => setHills(!hills)}
                    aria-controls="example-collapse-text"
                    aria-expanded={hills}
                    className={"btn2"}
                >
                    Hills
                </Button>
                <Collapse in={hills}>
                    <div id="example-collapse-text">
                        {props.row.hills}
                    </div>
                </Collapse>
            </td>
            <td>{props.row.discussions}</td>
            <td>{props.row.replies}</td>
            <td>
                <Button
                    onClick={() => setReviews(!reviews)}
                    aria-controls="example-collapse-text"
                    aria-expanded={reviews}
                    className={"btn2"}
                >
                    Reviews
                </Button>
                <Collapse in={reviews}>
                    <div id="example-collapse-text">
                        {props.row.reviews}
                    </div>
                </Collapse>
            </td>
            <td>{props.row.date_registered}</td>
            <td>{props.row.date_lastLogin}</td>
            <td>{props.row.isAdmin}</td>
            <td>{props.row.isVerified}</td>
        </tr>
    )
}

export default AdminRow;
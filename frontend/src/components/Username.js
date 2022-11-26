import {Badge} from "react-bootstrap";
import React from "react";

const Username = (props) => {
    const fetchUser = async () => {
        const response = await axios.get(`http://localhost:8082/api/users/${props.user}`)
    }
    return (
        <>
            <b>{props.user.name || props.user.login}</b>&nbsp;
            {((props.user.isAdmin) ? <Badge pill bg="danger">Admin</Badge> : '')}&nbsp;
            {((props.user.isVerified) ? <Badge pill bg="info">Ověřen</Badge> : '')}
        </>
    )
}

export default Username;
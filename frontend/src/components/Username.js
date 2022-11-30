import {Badge} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";

const Username = (props) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        const response = await axios.get(`/api/users/id/${props.user}`)
        return response.data[0];
    }

    useEffect(() => {
        fetchUser().then((res) => {
            setUser(res)
            setLoading(false)
        })
    }, [])

    if (loading) return <p>...</p>

    return (
        <>
            <b>{user.name || user.login}</b>&nbsp;
            {((user.isAdmin) ? <Badge pill bg="danger">Admin</Badge> : '')}&nbsp;
            {((user.isVerified) ? <Badge pill bg="info">Ověřen</Badge> : '')}
        </>
    )
}

export default Username;
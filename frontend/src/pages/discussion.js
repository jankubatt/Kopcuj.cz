import axios from "axios";
import React, {useEffect, useState} from "react";
import {Button, Container} from '@mui/material'

const DiscussionPage = () => {
    const qs = require('query-string');
    const parsed = qs.parse(document.location.search);

    const [discussion, setDiscussion] = useState([]);

    const fetchDiscussion = async () => {
        const response = await axios.get(`http://localhost:8082/api/discussions/${parsed.id}`);
        return response.data;
    }

    useEffect(() => {
        fetchDiscussion().then((res) => {
            setDiscussion(res);
        })
    }, [])

    return (
        <>
            {discussion !== undefined ?
                <Container>
                    <h1>{discussion.subject}</h1>
                    <p>{discussion.text}</p>
                    <input placeholder={'Odpovědět'}/>
                    <Button variant="contained" style={{marginTop: "10px"}}>Odpovědět</Button>
                </Container>
                : "Loading..."}
        </>

    )
}

export default DiscussionPage;
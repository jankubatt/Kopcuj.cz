import axios from "axios";
import {useEffect, useState} from "react";

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
            {discussion !== undefined ? <p>{discussion.subject}</p> : "Loading..."}
        </>

    )
}

export default DiscussionPage;
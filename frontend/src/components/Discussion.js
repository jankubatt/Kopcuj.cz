import React from 'react';
import {Button} from '@mui/material';

const Discussion = (props) => {   
    return (      
        <div className="discussion">
            <p>{props.data.subject}</p>
            <p>{props.data.text}</p>
            <p>{props.data.user.name}</p>
            <p>{new Date(props.data.date_added).getDate()}.{new Date(props.data.date_added).getMonth() + 1}.{new Date(props.data.date_added).getFullYear()}</p>
            <Button><a href={`http://localhost:3000/discussion?id=${props.data._id}`}>K diskuzi</a></Button>
        </div>
    )
}

export default Discussion;
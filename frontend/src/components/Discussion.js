import React from 'react';

const Discussion = (props) => {   
    console.log("hej") 
    return (      
        <div className="discussion">
            <p>{props.data.subject}</p>
            <p>{props.data.text}</p>
            <p>{props.data.user.name}</p>
            <p>{new Date(props.data.date_added).getDate()}.{new Date(props.data.date_added).getMonth()+1}.{new Date(props.data.date_added).getFullYear()}</p>
            <a href={`http://localhost:8082/api/discussions/${props.data._id}`}>K diskuzi</a>
        </div>
    )
}

export default Discussion;
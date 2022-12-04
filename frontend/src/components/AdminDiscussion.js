import {Card} from "react-bootstrap";

function DateTime(dateTime) {
    let dt = new Date(dateTime);
    return (
        `${(dt.getDate() < 10) ? '0' + dt.getDate() : dt.getDate()}.${(dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1)}.${dt.getFullYear()} 
        [${(dt.getHours()) < 10 ? '0' + dt.getHours() : dt.getHours()}:${(dt.getMinutes() < 10) ? '0' + dt.getMinutes() : dt.getMinutes()}:${(dt.getSeconds() < 10) ? '0' + dt.getSeconds() : dt.getSeconds()}]`)
}

const AdminDiscussion = (props) => {
    return (
        <Card>
            <Card.Header>
                {props.discussion.subject}
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {props.discussion.text}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <div className={"d-flex justify-content-end"}>
                    <div>{DateTime(props.discussion.created)}</div>
                </div>
            </Card.Footer>
        </Card>
    )
}

export default AdminDiscussion;
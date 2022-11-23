import {Card} from "react-bootstrap";

const AdminReply = (props) => {
    return (
        <Card>
            <Card.Header>
                {props.discussion.subject}
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {props.reply.text}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <div className={"d-flex justify-content-end"}>
                    <div>{props.reply.date_added}</div>
                </div>
            </Card.Footer>
        </Card>
    )
}

export default AdminReply;
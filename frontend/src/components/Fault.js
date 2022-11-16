import React from "react";
import {Badge, Button, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Fault = (props) => {
    return (
        <div key={props.fault._id}>
            <Card className='card'>
                <Card.Body>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <b>{props.fault.user.name || props.fault.user.login}</b>&nbsp;
                            {((props.fault.user.isAdmin) ? <Badge pill bg="danger">Admin</Badge> : '')}
                        </div>
                    </div>
                    {console.log(new Date(props.fault.date_added).getDate() - new Date(props.fault.date_added).getDate() + 7)}
                    <div>
                        {props.fault.text}
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: "10px"}}>
                        <Button style={{alignSelf: "flex-end"}} onClick={() => {
                            props.helpfulClicked(props.fault._id)
                        }} aria-label="thumbs up" disabled={false}><FontAwesomeIcon
                            icon="fa-solid fa-thumbs-up"/>{props.fault.helpful.length}
                        </Button>
                        <div style={{
                            color: 'GrayText',
                            alignSelf: "flex-end"
                        }}>{new Date(props.fault.date_added).getDate()}.{new Date(props.fault.date_added).getMonth() + 1}.{new Date(props.fault.date_added).getFullYear()}</div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Fault
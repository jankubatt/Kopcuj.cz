import React from "react";
import {Button, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Username from "./Username";

const Fault = (props) => {
    return (
        <div key={props.fault._id}>
            <Card className='card'>
                <Card.Body>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <Username user={props.fault.user}></Username>
                        </div>
                    </div>
                    <div>
                        {props.fault.text}
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: "10px"}}>
                        <Button className={"btn2"} style={{alignSelf: "flex-end"}} onClick={() => {
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
import {Button, Form} from "react-bootstrap";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import Fault from "./Fault";

const Faults = (props) => {
    const [faults, setFaults] = useState([]);
    const [btnFault, setBtnFault] = useState(false);
    const faultText = useRef()

    useEffect(() => {
        fetchFaults().then((res) => {
            setFaults(res);
        })
    }, [])

    useEffect(() => {
        fetchFaults().then((res) => {
            setFaults(res);
        })
    }, [btnFault])

    const fetchFaults = async () => {
        const response = await axios.get(`http://localhost:8082/api/fault/${props.currentHill._id}`);
        return response.data;
    }

    const sendFault = async () => {
        await axios.post(`http://localhost:8082/api/fault/addFault`, {
            hill: props.currentHill,
            user: props.user,
            text: faultText.current.value,
        }).then(() => {
            setBtnFault(!btnFault);
            faultText.current.value = "";
        });
    }

    const helpfulClicked = async (fault) => {
        console.log(fault)
        await axios.post(`http://localhost:8082/api/fault/addHelpful`, {
            hillId: props.currentHill._id,
            userId: props.user._id,
            faultId: fault
        }).then(async (res) => {
            if (res.data === 'remove') {
                await axios.post(`http://localhost:8082/api/fault/removeHelpful`, {
                    hillId: props.currentHill._id,
                    userId: props.user._id,
                    faultId: fault
                })
            }
        });

        setBtnFault(!btnFault)
    }

    return (
        <>

            <h1>Závady</h1>

            <Form.Control as="textarea" className={"textarea"} rows={3} ref={faultText}></Form.Control>
            <Button onClick={sendFault} className={"btn1 mt-2"}>Odeslat</Button>
            <hr/>
            <div id='faults'>
                {faults?.map((fault) => ((fault.text !== null && new Date().getDate() < new Date(fault.date_added).getDate() + 7) ?
                    <Fault key={fault._id} fault={fault} helpfulClicked={helpfulClicked}/>
                    : 'Žádné potíže'))}
            </div>
        </>
    )
}

export default Faults;
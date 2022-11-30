import {Button, Form} from "react-bootstrap";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import Fault from "./Fault";

const Faults = (props) => {
    const [faults, setFaults] = useState([]);
    const [btnFault, setBtnFault] = useState(false);
    const faultText = useRef()

    const fetchFaults = async () => {
        const response = await axios.get(`/api/faults/${props.currentHill.id}`);
        return response.data;
    }

    const sendFault = async () => {
        console.log(props.user.id, props.currentHill.id)
        await axios.post(`/api/faults/addFault`, {
            hill: props.currentHill.id,
            user: props.user.id,
            text: faultText.current.value,
        }).then(() => {
            setBtnFault(!btnFault);
            faultText.current.value = "";
        });
    }


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

    return (
        <>
            <h1>Závady</h1>

            <Form.Control as="textarea" className={"textarea"} rows={3} ref={faultText}></Form.Control>
            <Button onClick={sendFault} className={"btn1 mt-2"}>Odeslat</Button>
            <hr/>
            <div id='faults'>
                {faults?.map((fault) => ((new Date().getDate() < new Date(fault.created).getDate() + 7) ?
                    <Fault key={fault.id} fault={fault} user={props.user}/>
                    : 'wtf'))}
            </div>
        </>
    )
}

export default Faults;
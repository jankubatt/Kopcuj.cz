import axios from "axios";
import React from 'react';
import {Button, Nav, Tab} from "react-bootstrap";
import Reviews from "./Reviews";
import Faults from "./Faults";

const Sidebar = (props) => {
    const tryHillImage = () => {
        try {
            return require(`../img/hills/${processHillName(props.currentHill.name)}-${props.currentHill.elevation}.webp`);
        } catch (err) {
            return require(`../img/nohill.webp`);
        }
    };

    const addHill = async () => {
        await axios.post('http://localhost:8082/api/users/addHill', {
            id_user: props.user.id,
            id_hill: props.currentHill.id
        });

        props.setBtnClimb(!props.btnClimb)
    }

    return (
        <div className={'sidebar'}>
            <div className={'hill'}>
                <h1>{props.currentHill.name}<small style={{fontSize: 'medium'}}>({props.currentHill.elevation}m)</small></h1>

                <hr/>

                <div style={{
                    width: "100%",
                    height: "200px",
                    backgroundImage: `url(${tryHillImage()})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}></div>

                <hr/>

                <div className={"border-line"}>
                    <h2>Informace</h2>

                    <div>
                        <b>Lat: </b>{props.currentHill.lat}<br/>
                        <b>Lng: </b>{props.currentHill.lon}<br/>
                        <b>Prominence: </b>{props.currentHill.prominence}<br/>
                        <b>Izolace: </b> {props.currentHill.isolation}<br/>
                        <b>Materiál: </b> {props.currentHill.material}<br/>
                        <b>Povodí: </b> {props.currentHill.basin}<br/>
                        <b>Okres: </b> {props.currentHill.district}<br/>
                        <b>Umístění: </b> {props.currentHill.location}<br/>
                    </div>

                    <hr/>

                    {/*{props.currentHill.difficulty.length > 0 ? "Obtížné " : ""}*/}
                    {/*{props.currentHill.path.length > 0 ? "Dostupná cesta " : ""}*/}
                    {/*{props.currentHill.food.length > 0 ? "Vhodné pro kočárky " : ""}*/}
                    {/*{props.currentHill.parking.length > 0 ? "Parkoviště " : ""}*/}
                    {/*{props.currentHill.stroller.length > 0 ? "Občerstvení " : ""}*/}

                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                        <Button id={'btnClaimHill'} type="button" className="btn1" onClick={addHill}
                                disabled={props.climbed}>Pokořit
                        </Button>
                    </div>
                </div>


            </div>


            <hr/>

            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <div className={"align-items-center"}>
                    <div>
                        <Nav variant="pills" className="flex-row justify-content-around">
                            <Nav.Item>
                                <Nav.Link eventKey="first" className={"btn1 mr-5"}>Hodnocení</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second" className={"btn1"}>Závady</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>

                    <div>
                        <Tab.Content className={""}>
                            <hr/>
                            <Tab.Pane eventKey="first">
                                <Reviews currentHill={props.currentHill} user={props.user}>
                                </Reviews>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Faults currentHill={props.currentHill} user={props.user}></Faults>
                            </Tab.Pane>
                        </Tab.Content>
                    </div>
                </div>
            </Tab.Container>
        </div>
    )
}

function processHillName(name) {
    let hill = name.toLowerCase();
    hill = hill.replace(" ", "-");
    hill = hill.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    return hill;
}

export default Sidebar;